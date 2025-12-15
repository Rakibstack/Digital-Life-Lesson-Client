import React from "react";
import { motion } from "framer-motion";

const DynamicLoading = () => {
  const dots = [0, 1, 2];

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      
      {/* Loading Text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="text-white text-lg font-semibold tracking-wide mb-6"
      >
        Loading
      </motion.h1>

      {/* Dynamic bouncing dots */}
      <div className="flex space-x-3">
        {dots.map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            className="w-4 h-4 bg-purple-500 rounded-full shadow-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicLoading;
