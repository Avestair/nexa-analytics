export default function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
      <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      <div className="h-64 [&>canvas]:!max-h-64 [&>canvas]:!w-full">
        {children}
      </div>
    </div>
  );
}
