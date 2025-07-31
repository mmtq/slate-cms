'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getAllBlogs } from "@/actions/admin-actions";

interface Props {

}

type blogType = {
    id: number,
    title: string,
    slug: string,
    createdAt: string | null,
    status: string,
    category: string,
    author: string
}


const ManageBlog = ({ }: Props) => {
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
    );
};

export default ManageBlog;