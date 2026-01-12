import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Star, Edit3, LayoutDashboard } from "lucide-react";

const PremiumServiceSection = () => {
  const services = [
    {
      title: "Public Lessons",
      description: "Access a library of curated life lessons available to all users.",
      icon: <BookOpen className="w-10 h-10 text-white" />,
    },
    {
      title: "Premium Lessons",
      description: "Unlock exclusive content to accelerate your personal growth.",
      icon: <Star className="w-10 h-10 text-white" />,
    },
    {
      title: "Add Your Own Lesson",
      description: "Contribute your knowledge and share lessons with the community.",
      icon: <Edit3 className="w-10 h-10 text-white" />,
    },
    {
      title: "Dashboard & Progress",
      description: "Track saved lessons, completed content, and your growth journey.",
      icon: <LayoutDashboard className="w-10 h-10 text-white" />,
    },
  ];

  return (
    <section className="relative max-w-6xl mx-auto px-4 py-24">
      {/* Decorative background glows */}
      <div className="absolute -z-10 top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-700 to-indigo-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute -z-10 bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-pink-500 to-purple-700 rounded-full opacity-10 blur-3xl"></div>

      <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-4">
        Our <span className="bg-gradient-to-r from-[#632EE3] to-[#9F62F2] bg-clip-text text-transparent">Services</span>
      </h2>
      <p className="text-center text-base-content/60 mb-16 max-w-2xl mx-auto">
        Explore the powerful features of Digital Life Lesson that help you grow and learn effectively.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            className="relative flex flex-col items-start p-6 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            {/* Floating icon circle */}
            <div className="bg-white/20 p-4 rounded-full mb-4 shadow-lg hover:shadow-2xl transition-all duration-300">
              {service.icon}
            </div>

            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-gray-200 text-sm">{service.description}</p>

            {/* Decorative gradient blur behind card */}
            {/* <div className="absolute -z-10 top-0 right-0 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -z-10 bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20 blur-3xl"></div> */}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PremiumServiceSection;
