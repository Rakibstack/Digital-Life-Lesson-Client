import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DynamicLoading from '../../Component/Loading/Loading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure()

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/dashboard/admin/manage-users')
            return res.data;
        }
    })
    const HandleAdmin = (email) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be update this user",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/dashboard/admin/updateUser/${email}`)
                .then(res => {
                    if (res.data.modifiedCount) {
                        refetch()
                        Swal.fire({
                            title: "Updated!",
                            text: "User Updated to an Admin",
                            icon: "success"
                        });
                    }
                })
            }
          });
    }

    const HandleDelete = (email) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be Delete this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/dashboard/admin/delete?email=${email}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch()
                            Swal.fire({
                                title: "Delete!",
                                text: "User Delete successful",
                                icon: "success"
                            });
                        }
                    })
            }
        });



    }


    if (isLoading) {
        return <DynamicLoading> </DynamicLoading>
    }

    return (
        <div className="p-6">
            <title>Manage-User</title>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-3 text-left">User Name</th>
                            <th className="border px-4 py-3 text-left">Email</th>
                            <th className="border px-4 py-3 text-left">Role</th>
                            <th className="border px-4 py-3 text-left">Total Lessons</th>
                            <th className="border px-4 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.email} className="hover:bg-gray-50 transition-colors">
                                <td className="border px-4 py-2">{user?.name}</td>
                                <td className="border px-4 py-2">{user?.email}</td>
                                <td className="border px-4 py-2 capitalize">{user?.role}</td>
                                <td className="border px-4 py-2 text-center">{user?.totalLessons}</td>
                                <td className="border px-4 py-2 flex gap-2">
                                    {user.role !== 'admin' && (
                                        <button onClick={() => HandleAdmin(user?.email)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                                            Promote to Admin
                                        </button>
                                    )}
                                    <button onClick={() => HandleDelete(user?.email)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
