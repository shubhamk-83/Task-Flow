const StatCard = ({ label, value, colorClass }) => (
  <div className="card p-4 flex flex-col gap-1">
    <span className={`text-2xl font-bold ${colorClass}`}>{value}</span>
    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
  </div>
);

const StatsBar = ({ stats }) => {
  if (!stats) return null;

  const items = [
    { label: 'Total',     value: stats.total,     colorClass: 'text-gray-800' },
    { label: 'Pending',   value: stats.pending,   colorClass: 'text-yellow-600' },
    { label: 'Completed', value: stats.completed, colorClass: 'text-green-600' },
    { label: 'High',      value: stats.high,      colorClass: 'text-red-600' },
    { label: 'Medium',    value: stats.medium,    colorClass: 'text-orange-500' },
    { label: 'Low',       value: stats.low,       colorClass: 'text-blue-500' },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
};

export default StatsBar;
