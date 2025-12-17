import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

import useAxiosSecure from "../Hooks/useAxiosSecure";

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");

  const {
    data: favorites = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["favorites", category, tone],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-favorites?category=${category}&tone=${tone}`
      );
      return res.data;
    },
  });

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be removed from favorites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/my-favorites/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire("Removed!", "Favorite lesson removed.", "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gray-50">
      <title>My Favorite Lessons</title>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
      >
        <h2 className="text-3xl font-bold"> My Favorite Lessons</h2>
        <p className="text-pink-100">
          All the lessons you saved for later
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl shadow"
      >
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered"
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
          className="select select-bordered"
        >
          <option value="">All Tones</option>
          <option value="motivational">Motivational</option>
          <option value="sad">Sad</option>
          <option value="realization">Realization</option>
          <option value="gratitude">Gratitude</option>
        </select>
      </motion.div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl bg-white shadow-xl border">
        <table className="table w-full">
          <thead className="bg-gradient-to-r from-pink-50 to-rose-50">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {favorites.map((fav, index) => (
              <motion.tr
                key={fav._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="hover:bg-pink-50/40"
              >
                <td className="font-medium">{fav.title}</td>

                <td>
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
                    {fav.category}
                  </span>
                </td>

                <td>
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-600">
                    {fav.tone}
                  </span>
                </td>

                <td className="flex gap-2">
                  <Link
                    to={`/lessons/${fav.lessonId}`}
                    className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:scale-110 transition"
                    title="View"
                  >
                    <Eye size={16} />
                  </Link>

                  <button
                    onClick={() => handleRemove(fav._id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:scale-110 transition"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {!isLoading && favorites.length === 0 && (
          <p className="text-center py-16 text-gray-400">
            ⭐ You haven't saved any lessons yet
          </p>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
