import { sql } from "drizzle-orm";
import { AnySQLiteColumn, integer, SQLiteInteger, sqliteTable, text, unique, uniqueIndex } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

export const category = sqliteTable(
    "category",
    {
        id: integer('id').primaryKey({ autoIncrement: true }),
        title: text('title').notNull(),
        slug: text('slug').notNull().unique()
    }
)

export const tags = sqliteTable(
    "tags",
    {
        id: integer('id').primaryKey({ autoIncrement: true }),
        title: text('title').notNull(),
        slug: text('slug').notNull().unique()
    }
)

export const post = sqliteTable(
    "post",
    {
        id: integer('id').primaryKey({ autoIncrement: true }),
        title: text('title').notNull(),
        slug: text('slug').notNull().unique(),
        excerpt: text('excerpt').notNull(),
        description: text('description').notNull(),
        image: text('image'),
        content: text('content').notNull(),
        status: text('status', { enum: ['draft', 'published', 'archived'] }).default('draft').notNull(),
        likesCount: integer('likes_count').default(0).notNull(),

        createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
        publishedAt: text('published_at'),
        updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
    }
)

export const comments = sqliteTable(
    'comments',
    {
        id: integer('id').primaryKey({ autoIncrement: true }),
        postId: integer('post_id').notNull().references(() => post.id, { onDelete: 'cascade' }),
        userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
        parentId: integer('parent_id').references((): AnySQLiteColumn => comments.id),
        content: text('content').notNull(),
        likesCount: integer('likes_count').default(0).notNull(),

        createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
    }
)


export const postLikes = sqliteTable(
    'post_likes',
    {
        id: integer('id').primaryKey({ autoIncrement: true }),
        postId: integer('post_id').notNull().references(() => post.id, { onDelete: 'cascade' }),
        userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
    },
    (table) => [
        unique('user_post_unique').on(table.postId, table.userId)
    ]
)

export const commentLikes = sqliteTable(
    'comment_likes',
    {
        id: integer('id').primaryKey({ autoIncrement: true }),
        commentId: integer('comment_id').notNull().references(() => comments.id, { onDelete: 'cascade' }),
        userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    },
    (table) => [
        unique('user_comment_unique').on(table.commentId, table.userId)
    ]
)