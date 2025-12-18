import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TopContributors = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [] } = useQuery({
    queryKey: ["topContributors"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/dashboard/admin/top-contributors"
      );
      return res.data;
    },
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
        🔥 Most Active Contributors
      </h3>

      <ul className="space-y-3">
        {users.map((user, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between 
                       p-3 rounded-xl border bg-gray-50 
                       hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50
                       transition"
          >
            <div className="flex items-center gap-3">
              {/* Rank badge */}
              <span
                className={`w-8 h-8 flex items-center justify-center 
                  rounded-full font-bold text-sm
                  ${
                    index === 0
                      ? "bg-yellow-400 text-white"
                      : index === 1
                      ? "bg-gray-400 text-white"
                      : index === 2
                      ? "bg-orange-400 text-white"
                      : "bg-purple-100 text-purple-700"
                  }`}
              >
                {index + 1}
              </span>

              <p className="font-medium text-gray-800">
                {user._id}
              </p>
            </div>

            <span className="font-bold text-lg text-purple-600">
              {user.totalLessons}
            </span>
          </motion.li>
        ))}
      </ul>

      {users.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No contributors found
        </p>
      )}
    </div>
  );
};

export default TopContributors;
