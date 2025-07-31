'use server'

import { db } from "@/lib/db"
import { user } from "@/lib/db/schema/auth-schema"
import { category, comments, post } from "@/lib/db/schema/post-schema"
import { desc, eq } from "drizzle-orm"

export async function getAllBlogs() {
    try {
        const res = await db.select({
            id: post.id,
            title: post.title,
            slug: post.slug,
            createdAt: post.createdAt,
            status: post.status,
            category: category.name,
            author: user.name
        }).from(post).orderBy(desc(post.createdAt))
        .innerJoin(user, 
            eq(post.authorId, user.id)
        )
        .innerJoin(category,
            eq(post.categoryId, category.id)
        )
        return res
    } catch (error) {
        console.error(error)
    }
}

export async function getAllUsers() {
    try {
        const res = await db.select({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }).from(user)
        return res
    } catch (error) {
        console.error(error)
    }
}

export async function getAllComments() {
    try {
        const res = await db.select({
            id: comments.id,
            content: comments.content,
            name: user.name,
            post: post.title
        }).from(comments).orderBy(desc(comments.createdAt))
        .innerJoin(user, 
            eq(comments.userId, user.id)
        )
        .innerJoin(post,
            eq(comments.postId, post.id)
        )
        return res
    } catch (error) {
        console.error(error)
    }
}
