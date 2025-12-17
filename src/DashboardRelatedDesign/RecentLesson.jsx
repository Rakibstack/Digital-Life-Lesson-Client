import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const RecentLessons = () => {
  const axiosSecure = useAxiosSecure();

  const { data: lessons = [] } = useQuery({
    queryKey: ["recentLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/recent-lessons");
      return res.data;
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6"
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
           Recently Added Lessons
        </h3>
        <span className="text-sm text-gray-500">
          {lessons.length} items
        </span>
      </div>

      {/* Lesson List */}
      <ul className="space-y-4">
        {lessons.map((lesson, index) => (
          <motion.li
            key={lesson._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.02 }}
            className="flex justify-between items-center bg-white/80 backdrop-blur border border-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div>
              <p className="font-semibold text-gray-800">
                {lesson.title}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(lesson.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Privacy Badge */}
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full
                ${
                  lesson.privacy === "public"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
            >
              {lesson.privacy}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Empty State */}
      {lessons.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          No recent lessons found 
        </p>
      )}
    </motion.div>
  );
};

export default RecentLessons;
