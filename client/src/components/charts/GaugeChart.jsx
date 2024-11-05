import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function GaugeChart({ value, maxValue }) {
  const data = [
    { name: 'value', value: value },
    { name: 'remaining', value: maxValue - value }
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

  return (
    <div className="h-[150px] relative">
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-3xl font-bold">{value.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground">/ {maxValue}</p>
      </div>
    </div>
  );
} 