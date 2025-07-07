"use client";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import ChartCard from "./ChartCard";

// Register all required components
ChartJS.register(
  ArcElement, // Required for Pie chart
  BarElement, // Required for Bar chart
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

type pageViews = {
  url: string;
  timeSpent: number;
  timeStamp: string;
};

type ChartSectionTypes = {
  deviceTypes: Record<string, number>;
  pageViews: pageViews[];
};

export default function ChartSection({
  deviceTypes,
  pageViews,
}: ChartSectionTypes) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <ChartCard title="Device Types">
        <Pie
          data={{
            labels: Object.keys(deviceTypes),
            datasets: [
              {
                data: Object.values(deviceTypes),
                backgroundColor: ["#6366f1", "#f59e0b", "#10b981", "#ef4444"],
              },
            ],
          }}
        />
      </ChartCard>

      <ChartCard title="Recent Page Views">
        <Bar
          data={{
            labels: pageViews.slice(0, 10).map((view) => view.url),
            datasets: [
              {
                label: "Time Spent (seconds)",
                data: pageViews.slice(0, 10).map((view) => view.timeSpent),
                backgroundColor: "#6366f1",
              },
            ],
          }}
        />
      </ChartCard>
    </div>
  );
}
