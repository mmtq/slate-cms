'use client';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props {

}

const BlogContentEditor = ({ }: Props) => {
    const [content, setContent] = useState('');

    return (
        <form className="mx-auto">
            <div className="min-h-[300px]">
                <ReactQuill
                    theme="snow"
                    placeholder="Start typing..."
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
                        'bullet',
                        'link',
                        'image',
                        'blockquote',
                        'code-block',
                    ]}
                />
            </div>
            <div className="flex gap-2">
                <Select defaultValue="draft">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="publish">Publish</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button type="submit" variant="outline">Save</Button>
            </div>

        </form>

    );
};

export default BlogContentEditor;