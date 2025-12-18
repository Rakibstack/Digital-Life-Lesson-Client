import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const GrowthChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["lessonGrowth"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/dashboard/admin/lesson-growth"
      );
      return res.data;
    },
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
      <h3 className="text-xl font-semibold mb-5">
        📈 Lesson Growth Overview
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#7C3AED"
              strokeWidth={3}
              fill="url(#growthGradient)"
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrowthChart;
