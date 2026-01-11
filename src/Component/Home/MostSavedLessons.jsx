import React from "react";
import { Bookmark } from "lucide-react";
import useAxios from "../../Hooks/useAxios";
import DynamicLoading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const MostSavedLessons = () => {
  const axiosInstance = useAxios();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["mostSavedLessons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/most-saved-lessons");
      return res.data;
    },
  });

  if (isLoading) return <DynamicLoading />;

  return (
    <section className="my-16 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">
        Most Saved Lessons
      </h2>
      <p className="text-center text-gray-600 mb-10">
        These lessons inspired thousands — most saved by users
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {lessons.map((lesson, idx) => (
          <motion.div
            key={lesson._id || idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-44 overflow-hidden">
              <motion.img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col h-full">
              <h3 className="font-bold text-lg mb-1 group-hover:text-[#632EE3] transition-colors duration-300">
                {lesson.title}
              </h3>
              <p className="text-sm text-gray-600">By {lesson.author}</p>

              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-semibold text-gray-700">
                  {lesson.saves} Saves
                </span>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="text-blue-600 cursor-pointer"
                >
                  <Bookmark className="w-5 h-5" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {lessons.length === 0 && (
        <p className="text-center text-gray-500 mt-16 text-lg">
          No lessons available
        </p>
      )}
    </section>
  );
};

export default MostSavedLessons;
