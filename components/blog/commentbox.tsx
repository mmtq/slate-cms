'use client';

import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Comments from "./comments";
import { useSession } from "@/lib/auth-client";
import { createComment, getComments } from "@/actions/post-crud-actions";
import { toast } from "sonner";

interface Props {
  postId: number;
}

interface commentType {
  id: number;
  postId: number;
  userId: string;
  name: string
  parentId: number | null;
  content: string;
  likesCount: number;
  createdAt: string | null;
  replies: {
    id: number;
    postId: number;
    userId: string;
    name: string
    parentId: number | null;
    content: string;
    likesCount: number;
    createdAt: string | null;
  }[];
}

const CommentBox = ({ postId }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState<commentType[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getComments(postId);
      setAllComments(response ? response.map((c: any) => ({
        id: c.id,
        postId: c.postId,
        userId: c.userId,
        name: String(c.name),
        parentId: c.parentId,
        content: c.content,
        likesCount: c.likesCount || 0,
        createdAt: c.createdAt,
        replies: c.replies,
      })) : []);
    };
    fetchComments();
  }, [])

  const { data } = useSession()

  const handleClick = () => {
    startTransition(async () => {
      try {

        if (!data) {
          setError('You must be logged in to comment')
        } else {
          const res = await createComment({ postId: postId, userId: data.user.id, content: newComment })
          if (res.success && res.comment) {
            const comment = {
              id: res.comment.id,
              postId: res.comment.postId,
              userId: res.comment.userId,
              name: String(res.comment.name),
              parentId: res.comment.parentId,
              content: res.comment.content,
              likesCount: res.comment.likesCount || 0,
              createdAt: res.comment.createdAt,
              replies: [],
            };
            setAllComments((prev) => [...prev, comment]);
          } else {
            toast.error(res.message)
          }
          setNewComment('');
        }
      } catch (error) {
        console.error(error);
      }
    })
  }

  return (
    <div className="mt-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Comments
        </h2>
        <div className="space-y-3">
          <Textarea
            placeholder="Leave a comment..."
            className="min-h-[100px]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" size={'sm'} onClick={handleClick} disabled={isPending}>{isPending ? 'Commenting...' : 'Comment'}</Button>
        </div>
      </div>

      <Comments comments={allComments} />
    </div>
  );
};

export default CommentBox;
