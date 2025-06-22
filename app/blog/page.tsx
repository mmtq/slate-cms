import BlogCard from "@/components/blog/blog-card"
import { title } from "process"

export default function Blog() {

const blogs = [
  {
    title: "The Future of AI in Content Creation",
    url: "#",
    image: "https://images.pexels.com/photos/13350258/pexels-photo-13350258.jpeg",
    description: "Explore how AI is transforming the way we create blog content.",
    content: "Artificial intelligence is revolutionizing content creation by enabling faster drafting, smarter editing, and improved personalization. Tools like GPT and AI paraphrasers are empowering bloggers to generate ideas, structure posts, and maintain consistent tone with ease."
  },
  {
    title: "Top 5 Productivity Tips for Bloggers",
    url: "#",
    image: "https://images.pexels.com/photos/13350258/pexels-photo-13350258.jpeg",
    description: "Boost your blogging productivity with these practical tips.",
    content: "From planning your editorial calendar to using AI-powered writing assistants, there are many ways bloggers can stay efficient. Tools like Notion, Grammarly, and AI CMS platforms like NeuroPress can help streamline your workflow."
  },
  {
    title: "Why Every Blogger Needs a Smart CMS",
    url: "#",
    image: "https://images.pexels.com/photos/13350258/pexels-photo-13350258.jpeg",
    description: "Learn the benefits of using an AI-powered CMS for blogging.",
    content: "A smart CMS like NeuroPress not only helps with managing content but also assists in generating ideas, improving SEO, and publishing efficiently. This makes it an essential tool for both new and experienced bloggers."
  },
]

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-8">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map(blog => (
          <BlogCard key={blog.title} blog={blog} />))}
      </div>
    </div>
  )
}
