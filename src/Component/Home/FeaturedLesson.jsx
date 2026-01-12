import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useQuery } from "@tanstack/react-query";
import DynamicLoading from "../Loading/Loading";
import useAxios from "../../Hooks/useAxios";

const FeaturedLessons = () => {
  const axiosInstance = useAxios();
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ["featured-life-lessons"],
    queryFn: async () => {
      const res = await axiosInstance.get("/featured-lessons");
      return res.data;
    },
  });

  useEffect(() => {
    if (titleRef.current && descRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
      );
    }
  }, [isLoading]);

  if (isLoading) return <DynamicLoading />;

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="max-w-6xl mx-auto my-20 px-4">
      {/* Section Title */}
      <h2 ref={titleRef} className="text-4xl sm:text-5xl font-extrabold text-center mb-4">
        Featured{" "}
        <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">
          Life Lessons
        </span>
      </h2>
      <p ref={descRef} className="text-center text-base-content/70 max-w-2xl mx-auto mb-12">
        Hand-picked lessons designed to inspire growth and meaningful change
      </p>

      {/* Lesson Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson._id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="group bg-base-100 rounded-2xl shadow-md border border-base-300 overflow-hidden"
          >
            {/* Image */}
            {lesson.image && (
              <div className="relative w-full h-40 sm:h-48 lg:h-44 overflow-hidden rounded-t-2xl">
                <motion.img
                  src={lesson.image}
                  alt={lesson.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
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
              <p className="text-base-content/70 text-sm line-clamp-3 flex-grow leading-relaxed">
                {lesson.description}
              </p>

              {/* CTA Button */}
              <Link to={`/lessons/${lesson._id}`} className="mt-5">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(99, 46, 227, 0.3)" }}
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
        <p className="text-center text-base-content/60 mt-16 text-lg">
          No featured lessons available
        </p>
      )}
    </section>
  );
};

export default FeaturedLessons;
