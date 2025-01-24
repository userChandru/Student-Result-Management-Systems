import { Card } from './ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export function AcademicTrends({ data }) {
  const trendData = [
    { semester: 'Sem 1', cgpa: 8.5, sgpa: 8.5 },
    { semester: 'Sem 2', cgpa: 8.7, sgpa: 8.9 },
    { semester: 'Sem 3', cgpa: 8.8, sgpa: 9.0 },
    { semester: 'Sem 4', cgpa: 8.9, sgpa: 9.2 },
    { semester: 'Sem 5', cgpa: 9.0, sgpa: 9.3 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-medium text-slate-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 border border-slate-200 dark:border-slate-400">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200" />
            <XAxis 
              dataKey="semester" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              domain={[0, 10]} 
              stroke="#64748b"
              fontSize={12}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ color: 'inherit' }}
              formatter={(value) => (
                <span className="text-slate-900 dark:text-slate-100">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="cgpa"
              name="CGPA"
              stroke="#4F46E5"
              className="dark:stroke-emerald-500"
              strokeWidth={2}
              dot={{
                fill: '#fff',
                stroke: '#4F46E5',
                strokeWidth: 2,
                r: 4,
                className: 'dark:stroke-emerald-500'
              }}
              activeDot={{
                r: 6,
                fill: '#4F46E5',
                className: 'dark:fill-emerald-500'
              }}
            />
            <Line
              type="monotone"
              dataKey="sgpa"
              name="SGPA"
              stroke="#60A5FA"
              className="dark:stroke-white"
              strokeWidth={2}
              dot={{
                fill: '#fff',
                stroke: '#60A5FA',
                strokeWidth: 2,
                r: 4,
                className: 'dark:stroke-white'
              }}
              activeDot={{
                r: 6,
                fill: '#60A5FA',
                className: 'dark:fill-white'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-600">Current CGPA</p>
          <p className="text-2xl font-bold text-indigo-700">
            {trendData[trendData.length - 1].cgpa.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600">Latest SGPA</p>
          <p className="text-2xl font-bold text-blue-700">
            {trendData[trendData.length - 1].sgpa.toFixed(2)}
          </p>
        </div>
      </div>
    </Card>
  );
}