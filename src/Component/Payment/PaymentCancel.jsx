import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500/10 to-orange-400/10 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center border border-red-200"
      >
        {/* Cancel Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 140 }}
          className="flex justify-center mb-6"
        >
          <XCircle className="w-20 h-20 text-red-500" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Payment Canceled
        </h1>

        <p className="text-gray-600 leading-relaxed mb-6">
          Your payment was not completed. If this was a mistake, you can try the
          checkout process again anytime.
        </p>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-5 shadow-lg mb-8"
        >
          <h2 className="text-xl font-semibold mb-2">Upgrade Not Completed</h2>
          <p className="text-sm opacity-90">
            You still have access to the free version of Life Lessons.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col gap-3"
        >
          <Link
            to="/upgrade"
            className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg transition-all"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="w-full py-3 rounded-xl border border-gray-300 hover:bg-gray-100 font-semibold transition-all"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}