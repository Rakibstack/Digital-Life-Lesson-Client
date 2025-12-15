import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2 } from 'lucide-react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useUser from '../Hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import DynamicLoading from '../Component/Loading/Loading';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyLesson = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { isPremium } = useUser();

    const { data: myLesson = [], isLoading, refetch } = useQuery({
        queryKey: ['mylesson', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-lessons?email=${user?.email}`);
            return res.data;
        },
    });

    const handleVisibilityChange =  (id, visibility) => {
        try {
             axiosSecure.patch(`/lessons/visibility/${id}`, {
                visibility: visibility
            }).then(res => {
                if(res.data.modifiedCount){
                   Swal.fire({
                    title: "Success!",
                    text: "Your visibility Has Been Updated",
                    icon: "success"
                });  
                }
            }
            )
            refetch()
        }
        catch (err) {
            console.log(err);
        }
    }

    const HandleDelete =  (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be Delete this Lesson!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then( (result) => {
            if (result.isConfirmed) {
               axiosSecure.delete(`/lessons/delete/${id}`)
               .then((res) => {
                if(res.data.deletedCount){
                    Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                 refetch()
                }           
               })
            }
        });
    }

    if (isLoading) {

        return <DynamicLoading></DynamicLoading>
    }

    return (
        <div className="p-6">
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold mb-6"
            >
                My Lessons
            </motion.h2>

            <div className="overflow-x-auto rounded-2xl bg-white shadow">
                <table className="table w-full">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th>Title</th>
                            <th>Visibility</th>
                            <th>Access</th>
                            <th>Created</th>
                            <th>❤️ Reactions</th>
                            <th>⭐ Saves</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {myLesson.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-10 text-gray-400">
                                    You haven't created any lessons yet
                                </td>
                            </tr>
                        )}

                        {myLesson.map((lesson) => (
                            <motion.tr
                                key={lesson._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-gray-50"
                            >
                                <td className="font-medium">{lesson.title}</td>

                                <td>
                                    <select
                                        className="select select-sm select-bordered"
                                        value={lesson.visibility}
                                        onChange={(e) => handleVisibilityChange(lesson._id, e.target.value)}
                                    >
                                        <option value="public">Public</option>
                                        <option value="private">Private</option>
                                    </select>
                                </td>

                                <td>
                                    {isPremium ? (
                                        <select
                                            className="select select-sm select-bordered"
                                            value={lesson.accessLevel}
                                        >
                                            <option value="free">Free</option>
                                            <option value="premium">Premium</option>
                                        </select>
                                    ) : (
                                        <span className="text-gray-400 text-sm">Premium only</span>
                                    )}
                                </td>

                                <td>
                                    {lesson.createdAt
                                        ? new Date(lesson.createdAt).toLocaleDateString()
                                        : '—'}
                                </td>

                                <td>{lesson.likes || 0}</td>
                                <td>{lesson.favoritesCount || 0}</td>

                                <td className="flex gap-2">
                                    <Link to={`/lessons/${lesson._id}`} className="btn btn-sm btn-outline" title="Details">
                                        <Eye size={16} />
                                    </Link>

                                    <button className="btn btn-sm btn-outline btn-info" title="Update">
                                        <Edit size={16} />
                                    </button>

                                    <button onClick={() => HandleDelete(lesson._id)} className="btn btn-sm btn-outline btn-error" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete confirmation modal (UI only) */}
            <dialog className="modal" id="delete_modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Lesson</h3>
                    <p className="py-4">
                        Are you sure you want to permanently delete this lesson?
                    </p>
                    <div className="modal-action">
                        <button className="btn btn-error">Delete</button>
                        <button className="btn">Cancel</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyLesson;