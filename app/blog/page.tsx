import BlogCard from "@/components/blog/blog-card"
import { blogSample } from "@/utils/blogs"

export default function Blog() {
  const blogs = blogSample

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-center mb-10">Latest Blogs</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  )
}
