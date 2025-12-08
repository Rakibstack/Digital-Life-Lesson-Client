
import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Target, Brain, TrendingUp } from "lucide-react"; // optional icons

const WhyLearningMatters = () => {

    const benefits = [
        {
            id: 1,
            icon: <Lightbulb size={40} />,
            title: "Real Experience Brings Wisdom",
            desc: "Life lessons shape us more deeply than textbooks — they teach us through real situations.",
        },
        {
            id: 2,
            icon: <Brain size={40} />,
            title: "Improves Decision Making",
            desc: "Understanding consequences helps us choose better paths in future challenges.",
        },
        {
            id: 3,
            icon: <Target size={40} />,
            title: "Helps Build Strong Character",
            desc: "Patience, discipline, and confidence grow when we learn from everyday experiences.",
        },
        {
            id: 4,
            icon: <TrendingUp size={40} />,
            title: "Continuous Personal Growth",
            desc: "Failures don’t stop us — they guide us to improve and push forward with strength.",
        }
    ];

    return (
        <div className="max-w-6xl mx-auto my-20 px-4">
            <h2 className="text-4xl font-extrabold text-center mb-4">
                Why Learning <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">From Life Matters</span>
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Every experience teaches us something. Life itself is the greatest teacher — 
                guiding us with lessons that shape our mindset, behavior, and future success.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group cursor-pointer border"
                    >
                        <div className="text-[#632EE3] mb-4 group-hover:scale-110 transition-transform duration-500">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WhyLearningMatters;
