'use client';

import dynamic from 'next/dynamic';
import { Easing, motion } from 'framer-motion';
import 'react-quill-new/dist/quill.snow.css';
import { Label } from '../ui/label';
import { useTheme } from 'next-themes'; // Optional if you're managing dark mode

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface Props {
  content: string;
  setContent: (content: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as Easing,
    },
  },
};

export default function BlogContentEditor({ content, setContent }: Props) {
  return (
    <motion.div
      className="w-full max-w-5xl mx-auto space-y-6"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div variants={fadeInUp} className="text-left">
        {/* <Label className="text-lg font-medium text-foreground mb-2 block">
          Blog Content
        </Label> */}
        <div className="bg-transparent overflow-hidden">
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            className="quill-editor"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image', 'blockquote', 'code-block'],
                ['clean'],
              ],
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
