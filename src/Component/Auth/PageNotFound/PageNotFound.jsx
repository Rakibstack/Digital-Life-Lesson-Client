import { motion } from "framer-motion";
import { ArrowLeft, Ghost } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 overflow-hidden relative">
      {/* floating background blobs */}
      <motion.div
        className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl top-10 -left-10"
        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-pink-500/20 rounded-full blur-3xl bottom-10 -right-10"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-10 max-w-md w-full text-center"
      >
        {/* icon bounce */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <div className="bg-slate-100 p-5 rounded-full shadow-inner">
            <Ghost className="w-14 h-14 text-slate-700" />
          </div>
        </motion.div>

        {/* glitchy 404 */}
        <motion.h1
          className="text-6xl font-extrabold text-slate-900 mb-2 tracking-widest"
          animate={{ textShadow: [
            "0px 0px 0px rgba(0,0,0,0)",
            "2px 2px 0px rgba(236,72,153,0.6)",
            "-2px -2px 0px rgba(168,85,247,0.6)",
            "0px 0px 0px rgba(0,0,0,0)"
          ] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          404
        </motion.h1>

        <h2 className="text-xl font-semibold text-slate-700 mb-2">
          You seem lost
        </h2>
        <p className="text-slate-600 mb-8">
          The page you’re looking for vanished into the void.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Take me home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
