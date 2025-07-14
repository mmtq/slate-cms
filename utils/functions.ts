export function slugify(input: string): string {
  return input
    .normalize("NFKD")                       // 1. Normalize accents (e.g., é → e)
    .replace(/[\u0300-\u036f]/g, "")         // 2. Remove diacritics
    .replace(/[^a-zA-Z0-9\s-]/g, "")         // 3. Remove invalid chars (only keep letters, numbers, space, dash)
    .trim()                                  // 4. Trim whitespace
    .replace(/\s+/g, "-")                    // 5. Replace spaces with dash
    .replace(/-+/g, "-")                     // 6. Replace multiple dashes with single dash
    .toLowerCase();                          // 7. Convert to lowercase
}
