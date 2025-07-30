'use client'

import { getAllBlogs } from "@/actions/admin-actions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

type blogType = {
    id: number,
    title: string,
    slug: string,
    createdAt: string | null,
    status: string,
    category: string,
    author: string
}

export default function Blogs() {
    const [blogs, setBlogs] = useState<blogType[] | undefined>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await getAllBlogs();
                setBlogs(res);
            } catch (error) {
                console.error(error);
            }
        }
        fetchBlogs();
    }, [])

    const tableHeads = ['SL', 'Title', 'Category', 'Author', 'Status', 'Action'];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4 text-center">Manage Blogs</h1>
            <div className="flex justify-center">
                <div className="max-w-4xl overflow-x-auto sm:overflow-x-visible">
                    <Table className="table-auto">
                        <TableHeader>
                            <TableRow>
                                {
                                    tableHeads.map((head) => (
                                        <TableHead key={head}>{head}</TableHead>
                                    ))
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                blogs?.map((blog, index) => (
                                    <TableRow key={blog.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{blog.title}</TableCell>
                                        <TableCell>{blog.category}</TableCell>
                                        <TableCell>{blog.author}</TableCell>
                                        <TableCell>{blog.status}</TableCell>
                                        <TableCell>
                                            <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer">View</a>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}