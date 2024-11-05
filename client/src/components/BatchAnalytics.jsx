import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Progress } from './ui/Progress';

export function BatchAnalytics({ data }) {
  if (!data) return null;

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Average CGPA</p>
          <p className="text-2xl font-bold">{data.averageCGPA?.toFixed(2)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Pass Percentage</p>
          <p className="text-2xl font-bold">{data.passPercentage}%</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Department Rank</p>
          <p className="text-2xl font-bold">{data.departmentRank}</p>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.distribution}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.distribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Attendance</span>
            <span>{data.performanceMetrics?.attendance}%</span>
          </div>
          <Progress value={data.performanceMetrics?.attendance || 0} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Assignment Completion</span>
            <span>{data.performanceMetrics?.assignmentCompletion}%</span>
          </div>
          <Progress value={data.performanceMetrics?.assignmentCompletion || 0} />
        </div>
      </div>
    </div>
  );
} 