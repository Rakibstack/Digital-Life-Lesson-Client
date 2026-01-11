import { motion } from "framer-motion";

const AdminStatCard = ({ title, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.04 }}
      className="relative overflow-hidden rounded-3xl
                 bg-white p-6
                 shadow-md hover:shadow-2xl
                 transition-all"
    >
      {/* Glow blob */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32
                   bg-purple-400/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10">
        <p className="text-sm font-semibold text-gray-500 tracking-wide">
          {title}
        </p>

        <h3 className="mt-3 text-4xl font-extrabold
                       bg-gradient-to-r from-purple-600 to-indigo-500
                       bg-clip-text text-transparent">
          {value || 0}
        </h3>
      </div>

      {/* Animated bottom accent */}
      <motion.span
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="absolute bottom-0 left-0 h-[3px]
                   bg-gradient-to-r from-purple-600 to-indigo-500"
      />
    </motion.div>
  );
};

export default AdminStatCard;
