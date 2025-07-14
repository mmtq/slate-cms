'use client'
import BlogContentEditor from "@/components/blog/blog-content-editor";
import BlogDetailsForm from "@/components/blog/blog-details-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// interface statusType{
//     status: 'draft' | 'publish'
// }


export default function Page() {
    const [title, setTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [excerpt, setExcerpt] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [category, setCategory] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [status, setStatus] = useState<string>('draft');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    const handleClick = () => {
        console.log('title', title);
        console.log('excerpt', excerpt);
        console.log('description', description);
        console.log('tags', tags);
        console.log('category', category);
        console.log('content', content);
        console.log('status', status);
    }

    return (
        <div className="p-4 flex w-full flex-col gap-6">
            {/* <h1 className="text-2xl font-bold text-center">Create Blog</h1> */}

            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Details</TabsTrigger>
                    <TabsTrigger value="password">Content</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardContent>
                            <BlogDetailsForm
                                title={title}
                                setTitle={setTitle}
                                slug={slug}
                                setSlug={setSlug}
                                excerpt={excerpt}
                                setExcerpt={setExcerpt}
                                description={description}
                                setDescription={setDescription}
                                tags={tags}
                                setTags={setTags}
                                category={category}
                                setCategory={setCategory}
                                previewUrl={previewUrl}
                                setPreviewUrl={setPreviewUrl}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardContent>
                            <BlogContentEditor
                                content={content}
                                setContent={setContent}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <div className="flex gap-2 items-center justify-center">
                    <Select defaultValue={status} onValueChange={(value) => setStatus(value)}>
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
                    <Button type="button" variant="outline" onClick={handleClick}>Save</Button>
                </div>
            </Tabs>

        </div >

    );
}