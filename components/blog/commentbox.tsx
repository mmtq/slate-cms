'use client';

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Comments from "./comments";

interface Props {}

const CommentBox = ({}: Props) => {
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
          />
          <Button type="submit" size={'sm'}>Submit</Button>
        </div>
      </div>
      
      <Comments />
    </div>
  );
};

export default CommentBox;
