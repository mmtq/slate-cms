'use client';

import { useState, KeyboardEvent as ReactKeyboardEvent } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";

export default function BlogDetailsForm() {
    const [details, setDetails] = useState({
        title: '',
        description: '',
        category: '',
        tags: [] as string[],
    });
    const [tagInput, setTagInput] = useState('');

    const handleTagKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (!details.tags.includes(newTag)) {
                setDetails(prev => ({
                    ...prev,
                    tags: [...prev.tags, newTag],
                }));
            }
            setTagInput('');
        }

        // Optional: remove last tag with Backspace
        if (e.key === 'Backspace' && tagInput === '') {
            setDetails(prev => ({
                ...prev,
                tags: prev.tags.slice(0, -1),
            }));
        }
    };

    const removeTag = (tag: string) => {
        setDetails(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag),
        }));
    };

    return (
        <form className="mt-4 space-y-4 mx-auto p-2">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    type="text"
                    placeholder="Title"
                    value={details.title}
                    onChange={(e) =>
                        setDetails({ ...details, title: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    type="text"
                    placeholder="Description"
                    value={details.description}
                    onChange={(e) =>
                        setDetails({ ...details, description: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="gap-2 flex">
                <Label htmlFor="content">Category</Label>
                <Select value={details.category} onValueChange={(value) => setDetails({ ...details, category: value })}>
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
                    {details.tags.map((tag, idx) => (
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
                        placeholder="Add tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        className="flex-grow outline-none bg-transparent text-sm py-1"
                    />
                </div>
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
}
