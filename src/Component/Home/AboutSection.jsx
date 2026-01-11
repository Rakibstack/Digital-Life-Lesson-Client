import React from "react";
import { motion } from "framer-motion";
import { Star, Edit3, Award } from "lucide-react";
import image from '../../assets/about1.jpg'

// Example placeholder image URL (replace with your own)
// const aboutIllustration = "https://i.ibb.co/7N9xJqH/about-placeholder.png";

const AboutSection = () => {
  const features = [
    {
      title: "Inspiring Lessons",
      description: "Curated life lessons to help you grow personally and professionally.",
      icon: <Star className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "User Contributions",
      description: "Add your own lessons and share wisdom with the community.",
      icon: <Edit3 className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "Premium Experience",
      description: "Access exclusive content to accelerate your learning journey.",
      icon: <Award className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-10">
      {/* Left: Text Content */}
      <motion.div
        className="lg:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-snug">
          About <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">Digital Life Lesson</span>
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl">
          Digital Life Lesson is your companion for personal growth and learning. Our mission is to provide carefully curated life lessons, practical advice, and inspiring content to help you live a more meaningful and successful life.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-4 bg-white/10 p-4 rounded-xl shadow-md hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="text-3xl">{feature.icon}</div>
              <div>
                <h4 className="font-semibold text-black/50">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right: Illustration */}
      <motion.div
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        <img
          src={image}
          alt="About Digital Life Lesson"
          className="w-full rounded-xl shadow-lg"
        />
      </motion.div>
    </section>
  );
};

export default AboutSection;
