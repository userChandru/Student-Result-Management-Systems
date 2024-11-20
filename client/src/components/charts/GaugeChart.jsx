import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function GaugeChart({ value, total }) {
  const percentage = (value / total) * 100;
  const data = [
    { value: percentage },
    { value: 100 - percentage }
  ];

  return (
    <div className="relative h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill="url(#gradientGauge)" />
            <Cell fill="#f1f5f9" />
          </Pie>
          <defs>
            <linearGradient id="gradientGauge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#60A5FA" />
            </linearGradient>
          </defs>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-25%] text-center">
        <p className="text-3xl font-bold text-slate-700">{Math.round(percentage)}%</p>
        <p className="text-sm text-slate-500">Completed</p>
      </div>
    </div>
  );
} 