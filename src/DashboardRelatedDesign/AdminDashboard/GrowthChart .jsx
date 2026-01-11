import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const GrowthChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["lessonGrowth"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/admin/lesson-growth");
      return res.data;
    },
  });

  const totalLessons = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl p-6
                 bg-gradient-to-br from-white via-purple-50 to-indigo-50
                 shadow-lg hover:shadow-2xl transition"
    >
      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-60 h-60
                      bg-purple-400/20 rounded-full blur-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Lesson Growth
          </h3>
          <p className="text-sm text-gray-500">
            Monthly lesson publishing trend
          </p>
        </div>

        {/* KPI */}
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Total Lessons
          </p>
          <p className="text-2xl font-extrabold
                        bg-gradient-to-r from-[#632EE3] to-[#9F62F2]
                        bg-clip-text text-transparent">
            {totalLessons}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              strokeOpacity={0.2}
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: "14px",
                border: "none",
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                fontSize: "13px",
              }}
              labelStyle={{ fontWeight: "600", color: "#111827" }}
            />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#7C3AED"
              strokeWidth={3}
              fill="url(#growthFill)"
              activeDot={{
                r: 6,
                fill: "#7C3AED",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GrowthChart;
