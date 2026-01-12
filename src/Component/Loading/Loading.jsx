import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

// Generate particles outside component to avoid re-render issues
const generateParticles = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
  }));

const PARTICLES = generateParticles();

const DynamicLoading = () => {
  const particlesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Animate particles with GSAP
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: "random(-100, 100)",
          x: "random(-100, 100)",
          opacity: "random(0.2, 0.8)",
          scale: "random(0.5, 1.5)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1,
        });
      }
    });
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center
                 bg-gradient-to-br from-base-300 via-base-200 to-base-100
                 dark:from-[#070B1A] dark:via-[#0B1120] dark:to-black"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {PARTICLES.map((particle, i) => (
          <div
            key={particle.id}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-30"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[600px] h-[600px] bg-purple-600/20 dark:bg-purple-600/30
                   rounded-full blur-[150px] -top-40 -left-40"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-500/30
                   rounded-full blur-[150px] bottom-0 right-0"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Brand Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 1,
          }}
          className="mb-8"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative w-32 h-32"
          >
            {/* Outer Ring */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border-4 border-transparent
                         bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600
                         bg-clip-border"
              style={{
                backgroundSize: "200% 200%",
                animation: "gradient 3s ease infinite",
              }}
            />

            {/* Middle Ring */}
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-2 rounded-full border-2 border-purple-400/50"
            />

            {/* Inner Circle */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-white text-3xl font-bold"
              >
                DL
              </motion.div>
            </div>

            {/* Orbiting Dots */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.2,
                }}
                className="absolute inset-0"
              >
                <div
                  className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) translateY(-${64 + i * 8}px)`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Brand Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl md:text-4xl font-extrabold mb-4 text-center"
        >
          <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Digital Life Lesson
          </span>
        </motion.h1>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-base-300 dark:bg-gray-800 rounded-full overflow-hidden mb-6">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full"
          />
        </div>

        {/* Loading Text with Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="text-base-content/70 text-sm font-medium tracking-wider">
            Loading
          </span>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 rounded-full bg-purple-500"
            />
          ))}
        </motion.div>

        {/* Percentage Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-4"
        >
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-xs text-base-content/50 font-mono"
          >
            Preparing your experience...
          </motion.span>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-500/20 rounded-full"
      />
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-10 right-10 w-16 h-16 border-2 border-blue-500/20 rounded-full"
      />
    </motion.div>
  );
};

export default DynamicLoading;
