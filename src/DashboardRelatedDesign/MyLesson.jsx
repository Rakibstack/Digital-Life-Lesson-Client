import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2 } from 'lucide-react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useUser from '../Hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import DynamicLoading from '../Component/Loading/Loading';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const MyLesson = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { isPremium } = useUser();
    const modalRef = useRef()
    const [lessonId, setLessonId] = useState(null)
    const { register, handleSubmit, reset} = useForm()

    const { data: myLesson = [], isLoading, refetch } = useQuery({
        queryKey: ['mylesson', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-lessons?email=${user?.email}`);
            return res.data;
        },
    });



    const handleVisibilityChange = (id, visibility) => {
        try {
            axiosSecure.patch(`/mylessons/visibility/${id}`, {
                visibility: visibility
            }).then(res => {
                if (res.data.modifiedCount) {
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

    const HandleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be Delete this Lesson!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/mylessons/delete/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
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
    const HandleModal = (id) => {
        setLessonId(id)
        modalRef.current.showModal()
    }
    const HandleClose = () => {
        modalRef.current.close()
    }
    const onSubmitForm = (data) => {

        const { title, description, category,
            privacy, accessLevel, tone } = data

        const updateInfo = {
            title,
            description,
            category,
            privacy,
            accessLevel,
            tone
        }
        axiosSecure.patch(`/mylesson/update/${lessonId}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount ) {
                    reset()
                     Swal.fire({
                                title: "successful!",
                                text: "Lesson updated successfully.",
                                icon: "success"
                            });
                    refetch()
                    modalRef.current.close()
                }
            })
    }

    if (isLoading) {

        return <DynamicLoading></DynamicLoading>
    }

    return (
        <div className="p-6">
                        <title>My-Lessons</title>

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

                                    <button onClick={() => HandleModal(lesson._id)} className="btn btn-sm btn-outline btn-info" title="Update">
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

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="max-w-xl mx-auto bg-white/80 backdrop-blur-md 
                       border border-gray-200 shadow-2xl rounded-2xl 
                       p-10 mt-10"
                    >
                        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r 
                           from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Update Your Lesson
                        </h2>

                        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-5">

                            <motion.input
                                whileFocus={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                {...register("title", { required: true })}
                                placeholder="Lesson Title"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 outline-none"
                            />

                            <motion.textarea
                                whileFocus={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 200 }}
                                {...register("description", { required: true })}
                                rows={5}
                                placeholder="Write your full life lesson or story..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-500 outline-none resize-none"
                            ></motion.textarea>

                            <motion.select
                                whileHover={{ scale: 1.02 }}
                                {...register("category")}
                                className="w-full p-3 border rounded-lg outline-none focus:border-purple-500"
                            >
                                <option value="personal-growth">Personal Growth</option>
                                <option value="career">Career</option>
                                <option value="relationships">Relationships</option>
                                <option value="mindset">Mindset</option>
                                <option value="mistake-learned">Mistakes Learned</option>
                            </motion.select>

                            <motion.select
                                whileHover={{ scale: 1.02 }}
                                {...register("tone")}
                                className="w-full p-3 border rounded-lg outline-none focus:border-purple-500"
                            >
                                <option value="motivational">Motivational</option>
                                <option value="sad">Sad</option>
                                <option value="realization">Realization</option>
                                <option value="gratitude">Gratitude</option>
                            </motion.select>

                            <motion.select
                                whileHover={{ scale: 1.02 }}
                                {...register("privacy")}
                                className="w-full p-3 border rounded-lg outline-none focus:border-purple-500"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </motion.select>

                            <motion.select
                                whileHover={{ scale: 1.02 }}
                                {...register("accessLevel")}
                                disabled={!isPremium}
                                className="w-full p-3 border rounded-lg outline-none focus:border-purple-500 cursor-pointer"
                            >
                                <option value="free">Free</option>
                                <option value="premium">Premium</option>
                            </motion.select>

                            {!isPremium && (
                                <p className="text-red-500 text-sm">Upgrade to Premium to create premium lessons</p>
                            )}

                            <div className='flex gap-5'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 text-lg font-semibold rounded-lg 
                               bg-gradient-to-r from-purple-600 to-blue-600 text-white 
                               shadow-md hover:shadow-xl transition"
                                >
                                    Update Lesson ✍️
                                </motion.button>
                                <motion.button
                                    onClick={HandleClose}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 text-lg font-semibold rounded-lg 
                               bg-gradient-to-r from-purple-600 to-blue-600 text-white 
                               shadow-md hover:shadow-xl transition"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyLesson;