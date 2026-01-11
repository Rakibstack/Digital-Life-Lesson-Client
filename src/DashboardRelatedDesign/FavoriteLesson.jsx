import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

import useAxiosSecure from "../Hooks/useAxiosSecure";
import DynamicLoading from "../Component/Loading/Loading";

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");

  const { data: favorites = [], refetch, isLoading } = useQuery({
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

  if (isLoading) return <DynamicLoading />;

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gray-50">
      <title>My Favorite Lessons</title>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-2xl"
      >
        <h2 className="text-3xl font-bold">My Favorite Lessons</h2>
        <p className="text-pink-100 mt-1">
          All the lessons you saved for later
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl shadow-md"
      >
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
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
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
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
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {favorites.map((fav, index) => (
              <motion.tr
                key={fav._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01, backgroundColor: "rgba(255,192,203,0.2)" }}
                className="hover:shadow-md rounded-xl transition-all"
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

                <td className="flex gap-2 justify-center">
                  <Link
                    to={`/lessons/${fav.lessonId}`}
                    className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:scale-110 transition-transform"
                    title="View"
                  >
                    <Eye size={16} />
                  </Link>

                  <button
                    onClick={() => handleRemove(fav._id)}
                    className="p-2 rounded-lg bg-red-100 text-red-600 hover:scale-110 transition-transform"
                    title="Remove"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {favorites.length === 0 && (
          <div className="text-center py-16 text-gray-400 flex flex-col items-center gap-3">
            <span className="text-6xl animate-bounce">⭐</span>
            <p>You haven't saved any lessons yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
