'use client';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props {
    content: string
    setContent: (content: string) => void
}

const BlogContentEditor = ({content, setContent }: Props) => {

    return (
        <form className="mx-auto">
                <ReactQuill
                    className='max-w-4xl mx-auto min-h-[200px] max-h-[450px]'
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={{
                        toolbar: [
                            [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }],
                            [{ 'size': [] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['link', 'image', 'blockquote', 'code-block'],
                            ['clean'],
                        ],
                    }}
                    formats={[
                        'header',
                        'size',
                        'bold',
                        'italic',
                        'underline',
                        'strike',
                        'list',
                        'link',
                        'image',
                        'blockquote',
                        'code-block',
                    ]}
                />
        </form>

    );
};

export default BlogContentEditor;