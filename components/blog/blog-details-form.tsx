'use client';

import { useState, KeyboardEvent as ReactKeyboardEvent } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { slugify } from "@/utils/functions";
import ImageUploader from "./image-uploader";
import { file } from "zod";

interface Props {
    title: string;
    setTitle: (title: string) => void;
    slug: string;
    setSlug: (slug: string) => void;
    excerpt: string;
    setExcerpt: (excerpt: string) => void;
    description: string;
    setDescription: (description: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    category: string;
    setCategory: (category: string) => void;
    previewUrl: string | null;
    setPreviewUrl: (previewUrl: string | null) => void;
}

export default function BlogDetailsForm({
    title,
    setTitle,
    slug,
    setSlug,
    excerpt,
    setExcerpt,
    description,
    setDescription,
    tags,
    setTags,
    category,
    setCategory,
    previewUrl,
    setPreviewUrl

}: Props) {
    const [tagInput, setTagInput] = useState('');

    const handleTagKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (!tags.includes(newTag)) {
                setTags([...tags, newTag]); // ✅ use setTags
            }
            setTagInput('');
        }

        // Optional: remove last tag with Backspace
        if (e.key === 'Backspace' && tagInput === '' && tags.length > 0) {
            setTags(tags.slice(0, -1)); // ✅ use setTags
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag)); // ✅ use setTags
    };

    const handleFileSelect = (file: File) => {
        console.log('Selected File', file)
    }

    return (
        <div className="space-y-4 mx-auto">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        setSlug(slugify(e.target.value))
                    }
                    }
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                    id="slug"
                    type="text"
                    placeholder="Enter slug"
                    value={slug}
                    onChange={(e) =>
                        setSlug(e.target.value)
                    }
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input
                    id="excerpt"
                    type="text"
                    placeholder="Enter excerpt"
                    value={excerpt}
                    onChange={(e) =>
                        setExcerpt(e.target.value)
                    }
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Meta Description</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="Enter meta description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="flex gap-2">
                <Label>Featured Image</Label>
                <ImageUploader onFileSelect={handleFileSelect} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />
            </div>
            <div className="gap-2 flex">
                <Label htmlFor="content">Category</Label>
                <Select value={category} onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="ai">Aritifical Intelligence</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="gap-2 flex">
                <Label htmlFor="tags">Tags</Label>
                <div
                    className="w-full min-h-[42px] border rounded flex flex-wrap items-center gap-1 px-2 py-1 focus-within:ring-2 focus-within:ring-ring"
                >
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="flex items-center text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-red-500"
                            >
                                <X size={14} />
                            </button>
                        </span>
                    ))}
                    <input
                        type="text"
                        placeholder="Add tags separated by Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        className="flex-grow outline-none bg-transparent text-sm py-1"
                    />
                </div>
            </div>
        </div>
    );
}
