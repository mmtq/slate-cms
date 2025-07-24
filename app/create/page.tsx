'use client'
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { pinata } from "@/utils/pinata-config";
import { getTemporaryURL } from "@/actions/pinata";

import BlogContentEditor from "@/components/blog/blog-content-editor";
import BlogDetailsForm from "@/components/blog/blog-details-form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingScreen from "@/components/general/loading-screen";
import { createPost } from "@/actions/post-crud-actions";
import { toast } from "sonner";

export default function Page() {
    const router = useRouter();
    const { isPending, data: session } = useSession();
    const [checkedAuth, setCheckedAuth] = useState(false);

    useEffect(() => {
        if (!isPending) {
            if (!session?.user) {
                router.push('/auth/login');
            } else {
                setCheckedAuth(true);
            }
        }
    }, [isPending, session, router]);
    const [title, setTitle] = useState<string>('');
    const [slug, setSlug] = useState<string>('');
    const [excerpt, setExcerpt] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);
    const [category, setCategory] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [status, setStatus] = useState<'draft' | 'published'>('draft');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);

    const [activeTab, setActiveTab] = useState("details");
    const [isLoading, setIsLoading] = useState(false);

    const uploadImage = async (): Promise<string | null> => {
        try {
            const { url } = await getTemporaryURL();
            const uploadResponse = await pinata.upload.public.file(featuredImage!).url(url);
            const fileUrl = await pinata.gateways.public.convert(uploadResponse.cid);
            return fileUrl;
        } catch (error) {
            console.error(error);
            return null;
        }
    };


    const handleClick = async () => {
        setIsLoading(true);
        let imageUrl = null;

        if (featuredImage) {
            imageUrl = await uploadImage(); 
        }

        try {
            const res = await createPost({
                title,
                slug,
                author: session!.user.id,
                excerpt,
                description,
                category: Number(category),
                tags,
                content,
                status,
                image: imageUrl,
            });

            if (res.success) {
                toast.success(res.message);
            }
            else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }

        setIsLoading(false);
    };

    if (isPending || !checkedAuth) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <div className="p-4 flex w-full flex-col gap-6 max-w-3xl mx-auto min-h-[100vh]">
            <h1 className="text-2xl font-bold text-center md:hidden">Create a New Blog</h1>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="">
                <div className="flex items-center justify-between mb-2">
                    <TabsList>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="content">Content</TabsTrigger>
                    </TabsList>
                    <div className="flex gap-2 items-center justify-center">
                        <Select defaultValue={status} onValueChange={(value) => setStatus(value as "published" | "draft")}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="published">Publish</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button type="submit" variant="outline" disabled={isLoading} onClick={handleClick}>{isLoading ? "Saving..." : "Save"}</Button>
                    </div>

                </div>
                <TabsContent value="details" className="p-2">
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
                        featuredImage={featuredImage}
                        setFeaturedImage={setFeaturedImage}
                    />
                </TabsContent>
                <TabsContent value="content">
                    <BlogContentEditor
                        content={content}
                        setContent={setContent}
                        shouldFocus={activeTab === "content"}
                    />
                </TabsContent>
            </Tabs>
        </div >

    );
}