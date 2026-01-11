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
      {/* Section Title */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">
        Featured{" "}
        <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
          Life Lessons
        </span>
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Hand-picked lessons designed to inspire growth and meaningful change
      </p>

      {/* Lesson Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300"
          >
            {/* Image */}
            {lesson.image && (
              <div className="relative w-full h-40 sm:h-48 lg:h-44 overflow-hidden rounded-t-2xl">
                <img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/20 transition-all duration-300" />
              </div>
            )}

            <div className="p-5 flex flex-col h-full">
              {/* Lesson Title */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 leading-snug group-hover:text-[#632EE3] transition-colors duration-300">
                {lesson.title}
              </h3>

              {/* Lesson Description */}
              <p className="text-gray-600 text-sm line-clamp-3 flex-grow leading-relaxed">
                {lesson.description}
              </p>

              {/* CTA Button */}
              <Link to={`/lessons/${lesson._id}`} className="mt-5">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="w-full py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] shadow-md hover:shadow-lg transition-all duration-300"
                >
                  View Details
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {lessons.length === 0 && (
        <p className="text-center text-gray-500 mt-16 text-lg">
          No featured lessons available
        </p>
      )}
    </section>
  );
};

export default FeaturedLessons;
