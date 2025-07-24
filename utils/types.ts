
export type PostStatus  = 'draft' | 'published';
export type postType = {
    title: string,
    slug: string,
    excerpt?: string,
    description?: string,
    tags?: string[],
    category: number,
    image: string | null,
    content: string,
    status: PostStatus,
    author: string
}

export type categoryType = {
    id: number,
    name: string
}