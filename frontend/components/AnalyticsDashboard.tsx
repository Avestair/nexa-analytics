import { Chart, registerables } from "chart.js";
import ChartSection from "./ChartSection";
import { trimString } from "@/utils/utils";
import StatCard from "./StatCard";
import { ThemeToggle } from "@/ui/ThemeToggle";

Chart.register(...registerables);

type AnalyticsData = {
  _id: string;
  userId: string;
  pageViews: {
    url: string;
    timeSpent: number;
    timeStamp: string;
  }[];
  userAgent: {
    device: {
      type: string;
    };
    browser: {
      name: string;
    };
    os: {
      name: string;
    };
  };
  location: {
    country: string;
    city: string;
  };
}[];

export default function AnalyticsDashboard({ data }: { data: AnalyticsData }) {
  // console.log("data in the analytics compoonent: ", data);

  // Process data for charts
  const deviceTypes = data.reduce((acc, item) => {
    const type = item.userAgent.device?.type || "unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pageViews = data.flatMap((item) => item.pageViews);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with theme toggle */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
        <ThemeToggle />
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {data.length > 0 ? (
          <>
            <StatCard
              title="Total Sessions"
              value={data.length}
              icon="👥"
              trend="up"
            />
            <StatCard
              title="Page Views"
              value={pageViews.length}
              icon="👀"
              trend="steady"
            />
            <StatCard
              title="Avg. Time"
              value={`${trimString({
                string: String(
                  Math.round(
                    pageViews.reduce(
                      (sum, view) => sum + (view.timeSpent || 0),
                      0
                    ) / (pageViews.length || 1)
                  ) / 60
                ),
                maxLength: 4,
                addDots: false,
              })}m`}
              icon="⏱️"
              trend="down"
            />
            <StatCard
              title="Countries"
              value={new Set(data.map((item) => item.location?.country)).size}
              icon="🌎"
              trend="up"
            />
          </>
        ) : (
          <div className="col-span-4 py-12 text-center text-secondary">
            No analytics data available
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        <ChartSection pageViews={pageViews} deviceTypes={deviceTypes} />

        {/* Sessions Table */}
        <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-primary">
              Recent Sessions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
              {/* ... existing table code ... */}
            </table>
          </div>
          {data.length > 5 && (
            <div className="px-6 py-4 text-right border-t border-border">
              <button className="text-accent hover:underline">
                View All Sessions →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
