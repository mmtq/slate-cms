'use client'
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { pinata } from "@/utils/pinata-config";
import { getTemporaryURL } from "@/actions/pinata";

import BlogContentEditor from "@/components/blog/blog-content-editor";
import BlogDetailsForm from "@/components/blog/blog-details-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingScreen from "@/components/general/loading-screen";

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
    const [status, setStatus] = useState<string>('draft');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);

    const [activeTab, setActiveTab] = useState("details");


    const uploadImage = async () => {
        try {
            const { url } = await getTemporaryURL()
            const uploadResponse = await pinata.upload.public.file(
                featuredImage!).url(url)

            const fileUrl = await pinata.gateways.public.convert(uploadResponse.cid)
            setPreviewUrl(fileUrl)
        } catch (error) {
            console.error(error)
        }
    }

    const handleClick = () => {
        if (featuredImage) {
            uploadImage()
        }
    }

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
                        <Select defaultValue={status} onValueChange={(value) => setStatus(value)}>
                            <SelectTrigger className="w-[100px]">
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