export default function StatCard({
  title,
  value,
  icon,
  trend = "steady",
}: {
  title: string;
  value: string | number;
  icon: string;
  trend?: "up" | "down" | "steady";
}) {
  const trendColors = {
    up: "text-emerald-400",
    down: "text-rose-400",
    steady: "text-amber-400",
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-lg border border-border hover:border-accent transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <p className="text-sm text-secondary">{title}</p>
            <p className="text-2xl font-bold text-primary">{value}</p>
          </div>
        </div>
        {trend !== "steady" && (
          <span className={`text-sm ${trendColors[trend]}`}>
            {trend === "up" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </div>
  );
}
