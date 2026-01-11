import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/admin/top-contributors");
      return res.data;
    },
  });

  return (
    <div
      className="relative overflow-hidden rounded-3xl bg-white p-6
                 shadow-md hover:shadow-2xl transition"
    >
      {/* Glow background */}
      <div className="absolute -top-20 -right-20 w-40 h-40 
                      bg-purple-400/20 rounded-full blur-3xl" />

      {/* Header */}
      <h3 className="relative z-10 text-xl font-bold mb-6 flex items-center gap-2">
        <Sparkles className="text-purple-600" />
        Top Contributors
      </h3>

      {/* List */}
      <ul className="relative z-10 space-y-4">
        {users.map((user, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.12 }}
            whileHover={{ scale: 1.03 }}
            className="flex items-center justify-between
                       rounded-2xl p-4
                       bg-gradient-to-r from-gray-50 to-white
                       border hover:shadow-lg transition"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center
                font-bold text-sm
                ${
                  index === 0
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                    : index === 1
                    ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                    : index === 2
                    ? "bg-gradient-to-br from-orange-300 to-orange-500 text-white"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {index === 0 ? <Crown size={18} /> : index + 1}
              </div>

              {/* Name */}
              <div>
                <p className="font-semibold text-gray-800 truncate max-w-[140px]">
                  {user._id}
                </p>
                <p className="text-xs text-gray-500">
                  Active Contributor
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="text-xl font-extrabold 
                            bg-gradient-to-r from-purple-600 to-indigo-500
                            bg-clip-text text-transparent">
                {user.totalLessons}
              </p>
              <p className="text-xs text-gray-500">Lessons</p>
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Empty */}
      {users.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No contributors found
        </p>
      )}
    </div>
  );
};

export default TopContributors;
