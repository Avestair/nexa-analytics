import axios from "axios";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

const fetchAnalytics = async () => {
  try {
    const res = await axios.get(`${process.env.API_URL}/analytics`);
    // console.log(res.data.data);

    return res.data.data;
  } catch (error) {
    console.error("API Error:", error);
    return []; // fallback on error
  }
};

export default async function Dashboard() {
  const analyticsData = await fetchAnalytics();

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <AnalyticsDashboard data={analyticsData} />
    </main>
  );
}
