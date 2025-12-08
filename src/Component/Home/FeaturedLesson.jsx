
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedLessons = () => {

    // Static Data (Replace later with fetched API results)
    const lessons = [
        {
            id: 1,
            title: "Power of Discipline",
            image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
            description: "Success is built through consistent habits, discipline & patience.",
        },
        {
            id: 2,
            title: "Time is Most Valuable",
            image: "https://images.unsplash.com/photo-1485921198582-23fdd3bfb7c6",
            description: "Spend your time wisely, invest in self-growth every day.",
        },
        {
            id: 3,
            title: "Failure is a Part of Growth",
            image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed",
            description: "Every failure teaches something new — learn & move forward.",
        },
        {
            id: 4,
            title: "Stay Focused, Stay Hungry",
            image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572",
            description: "Every great achiever once started with small efforts.",
        }
    ];

    return (
        <div className="max-w-6xl mx-auto my-16 px-4">
            <h2 className="text-4xl font-extrabold text-center mb-8">
                Featured <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">Life Lessons</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {lessons.map((lesson) => (
                    <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white shadow-lg rounded-lg overflow-hidden group hover:-translate-y-2 transition duration-300"
                    >
                        <img src={lesson.image} alt={lesson.title} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300" />

                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                            <p className="text-gray-600 text-sm">{lesson.description}</p>

                            <Link to={`/lessons/${lesson.id}`}>
                                <button className="mt-3 w-full py-2 rounded-xl font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white hover:opacity-90 transition">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedLessons;
