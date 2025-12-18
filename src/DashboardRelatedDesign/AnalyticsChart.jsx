import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AnalyticsChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: chartData = [] } = useQuery({
    queryKey: ["weeklyAnalytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/analytics/weekly");
      return res.data;
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Weekly Contributions
          </h3>
          <p className="text-sm text-gray-500">
            Your lesson activity over the last 7 days
          </p>
        </div>

        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
          Analytics
        </span>
      </div>

      {/* Chart */}
      <div className="w-full h-72">
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              stroke="#888"
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              stroke="#888"
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#7C3AED"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;
