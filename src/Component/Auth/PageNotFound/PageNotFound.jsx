import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-200 overflow-hidden p-4">

      {/* Background floating neon circles */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[180px] bg-pink-400 opacity-40"
        style={{ x: mousePos.x * 0.02, y: mousePos.y * 0.02 }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full blur-[150px] bg-purple-500 opacity-30"
        style={{ x: -mousePos.x * 0.02, y: -mousePos.y * 0.02 }}
      />

      {/* 404 Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_0_80px_-10px_rgba(125,95,255,0.5)] p-10 flex flex-col items-center text-center max-w-md"
      >
        {/* Floating 404 number */}
        <motion.h1
          initial={{ scale: 1, rotate: -10 }}
          animate={{ scale: [1, 1.05, 1], rotate: 10 }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-[8rem] font-extrabold text-purple-600 mb-4"
        >
          404
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-700 mb-6 text-lg"
        >
          Ooops! Looks like you’re lost in space.
        </motion.p>

        {/* Rocket illustration (interactive) */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
          alt="Lost Rocket"
          className="w-40 mb-6"
          style={{
            x: mousePos.x * 0.03 - 10,
            y: Math.sin(mousePos.x * 0.01) * 20,
          }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />

        {/* Back Home Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-lg shadow hover:shadow-lg transition-all duration-300"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
