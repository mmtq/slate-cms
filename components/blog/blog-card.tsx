import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

type BlogCardProps = {
  blog : {title: string
  description: string
  image: string}
}


export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className=" overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all">
      <div className="relative h-50 mx-2">
        <Image
          src={blog.image}
          alt={blog.title}
          className="object-cover rounded"
          fill
        />
      </div>
      <div className="p-4">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-semibold">{blog.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-2">
          <p className="text-sm text-muted-foreground">{blog.description}</p>
        </CardContent>
      </div>
    </Card>
  )
}
