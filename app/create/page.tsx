'use client'
import BlogContentEditor from "@/components/blog/blog-content-editor";
import BlogDetailsForm from "@/components/blog/blog-details-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";


export default function Page() {
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
                            <BlogDetailsForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardContent>
                            <BlogContentEditor />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div >

    );
}