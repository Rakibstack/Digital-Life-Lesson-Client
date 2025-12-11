import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function PaymentSuccess() {

  const [searchParam] = useSearchParams()
  const sessionId = searchParam.get('session_id')
  const axiosSecure = useAxiosSecure()

  useEffect(() => {

    if(sessionId){
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)      
    }
  },[sessionId,axiosSecure])
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600/10 to-blue-500/10 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center border border-purple-200"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 140 }}
          className="flex justify-center mb-6"
        >
          <CheckCircle className="w-20 h-20 text-green-500" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Payment Successful
        </h1>

        <p className="text-gray-600 leading-relaxed mb-6">
          Thank you! Your premium upgrade is now active. You now have lifetime
          access to all premium features.
        </p>

        {/* Animated card highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl p-5 shadow-lg mb-8"
        >
          <h2 className="text-xl font-semibold mb-2">Welcome to Premium ⭐</h2>
          <p className="text-sm opacity-90">
            You can now explore all exclusive lessons without any limits.
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
            to="/dashboard"
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg transition-all"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/public"
            className="w-full py-3 rounded-xl border border-gray-300 hover:bg-gray-100 font-semibold transition-all"
          >
            Explore Lessons
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}