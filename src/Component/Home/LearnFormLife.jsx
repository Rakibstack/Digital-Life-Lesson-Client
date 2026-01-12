import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Lightbulb, Target, Brain, TrendingUp } from "lucide-react";

const WhyLearningMatters = () => {
    const titleRef = useRef(null);
    const descRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        );
        gsap.fromTo(
            descRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
        );
    }, []);

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
            desc: "Failures don't stop us — they guide us to improve and push forward with strength.",
        }
    ];

    const cardVariants = {
        hidden: { opacity: 0, rotateY: -90, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            rotateY: 0,
            scale: 1,
            transition: {
                delay: i * 0.15,
                duration: 0.7,
                ease: "easeOut",
            },
        }),
        hover: {
            y: -15,
            scale: 1.05,
            boxShadow: "0 25px 50px rgba(99, 46, 227, 0.2)",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="max-w-6xl mx-auto my-20 px-4">
            <h2 ref={titleRef} className="text-4xl font-extrabold text-center mb-4">
                Why Learning <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">From Life Matters</span>
            </h2>
            <p ref={descRef} className="text-center text-base-content/70 max-w-2xl mx-auto mb-12">
                Every experience teaches us something. Life itself is the greatest teacher — 
                guiding us with lessons that shape our mindset, behavior, and future success.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((item, index) => (
                    <motion.div
                        key={item.id}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                        className="bg-base-100 p-6 rounded-xl shadow-md border border-base-300 cursor-pointer group"
                    >
                        <motion.div 
                            className="text-[#632EE3] mb-4"
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                        >
                            {item.icon}
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#632EE3] transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-base-content/70">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default WhyLearningMatters;
