import { motion } from "framer-motion";

const orbits = [
  { size: 28, duration: 2.8, color: "#00f7ff", direction: 1 },
  { size: 22, duration: 3.5, color: "#ff00e6", direction: -1 },
  { size: 16, duration: 4.2, color: "#8b00ff", direction: 1 },
];

const dots = [
  { delay: 0 },
  { delay: 0.4 },
  { delay: 0.8 },
  { delay: 1.2 },
];

const stars = Array.from({ length: 25 }, (_, i) => ({
  top: Math.random() * 100 + "%",
  left: Math.random() * 100 + "%",
  size: Math.random() * 2 + 1,
  opacity: Math.random() * 0.7 + 0.3,
}));

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black relative overflow-hidden">
      
      {/* Galaxy background haze */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,247,255,0.05) 0%, rgba(138,43,255,0.08) 40%, rgba(0,0,0,0.9) 100%)",
          filter: "blur(60px)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      />

      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            filter: "drop-shadow(0 0 2px #fff)",
          }}
          animate={{ opacity: [star.opacity, 0.9, star.opacity] }}
          transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative w-32 h-32">
        {/* Core glowing orb */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 m-8 rounded-full bg-gradient-to-br from-[#6a00ff] to-[#00f7ff] shadow-[0_0_40px_#00f7ff] blur-md"
        />

        {/* Orbits */}
        {orbits.map((orbit, i) => (
          <motion.div
            key={i}
            animate={{ rotate: orbit.direction * 360 }}
            transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 m-auto border-[3px] rounded-full"
            style={{
              width: `${orbit.size}rem`,
              height: `${orbit.size}rem`,
              borderTop: `2px solid ${orbit.color}`,
              borderRight: "2px solid transparent",
              borderBottom: "2px solid transparent",
              borderLeft: "2px solid transparent",
              filter: `drop-shadow(0 0 25px ${orbit.color})`,
            }}
          />
        ))}

        {/* Orbiting neon dots */}
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.5, opacity: 0.4 }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: dot.delay }}
            className="absolute w-3 h-3 bg-[#00f7ff] rounded-full blur-sm top-0 left-1/2 -translate-x-1/2"
          />
        ))}

        {/* Outer halo floating */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-[2px] border-[#00e6ff33] blur-lg"
        />
      </div>
    </div>
  );
};

export default Loading;
