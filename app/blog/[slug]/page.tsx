import { getSingleBlog } from "@/actions/post-crud-actions";
import CommentBox from "@/components/blog/commentbox";
import ImageWithAutoSize from "@/components/blog/ImageWithAutoSize";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Calendar, Layers3, Tag, UserPen } from "lucide-react";
import Image from "next/image";

interface SingleBlogProps {
  params: { slug: string };
}

export default async function SingleBlog({ params }: SingleBlogProps) {
  const { slug } = await params;
  let response = await getSingleBlog(slug);
  const blog = response && response.blog
  const tags = response && response.tags

  if (!blog) {
    return (
      <div className="text-center py-10 text-destructive font-semibold">
        Blog not found
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto overflow-hidden">
      {/* Blog Cover */}
      <div className="relative w-full aspect-[16/9] mb-6 rounded-md overflow-hidden">
        <Image
          src={blog.image ?? ""}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>


      {/* Title */}
      <h1 className="text-3xl font-bold text-center tracking-tight mb-2 text-foreground">
        {blog.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap justify-center items-center text-sm text-muted-foreground gap-x-4 gap-y-1 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="size-4" />
          <span>
            {blog.createdAt
              && formatDate(new Date(blog.createdAt))
            }
          </span>
        </div>
        <div className="flex items-center gap-1">
          <UserPen className="size-4" />
          <span className="font-medium">{blog.author}</span>
        </div>
      </div>

      {/* Category & Tags */}
      <div className="flex flex-wrap justify-center gap-4 text-xs mb-6 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Layers3 className="size-4" />
          <Button
            size="sm"
            variant="secondary"
            className="text-xs px-2 py-0.5 rounded-md"
          >
            {blog.category}
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          <Tag className="size-4" />
          {tags?.map((tag, index) => (
            <Button
              key={index}
              size="sm"
              variant="ghost"
              className="min-w-fit text-xs px-2 py-0.5 rounded-md"
            >
              #{tag.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="" >{blog.description}</div>

      {/* Blog Content */}
      <article className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }}>
        {/* blog content here */}
      </article>

      {/* Comments Section */}
      <CommentBox postId={blog.id}  />
    </div>
  );
}
