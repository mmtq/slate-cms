'use client';

import { User } from "lucide-react";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";

interface Props {}

const comments = [
  {
    id: 1,
    name: "Emily Carter",
    comment: "I really enjoyed reading this. Thanks for sharing!",
    likes: 12,
    replies: [
      {
        id: 2,
        name: "David Nguyen",
        comment: "Totally agree with you. Very insightful!",
        likes: 5,
      },
    ],
  },
  {
    id: 3,
    name: "Michael Johnson",
    comment: "Could you explain a bit more about the last part?",
    likes: 8,
    replies: [],
  },
  {
    id: 4,
    name: "Sophia Martinez",
    comment: "Great points, especially about staying consistent.",
    likes: 17,
    replies: [
      {
        id: 5,
        name: "Ava Patel",
        comment: "Yes! Consistency really is key.",
        likes: 4,
      },
      {
        id: 6,
        name: "Liam Brown",
        comment: "I second that. Great insight!",
        likes: 3,
      },
    ],
  },
  {
    id: 7,
    name: "Noah Wilson",
    comment: "Thanks! This helped clarify a lot for me.",
    likes: 9,
    replies: [],
  },
];


const Comments = ({}: Props) => {
    const [activeReplyBox, setActiveReplyBox] = useState<number | null>(null)

    const handleReplyBox = (id: number) => {
        if (activeReplyBox === id){
            setActiveReplyBox(null)
        } else {
            setActiveReplyBox(id)
        }
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
            <p className="text-sm text-foreground">{comment.comment}</p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Like ({comment.likes})
              </Button>
              <Button variant="ghost" size="sm" onClick={()=>handleReplyBox(comment.id)} >
                Reply
              </Button>
            </div>
            
            {
                comment.id === activeReplyBox && (
                    <div className="space-y-2">
                        <Textarea placeholder="Add a reply" defaultValue={"@" + comments.find( c => c.id === activeReplyBox)?.name + " " || ""} />
                        <Button variant={'secondary'} size={'sm'}>Reply</Button>
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
                      <p className="text-sm text-muted-foreground">{reply.comment}</p>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Like({reply.likes})
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
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
