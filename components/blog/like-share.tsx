'use client';

import { Share, Share2, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { likePost } from "@/actions/post-crud-actions";

interface Props {
    likes: number
    postId: number
    userId?: string
}

const LikeShare = ({ likes, postId, userId }: Props) => {
    const [likesCount, setLikesCount] = useState(likes);

    async function onClickLike() {
        try {
            if (!userId) {
                return;
            }
            // 
            const res = await likePost({postId, userId});
            if (res.success) {
                setLikesCount(likesCount + 1);
            }
        } catch (error) {
            
        }
    }
    return (
        <div className="flex gap-2">
            <Button disabled={!userId} size={"sm"} onClick={onClickLike}>
                <ThumbsUp /> <span>{likesCount}</span>
            </Button>
            <Button size={"sm"}>
                <Share2 />
            </Button>
        </div>
    );
};

export default LikeShare;