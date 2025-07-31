import ManageUser from "@/components/admin/manage-users";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Users() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return redirect("/");
    }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold mb-4 text-center">Manage Users</h1>
            <div className="flex justify-center">
                <div className="max-w-4xl overflow-x-auto sm:overflow-x-visible">
                    <ManageUser />
                </div>
            </div>
        </div>

    );
}