'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getAllComments } from "@/actions/admin-actions";

interface Props {

}

type commentType = {
    id: number,
    content: string,
    post: string,
    name: string
}


const ManageComment = ({ }: Props) => {
    const [comments, setComments] = useState<commentType[] | undefined>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await getAllComments();
                setComments(res ?? []);
            } catch (error) {
                console.error(error);
            }
        }
        fetchBlogs();
    }, [])

    const tableHeads = ['SL', 'Content', 'Post', 'Name'];

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
                    comments?.map((comment, index) => (
                        <TableRow key={comment.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{comment.content}</TableCell>
                            <TableCell>{comment.post}</TableCell>
                            <TableCell>{comment.name}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default ManageComment;