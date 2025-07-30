'use server'

import { db } from "@/lib/db"
import { user } from "@/lib/db/schema/auth-schema"
import { category, post } from "@/lib/db/schema/post-schema"
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
        console.log(res)
        return res
    } catch (error) {
        console.error(error)
    }
}