import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DynamicLoading from "../../Component/Loading/Loading";
import Swal from "sweetalert2";

const ManageLessons = () => {
    const axiosSecure = useAxiosSecure();
    const [filters, setFilters] = useState({});

    //  Lessons
    const { data: lessons = [], refetch, isLoading } = useQuery({
        queryKey: ["adminLessons", filters],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/dashboard/admin/manage-lessons",
                { params: filters }
            );
            return res.data;
        },
    });

    //  Stats
    const { data: stats = {} } = useQuery({
        queryKey: ["lessonStats"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/dashboard/admin/lesson-stats"
            );
            return res.data;
        },
    });

    //  Delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be delete this lesson!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {

            if (result.isConfirmed) {
                axiosSecure.delete(`/dashboard/admin/lesson/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your lesson has been deleted.",
                                icon: "success"
                            });
                        }
                    })


            }
        });

    };

    //  Feature
    const handleFeature = async (id) => {
        await axiosSecure.patch(
            `/dashboard/admin/lesson/feature/${id}`
        ).then(
            Swal.fire({
                title: "Updated!",
                text: "Your lesson has been Update.",
                icon: "success"
            })
        )
        refetch();
    };

    //  Review
    const handleReview = async (id) => {
        await axiosSecure.patch(
            `/dashboard/admin/lesson/review/${id}`
        ).then(
            Swal.fire({
                title: "Updated!",
                text: "Your lesson has been update.",
                icon: "success"
            })
        )
        refetch();
    };

    if (isLoading) {
        return <DynamicLoading></DynamicLoading>
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">
                Manage Lessons
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded">
                    Public: {stats.publicCount}
                </div>
                <div className="bg-gray-100 p-4 rounded">
                    Private: {stats.privateCount}
                </div>
                <div className="bg-red-100 p-4 rounded">
                    Flagged: {stats.flaggedCount}
                </div>
            </div>

            {/*  Filters */}
            <div className="flex gap-4 mb-4">
                <select
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            privacy: e.target.value
                        })
                    }
                    className="border p-2 rounded"
                >
                    <option value="">All Visibility</option>
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <select
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            category: e.target.value
                        })
                    }
                    className="border p-2 rounded"
                >
                    <option value="">All Category</option>
                    <option value="personal-growth">Personal Growth</option>
                    <option value="career">Career</option>
                    <option value="relationships">Relationships</option>
                    <option value="mindset">Mindset</option>
                    <option value="mistake-learned">Mistakes Learned</option>
                </select>

                <select
                    onChange={(e) =>
                        setFilters({ ...filters, flagged: e.target.value })
                    }
                    className="border p-2 rounded"
                >
                    <option value="">All</option>
                    <option value="true">Flagged</option>
                </select>
            </div>

            {/*  Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Visibility</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lessons.map((lesson) => (
                            <tr key={lesson._id}>
                                <td>{lesson.title}</td>
                                <td>{lesson.authorName}</td>
                                <td>{lesson.category}</td>
                                <td>
                                    <span
                                        className={`badge ${lesson.privacy === "public"
                                            ? "badge-success"
                                            : "badge-ghost"
                                            }`}
                                    >
                                        {lesson.privacy}
                                    </span>
                                </td>
                                <td className="space-x-1">
                                    {lesson.isFeatured && (
                                        <span className="badge badge-warning">
                                            Featured
                                        </span>
                                    )}
                                    {lesson.isReviewed && (
                                        <span className="badge badge-info">
                                            Reviewed
                                        </span>
                                    )}
                                    {lesson.reportsCount > 0 && (
                                        <span className="badge badge-error">
                                            Flagged
                                        </span>
                                    )}
                                </td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => handleFeature(lesson._id)}
                                        className="btn btn-xs btn-warning"
                                    >
                                        Feature
                                    </button>
                                    <button
                                        onClick={() => handleReview(lesson._id)}
                                        className="btn btn-xs btn-info"
                                    >
                                        Review
                                    </button>
                                    <button
                                        onClick={() => handleDelete(lesson._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {lessons.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        No lessons found
                    </p>
                )}
            </div>
        </div>
    );
};

export default ManageLessons;
