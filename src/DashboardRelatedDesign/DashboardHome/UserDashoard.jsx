import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BookOpen, Star, Globe, Plus } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import RecentLessons from "../RecentLesson";
import useUser from "../../Hooks/useUser";
import AnalyticsChart from "../AnalyticsChart";

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const {name} = useUser()

  const { data: stats = {} } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/stats");
      return res.data;
    },
  });

  return (
    <div className="p-6 space-y-10">

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
      >
        <h2 className="text-3xl font-bold">
           Welcome back, {name}
        </h2>
        <p className="text-indigo-100 mt-1">
          Here’s your learning dashboard overview
        </p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Lessons",
            value: stats.totalLessons,
            icon: BookOpen,
            color: "from-blue-500 to-indigo-500",
          },
          {
            label: "Saved Lessons",
            value: stats.savedLessons,
            icon: Star,
            color: "from-yellow-400 to-orange-500",
          },
          {
            label: "Public Lessons",
            value: stats.publicLessons,
            icon: Globe,
            color: "from-green-400 to-emerald-500",
          },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            custom={i}
            variants={statVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden  rounded-2xl shadow-lg bg-white p-6"
          >
            <div
              className={`absolute inset-0 opacity-10 bg-gradient-to-br ${item.color}`}
            />
            <item.icon className="w-8 h-8 text-gray-700 mb-3" />
            <p className="text-gray-500">{item.label}</p>
            <h3 className="text-4xl font-bold text-gray-800 mt-1">
              {item.value ?? 0}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-2xl font-bold mb-5 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          ⚡ Quick Actions
        </h3>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/dashboard/addlesson"
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-medium
            bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition"
          >
            <Plus size={18} /> Add Lesson
          </Link>

          <Link
            to="/dashboard/mylesson"
            className="px-5 py-3 rounded-xl bg-white shadow hover:shadow-md transition font-medium"
          >
            📘 My Lessons
          </Link>

          <Link
            to="/dashboard/favoriteLesson"
            className="px-5 py-3 rounded-xl bg-white shadow hover:shadow-md transition font-medium"
          >
            ⭐ Saved Lessons
          </Link>
        </div>
      </motion.div>

      {/* Recent Lessons */}
      <RecentLessons />
      <AnalyticsChart></AnalyticsChart>

    </div>
  );
};

export default DashboardHome;
