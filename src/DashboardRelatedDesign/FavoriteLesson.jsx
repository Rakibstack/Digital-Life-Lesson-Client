import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyFavorites = () => {
    const axiosSecure = useAxiosSecure();
    const [category, setCategory] = useState("");
    const [tone, setTone] = useState("");

    const { data: favorites = [],refetch } = useQuery({
        queryKey: ["favorites", category, tone],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/my-favorites?category=${category}&tone=${tone}`
            );
            return res.data;
        },
    });

    const handleRemove = async (id) => {
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
                axiosSecure.delete(`/my-favorites/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Favorite lesson has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    
    };

    return (

        <div className="p-6 bg-white min-h-screen">
                        <title>My Favorite-Lesson</title>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-4">
                My Favorite Lessons
            </h2>

            {/* Filters */}
            <div className="flex gap-4 mb-4">
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                >
                    <option value="">All Categories</option>
                    <option value="personal growth">Personal Growth</option>
                    <option value="career">Career</option>
                    <option value="relationships">Relationships</option>
                    <option value="mindset">Mindset</option>
                    <option value="mistake-learned">Mistakes Learned</option>
                </select>

                <select
                    onChange={(e) => setTone(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                >
                    <option value="">All Tones</option>
                    <option value="motivational">Motivational</option>
                    <option value="sad">Sad</option>
                    <option value="realization">Realization</option>
                    <option value="gratitude">Gratitude</option>
                </select>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3">Title</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Tone</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {favorites.map((fav) => (
                            <tr key={fav._id} className="border-t">
                                <td className="p-3">{fav.title}</td>
                                <td className="p-3">{fav.category}</td>
                                <td className="p-3">{fav.tone}</td>
                                <td className="p-3 flex gap-2">
                                    <Link
                                        to={`/lessons/${fav.lessonId}`}
                                        className="px-3 py-1 border rounded-md"
                                    >
                                        View
                                    </Link>
                                    <button
                                        onClick={() => handleRemove(fav._id)}
                                        className="px-3 py-1 border rounded-md text-red-500"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {favorites.length === 0 && (
                    <p className="text-center p-6 text-gray-500">
                        No favorite lessons yet
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyFavorites;
