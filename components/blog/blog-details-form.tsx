'use client';

import { useState, KeyboardEvent as ReactKeyboardEvent, useEffect } from "react";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { slugify } from "@/utils/functions";
import ImageUploader from "./image-uploader";
import { getCategories } from "@/actions/post-crud-actions";
import { categoryType } from "@/utils/types";

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
  featuredImage: File | null;
  setFeaturedImage: (file: File | null) => void;
}

export default function BlogDetailsForm(props: Props) {
  const {
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
    setPreviewUrl,
    featuredImage,
    setFeaturedImage,
  } = props;

  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState<categoryType[] | null>(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        console.log("Categories:", categories);
        setCategories(categories ?? null);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleTagKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }

    if (e.key === "Backspace" && tagInput === "" && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // const handleFileSelect = (file: File) => {
  //   console.log("Selected File", file);
  // };

  return (
    <div
      className="space-y-3 mx-auto"    >
      {[
        {
          label: "Title",
          id: "title",
          value: title,
          onChange: (e: any) => {
            setTitle(e.target.value);
            setSlug(slugify(e.target.value));
          },
        },
        {
          label: "Slug",
          id: "slug",
          value: slug,
          onChange: (e: any) => setSlug(e.target.value),
        },
        {
          label: "Excerpt",
          id: "excerpt",
          value: excerpt,
          onChange: (e: any) => setExcerpt(e.target.value),
        },
        {
          label: "Meta Description",
          id: "description",
          value: description,
          onChange: (e: any) => setDescription(e.target.value),
        },
      ].map((field, i) => (
        <div
          key={field.id}
          className="space-y-2"
        >
          <Label htmlFor={field.id}>{field.label}</Label>
          <Input
            id={field.id}
            type="text"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            value={field.value}
            onChange={field.onChange}
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <div className="flex gap-2">
        <Label>Featured Image</Label>
        <ImageUploader
          // onFileSelect={handleFileSelect}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          featuredImage={featuredImage}
          setFeaturedImage={setFeaturedImage}
        />
      </div>
      {previewUrl && (
        <div className="">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full md:w-[70%] rounded-md object-contain max-h-[70vh] mx-auto"
          />
        </div>
      )}


      <div className="flex gap-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {
                categories &&
                categories.map((category) => (
                  <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                ))
              }
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="w-full min-h-[42px] border rounded flex flex-wrap items-center gap-1 px-2 py-1 focus-within:ring-2 focus-within:ring-ring">
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
            placeholder="Add tags and press Enter"
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
