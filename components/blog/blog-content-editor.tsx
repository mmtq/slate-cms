'use client';

import { marked } from 'marked';
import { Easing, motion } from 'framer-motion';
import 'react-quill-new/dist/quill.snow.css';
import { useEffect, useRef, useState, useTransition } from 'react';
import ReactQuill from 'react-quill-new';
import { Button } from '../ui/button';
import { Sparkle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { DialogClose } from '@radix-ui/react-dialog';
import { AIContentGenerator } from '@/actions/groq-api';
import { start } from 'repl';
import { toast } from 'sonner';

interface Props {
  content: string;
  setContent: (content: string) => void;
  shouldFocus?: boolean;
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

export default function BlogContentEditor({ content, setContent, shouldFocus }: Props) {

  const [prompt, setPrompt] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [hasSelection, setHasSelection] = useState<boolean>(false);

  const quillRef = useRef<ReactQuill>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (shouldFocus && quillRef.current) {
      const editor = quillRef.current?.getEditor();
      setTimeout(() => editor?.focus(), 0); // ensures DOM is fully ready
    }
  }, [shouldFocus]);

  const generateContent = () => {
    startTransition(async () => {
      try {
        const res = await AIContentGenerator({ prompt, contentGen: true });
        const html = marked.parse(res as string); // ✅ Convert to HTML
        setContent(html as any);                  // ✅ Pass HTML to ReactQuill
        dialogCloseRef.current?.click();
      } catch (error) {
        console.error(error);
      }
    })
  };

  const handleSelectionChange = () => {
    const selection = quillRef?.current?.getEditor()?.getSelection();
    if (selection) {
      setHasSelection(selection.length > 0);
    }
  };

const paraphraseContent = () => {
  const editor = quillRef?.current?.getEditor();
  const selection = editor?.getSelection();

  if (!editor || !selection || selection.length === 0) {
    toast.error("No text selected to paraphrase.");
    return;
  }

  const selectedText = editor.getText(selection.index, selection.length);

  startTransition(async () => {
    try {
      const res = await AIContentGenerator({
        prompt: selectedText,
        contentGen: false,
      });

      const html = marked.parse(res);
      editor.deleteText(selection.index, selection.length);

      editor.clipboard.dangerouslyPasteHTML(selection.index, html as string, 'user');
      toast.success("Paraphrase successful!");
      setHasSelection(false);
    } catch (error) {
      console.error("Paraphrasing failed:", error);
      toast.error("Failed to paraphrase the selected text.");
    }
  });
};


  return (
    <motion.div
      className="mx-auto space-y-3"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div variants={fadeInUp} className="text-left">
        {/* <Label className="text-lg font-medium text-foreground mb-2 block">
          Blog Content
        </Label> */}
        <div className="bg-transparent overflow-hidden focus-within:outline-none">
          <ReactQuill
            value={content}
            ref={quillRef}
            onChange={setContent}
            onChangeSelection={handleSelectionChange}
            placeholder='...'
            theme="snow"
            className="quill-editor"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'], ['blockquote','code-block'],
                ['clean'],
              ],
            }}
          />
        </div>
      </motion.div>
      {hasSelection ? (
        <Button size={'sm'} onClick={paraphraseContent} disabled={isPending} className="absolute" type="button">
          {isPending ? 'Paraphrasing...' : 'Paraphrase using AI'} <Sparkle />
        </Button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button size={'sm'} type="button">Generate Content with AI <Sparkle /></Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                Give a brief on the content you want to generate
              </DialogDescription>
            </DialogHeader>
            <Textarea
              className="min-h-[200px] md:min-h-[150px]"
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write a blog about..."
            />
            <DialogFooter>
              <DialogClose asChild ref={dialogCloseRef}>
                <Button size="sm" variant="ghost">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={generateContent}
                size="sm"
                variant="secondary"
                disabled={isPending}
              >
                {isPending ? 'Generating...' : 'Generate'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

    </motion.div>
  );
}
