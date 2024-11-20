import { Card } from './ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function PassFailAnalysis({ data }) {
  const COLORS = ['#4ade80', '#f87171', '#fbbf24'];
  
  const statusData = [
    { name: 'Pass', value: data?.passCount || 0, color: COLORS[0] },
    { name: 'Fail', value: data?.failCount || 0, color: COLORS[1] },
    { name: 'Arrear', value: data?.arrearCount || 0, color: COLORS[2] }
  ];

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Pass/Fail Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {statusData.map((item, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg"
            style={{ backgroundColor: `${item.color}15` }}
          >
            <p className="text-sm font-medium" style={{ color: item.color }}>
              {item.name}
            </p>
            <p className="text-2xl font-bold mt-1" style={{ color: item.color }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}