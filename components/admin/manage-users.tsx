'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getAllBlogs, getAllUsers } from "@/actions/admin-actions";

interface Props {

}

type userType = {
    id: string,
    name: string,
    email: string,
    role: 'user' | 'admin' | undefined
}


const ManageUser = ({ }: Props) => {
    const [users, setUsers] = useState<userType[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await getAllUsers();
                setUsers(res ?? []);
            } catch (error) {
                console.error(error);
            }
        }
        fetchBlogs();
    }, [])

    const tableHeads = ['SL', 'Name', 'Email', 'Role', 'Action'];

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
                    users?.map((user, index) => (
                        <TableRow key={user.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default ManageUser;