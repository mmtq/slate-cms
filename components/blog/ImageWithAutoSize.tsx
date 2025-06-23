'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ImageWithAutoSize({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      const height = 900;
      const width = Math.round(height / ratio);
      setDimensions({ width, height });
    };
  }, [src]);

  if (!dimensions) {
    return <div className="text-muted-foreground text-sm">Loading image...</div>;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      // className="object-contain rounded-xl mx-auto"
      className={cn("object-contain rounded-xl mx-auto", className)}
    />
  );
}
