import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import DynamicLoading from "../Loading/Loading";
import useAxios from "../../Hooks/useAxios";

const FeaturedLessons = () => {
  const axiosInstance = useAxios();

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["featured-life-lessons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/featured-lessons");
      return res.data;
    },
  });

  if (isLoading) return <DynamicLoading />;

  return (
    <section className="max-w-6xl mx-auto my-20 px-4">
      <h2 className="text-4xl font-extrabold text-center mb-4">
        Featured{" "}
        <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
          Life Lessons
        </span>
      </h2>

      <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
        Hand-picked lessons designed to inspire growth and meaningful change
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border transition-all duration-300 hover:-translate-y-2"
          >
            {/* CONTENT */}
            <div className="p-5 flex flex-col h-full">
              <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-[#632EE3] transition">
                {lesson.title}
              </h3>

              {/* DESCRIPTION (SLICED) */}
              <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                {lesson.description}
              </p>

              <Link to={`/lessons/${lesson._id}`} className="mt-5">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white hover:opacity-90 transition"
                >
                  View Details
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {lessons.length === 0 && (
        <p className="text-center text-gray-500 mt-16">
          No featured lessons available
        </p>
      )}
    </section>
  );
};

export default FeaturedLessons;
