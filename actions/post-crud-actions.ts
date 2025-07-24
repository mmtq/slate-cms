"use server"

import { db } from "@/lib/db";
import { category, post, postTags, tags } from "@/lib/db/schema/post-schema";
import { slugify } from "@/utils/functions";
import { postType } from "@/utils/types";
import { desc, eq, inArray } from "drizzle-orm";

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

export async function getSingleBlog(slug: string) {
    try {
        const blog = await db.select().from(post).where(eq(post.slug, slug))
        return blog[0]
    } catch (error) {
        console.error(error)
    }
}