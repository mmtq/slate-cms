'use client';
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Props {
  // onFileSelect: (file: File) => void;
  previewUrl: string | null
  setPreviewUrl: (previewUrl: string | null) => void
  featuredImage: File | null
  setFeaturedImage: (file: File | null) => void
}

export default function ImageUploader({
  previewUrl,
  setPreviewUrl,
  featuredImage,
  setFeaturedImage
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFeaturedImage(file);
    }
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <div className="flex gap-2 items-center">
        <Button size={"sm"} type="button" variant={"outline"} onClick={handleButtonClick}>
          Select
        </Button>

        {previewUrl && (
          <p className="inline text-sm">{featuredImage!.name}</p>
        )}
      </div>
    </div>
  );
}
