'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

type BlogCardProps = {
  blog: {
    id: number
    title: string
    description: string
    image: string
  }
}

export default function BlogCard({ blog }: BlogCardProps) {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push(`/blog/${blog.id}`)}
      className="cursor-pointer group overflow-hidden rounded-2xl border hover:shadow-xl transition-all duration-200 ease-in-out"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-xl font-semibold line-clamp-2 leading-snug">
            {blog.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {blog.description}
          </p>
        </CardContent>
      </div>
    </Card>
  )
}
