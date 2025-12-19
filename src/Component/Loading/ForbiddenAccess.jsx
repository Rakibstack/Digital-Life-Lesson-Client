import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForbiddenAccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center mb-4"
        >
          <div className="bg-red-100 p-4 rounded-full">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">403 – Forbidden Access</h1>
        <p className="text-gray-600 mb-6">
          Sorry, you dont have permission to access this page.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="px-5 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition"
          >
            Go Home
          </Link>
          <Link
            to="/auth/login"
            className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
