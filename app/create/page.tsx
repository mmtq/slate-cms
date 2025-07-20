'use client'
import BlogContentEditor from "@/components/blog/blog-content-editor";
import BlogDetailsForm from "@/components/blog/blog-details-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/lib/auth-client";
import { storage } from "@/utils/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function Page() {
    const router = useRouter()

    const session = useSession()
    if (!session || !session.data?.user) {
        router.push('/auth/login')
    }

    const [isPending, startTransition] = useTransition()
    
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

    const uploadImage = () => {
        startTransition( async () => {
            const storageRef = ref(storage, `images/${featuredImage?.name}`)
            try {
                await uploadBytes(storageRef, featuredImage!)
                const url = await getDownloadURL(storageRef)
                setPreviewUrl(url)
                console.log('image uploaded',url)
            } catch (error) {
                console.error(error)
            }
        })
    }

    const handleClick = () => {
        if (featuredImage) {
            uploadImage()
        }
    }

    return (
        <div className="p-4 flex w-full flex-col gap-6 max-w-3xl mx-auto">
            {/* <h1 className="text-2xl font-bold text-center">Create Blog</h1> */}

            <Tabs defaultValue="account" className="">
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
                                featuredImage={featuredImage}
                                setFeaturedImage={setFeaturedImage}
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