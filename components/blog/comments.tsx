'use client';

import { User } from "lucide-react";
import { Button } from "../ui/button";
import React, { useState, useTransition } from "react";
import { Textarea } from "../ui/textarea";
import { createComment } from "@/actions/post-crud-actions";
import { set } from "zod";

interface Props {
  comments: {
    id: number;
    postId: number;
    userId: string;
    name: string;
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
  }[],
  userId?: string
}

const Comments = ({ comments, userId }: Props) => {
  const [activeReplyBox, setActiveReplyBox] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const [reply, setReply] = useState('')
  const [error, setError] = useState('')

  const handleReplyBox = (id: number) => {
    if (activeReplyBox === id) {
      setActiveReplyBox(null)
    } else {
      setActiveReplyBox(id)
    }
    // setActiveReplyBox(id)
  }

  function handleClick() {
    startTransition(async () => {
      try {
        if (!userId) {
          setError('You must be logged in to comment')
        } else {
          const res = await createComment({ postId: comments[0].postId, userId: userId, content: reply, parentId: activeReplyBox ?? undefined })

          if (res.success && res.comment) {
            comments.map(comment => {
              if (comment.id === activeReplyBox) {
                comment.replies.push(res.comment)
              }
            })
            setActiveReplyBox(null)
            setReply('')
            };
        }
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <div className="mt-6 space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="border rounded-full p-1 border-border">
              <User size={18} className="text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">{comment.name}</p>
          </div>
          <div className="ml-8 space-y-2">
            <p className="text-sm text-foreground">{comment.content}</p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Like ({comment.likesCount})
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleReplyBox(comment.id)} >
                Reply
              </Button>
            </div>

            {
              comment.id === activeReplyBox && (
                <div className="space-y-2">
                  <Textarea placeholder="Add a reply" onChange={(e) => setReply(e.target.value)}/>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button variant={'secondary'} size={'sm'} onClick={handleClick}>Reply</Button>
                </div>
              )
            }

            {comment.replies.length > 0 && (
              <div className="mt-3 space-y-3 border-l border-border pl-4">
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="flex items-start gap-3"
                  >
                    <div className="border rounded-full p-1 mt-1 border-border">
                      <User size={14} className="text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">{reply.name}</p>
                      <p className="text-sm text-muted-foreground">{reply.content}</p>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Like({reply.likesCount})
                        </Button>
                        {/* <Button variant="ghost" size="sm">
                          Reply
                        </Button> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
