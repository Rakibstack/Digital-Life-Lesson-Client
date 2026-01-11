import React from "react";
import { motion } from "framer-motion";

const glowVariants = {
  animate: {
    scale: [1, 1.3, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const DynamicLoading = () => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden
                    flex items-center justify-center
                    bg-gradient-to-br from-[#070B1A] via-[#0B1120] to-black">

      {/* BACKGROUND GLOW ORBS */}
      <motion.div
        variants={glowVariants}
        animate="animate"
        className="absolute w-[500px] h-[500px] bg-purple-600/20
                   rounded-full blur-[120px] -top-40 -left-40"
      />
      <motion.div
        variants={glowVariants}
        animate="animate"
        className="absolute w-[400px] h-[400px] bg-blue-500/20
                   rounded-full blur-[120px] bottom-0 right-0"
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center">

        {/* BRAND TEXT */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-extrabold mb-12
                     bg-gradient-to-r from-[#632EE3] via-[#9F62F2] to-[#632EE3]
                     bg-[length:200%_200%] bg-clip-text text-transparent
                     animate-gradient"
        >
          Digital Life Lesson
        </motion.h1>

        {/* ROTATING RING */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="relative w-28 h-28 rounded-full
                     border border-white/10 flex items-center justify-center"
        >
          {/* Gradient ring */}
          <div className="absolute inset-0 rounded-full
                          bg-gradient-to-r from-[#632EE3] to-[#9F62F2]
                          blur-sm opacity-80" />

          {/* Inner cut */}
          <div className="absolute inset-[6px] rounded-full bg-[#0B1120]" />

          {/* Orbiting dots */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1.5 + i * 0.4,
                ease: "linear",
              }}
              className="absolute w-full h-full"
            >
              <span
                className="absolute -top-1 left-1/2 -translate-x-1/2
                           w-2.5 h-2.5 rounded-full
                           bg-gradient-to-r from-[#632EE3] to-[#9F62F2]"
              />
            </motion.span>
          ))}
        </motion.div>

        {/* LOADING TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-10 text-xs tracking-[0.3em] text-gray-400 uppercase"
        >
          Loading Experience
        </motion.p>
      </div>
    </div>
  );
};

export default DynamicLoading;
