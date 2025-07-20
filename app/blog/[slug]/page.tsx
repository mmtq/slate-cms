import ImageWithAutoSize from "@/components/blog/ImageWithAutoSize";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { blogSample } from "@/utils/blogs";
import { Calendar, Layers3, Tag, UserPen } from "lucide-react";

export default async function SingleBlog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blogs = blogSample;
  const blog = blogs.find(blog => blog.id === parseInt(slug));

  if (!blog) {
    return <div className="text-center py-10 text-red-500 font-semibold">Blog not found</div>;
  }

  return (
    <main className="p-4 max-w-3xl mx-auto overflow-hidden">
      <ImageWithAutoSize src={blog.image} alt={blog.title} className="mb-6 rounded-xs" />

      {/* Title */}
      <h1 className="text-3xl font-bold text-center tracking-tight mb-2">{blog.title}</h1>

      {/* Meta Info */}
      <div className="flex flex-wrap justify-center items-center text-sm text-muted-foreground gap-x-4 gap-y-1 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="size-4" />
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1">
          <UserPen className="size-4" />
          <span className="font-medium">{blog.author}</span>
        </div>
      </div>

      {/* Category & Tags */}
      <div className="flex flex-wrap justify-center items-start gap-4 text-xs text-muted-foreground mb-6">
        <div className="flex items-center gap-2">
          <Layers3 className="size-4" />
          <Button size="sm" variant="secondary" className="text-xs px-2 py-0.5 rounded-md">
            {blog.category}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <Tag className="size-4" />
          {blog.tags.map((tag, index) => (
            <Button
              key={index}
              size="sm"
              variant="ghost"
              className="min-w-fit text-xs px-2 py-0.5 rounded-md"
            >
              #{tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-center text-muted-foreground text-lg italic mb-6">{blog.description}</p>

      {/* Blog Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </main>
  );
}
