import { Card } from './ui/Card';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend, Tooltip } from 'recharts';

export function PerformanceComparison({ data }) {
  const subjectData = [
    { subject: 'Mathematics', student: 85, classAverage: 75 },
    { subject: 'Physics', student: 78, classAverage: 72 },
    { subject: 'Chemistry', student: 90, classAverage: 78 },
    { subject: 'English', student: 88, classAverage: 80 },
    { subject: 'Computer Science', student: 92, classAverage: 76 }
  ];

  return (
    <Card className="p-6 border border-slate-200 dark:border-slate-400">
      {/* <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Performance Analysis</h3> */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={subjectData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <Radar
              name="Your Score"
              dataKey="student"
              stroke="#4F46E5"
              fill="#4F46E5"
              fillOpacity={0.3}
            />
            <Radar
              name="Class Average"
              dataKey="classAverage"
              stroke="#60A5FA"
              fill="#60A5FA"
              fillOpacity={0.3}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg">
          <p className="text-sm text-indigo-700 font-medium">Strongest Subject</p>
          <p className="text-lg font-bold text-indigo-900">Computer Science</p>
          <p className="text-sm text-indigo-600">92%</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg">
          <p className="text-sm text-emerald-700 font-medium">Area for Improvement</p>
          <p className="text-lg font-bold text-emerald-900">Physics</p>
          <p className="text-sm text-emerald-600">78%</p>
        </div>
      </div>
    </Card>
  );
} 