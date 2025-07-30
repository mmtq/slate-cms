"use server"

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema/auth-schema";
import { category, commentLikes, comments, post, postLikes, postTags, tags } from "@/lib/db/schema/post-schema";
import { slugify } from "@/utils/functions";
import { postType } from "@/utils/types";
import { and, desc, eq, inArray, sql } from "drizzle-orm";

export async function createPost(newPost: postType) {
    try {
        const [response] = await db.insert(post).values({
            title: newPost.title,
            slug: newPost.slug,
            authorId: newPost.author,
            excerpt: newPost.excerpt ?? null,
            description: newPost.description ?? null,
            categoryId: newPost.category as number,
            image: newPost.image ?? null,
            content: newPost.content,
            status: newPost.status
        }).returning()

        const { id } = response

        const tagSlugs = newPost.tags?.map(tag => slugify(tag)) ?? []

        const existingTags = await db.select().from(tags).where(
            inArray(tags.slug, tagSlugs)
        )

        const existingTagMap = new Map(existingTags.map(tag => [tag.slug, tag.id]))

        const newTags = newPost.tags?.map((tag, index) => {
            const slug = tagSlugs[index]
            if (!existingTagMap.has(slug)) {
                return {
                    name: tag,
                    slug
                }
            }
            return null
        }).filter(Boolean) as { name: string, slug: string }[]

        // 6. Insert new tags
        let newTagIds: number[] = [];
        if (newTags.length > 0) {
            const inserted = await db.insert(tags).values(newTags).returning();
            newTagIds = inserted.map((tag) => tag.id);
        }

        // 7. Collect all tag IDs (existing + new)
        const allTagIds = [...existingTagMap.values(), ...newTagIds];

        // 8. Link tags to post
        await db.insert(postTags).values(
            allTagIds.map((tagId) => ({
                postId: id,
                tagId,
            }))
        );

        return {
            success: true,
            message: "Post created successfully"
        }

    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Failed to create post"
        }
    }
}

export async function getCategories() {
    try {
        const res = await db.select({
            id: category.id,
            name: category.name
        }).from(category)
        return res
    } catch (error) {
        console.error(error)
    }
}

export async function getAllBlogs() {
    try {
        const res = await db.select(
            {
                id: post.id,
                title: post.title,
                slug: post.slug,
                description: post.description,
                image: post.image,
            }
        ).from(post).orderBy(desc(post.createdAt))
        return res
    } catch (error) {
        console.error(error)
    }
}

export async function getSingleBlog(slug: string, userId?: string) {
    try {
        const [blog] = await db
            .select({
                id: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                description: post.description,
                image: post.image,
                content: post.content,
                createdAt: post.createdAt,
                author: user.name,
                category: category.name,
                likes : post.likesCount
            })
            .from(post)
            .innerJoin(user, eq(post.authorId, user.id))
            .innerJoin(category, eq(post.categoryId, category.id))
            .where(eq(post.slug, slug));
        
        let isLikedPost = false
        if(userId){
            const isLiked = await db.select({
                isLiked: postLikes.postId
            }).from(postLikes).where(and(eq(postLikes.postId, blog.id), eq(postLikes.userId, userId)))
            isLikedPost = isLiked.length > 0
        }

        if (!blog) {
            throw new Error(`No blog found for slug: ${slug}`);
        }

        const tag = await db
            .select({
                name: tags.name,
                slug: tags.slug,
            })
            .from(postTags)
            .where(eq(postTags.postId, blog.id))
            .innerJoin(tags, eq(postTags.tagId, tags.id));

        return {
            blog,
            tags: tag,
            isLikedPost
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function createComment({ postId, userId, content, parentId }: { postId: number, userId: string, content: string, parentId?: number }) {
    try {
        const [comment] = await db.insert(comments).values({
            postId,
            userId,
            parentId,
            content,
        }).returning()

        const userName = await db.select({
            name: user.name
        }).from(user).where(eq(user.id, userId))

        return {
            success: true,
            message: "Comment created successfully",
            comment: {
                ...comment,
                name: userName[0].name
            }
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Failed to create comment"
        }
    }
}

type CommentWithReplies = typeof comments.$inferSelect & {
    name : string
    replies: typeof comments.$inferSelect[];
};


export async function getComments(PostId: number) {
    try {
        const res = await db
            .select({
                id: comments.id,
                postId: comments.postId,
                userId: comments.userId,
                parentId: comments.parentId,
                content: comments.content,
                likesCount: comments.likesCount,
                createdAt: comments.createdAt,
                name: user.name
            })
            .from(comments)
            .where(eq(comments.postId, PostId))
            .innerJoin(user, eq(comments.userId, user.id))
        const coreComments: CommentWithReplies[] = res
            .filter(comment => !comment.parentId)
            .map(comment => ({
                ...comment,
                replies: [] as typeof comments.$inferSelect[],
            }));
        const replies = res.filter(comment =>
            comment.parentId
        )

        coreComments.forEach(comment => {
            const repliesForComment = replies.filter(reply => reply.parentId === comment.id);
            comment.replies = repliesForComment;
        });


        return coreComments
    } catch (error) {
        console.error(error)
    }
}

export async function likePost({ postId, userId }: { postId: number; userId: string }) {
  try {
    const checkIfUserLiked = await db
      .select()
      .from(postLikes)
      .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)));
    if (checkIfUserLiked.length > 0) {
      return {
        success: false,
        message: "You have already liked this post",
      };
    }

    const res = await db
      .insert(postLikes)
      .values({ postId, userId })
      .returning();

    if (res.length > 0) {
      await db
        .update(post)
        .set({
          likesCount: sql`likes_count + 1`,
        })
        .where(eq(post.id, postId));
    }
    return {
      success: true,
      message: "Post liked successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to like post",
    };
  }
}

export async function likeComment({ commentId, userId }: { commentId: number; userId: string }) {
  try {
    const checkIfUserLiked = await db
      .select()
      .from(commentLikes)
      .where(and(eq(commentLikes.commentId, commentId), eq(commentLikes.userId, userId)));
    if (checkIfUserLiked.length > 0) {
      return {
        success: false,
        message: "You have already liked this comment",
      };
    }

    const res = await db
      .insert(commentLikes)
      .values({ commentId, userId })
      .returning();

    if (res.length > 0) {
      await db
        .update(comments)
        .set({
          likesCount: sql`likes_count + 1`,
        })
        .where(eq(comments.id, commentId));
    }
    return {
      success: true,
      message: "Comment liked successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to like comment",
    };
  }
}