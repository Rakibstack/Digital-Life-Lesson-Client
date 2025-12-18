

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AdminStatCard from "./AdminStatCard ";
import GrowthChart from "./GrowthChart ";
import TopContributors from "./TopContributors ";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {},  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/admin/stats");
      return res.data;
    },
  });

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          Admin Dashboard 
        </h2>
        <p className="text-gray-500 mt-1">
          Overview of platform activity & growth
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminStatCard
          title=" Total Users"
          value={stats.totalUsers}
        />
        <AdminStatCard
          title=" Public Lessons"
          value={stats.totalPublicLessons}
        />
        <AdminStatCard
          title=" Reported Lessons"
          value={stats.totalReportedLessons}
        />
        <AdminStatCard
          title=" Today's Lessons"
          value={stats.todayLessons}
        />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart */}
        <div className="lg:col-span-2">
          <GrowthChart />
        </div>

        {/* Top Contributors */}
        <div>
          <TopContributors />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
