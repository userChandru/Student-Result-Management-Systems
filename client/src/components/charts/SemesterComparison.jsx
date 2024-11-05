import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';

export function SemesterComparison({ data }) {
  if (!data || !data.semesterData) return null;

  const chartData = [
    {
      name: 'Current Semester',
      average: data.lastExamScore,
      attendance: data.attendance,
      semester: data.currentSemester
    }
  ];

  return (
    <div className="space-y-6">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
            <Tooltip />
            <Bar 
              yAxisId="left"
              dataKey="average" 
              fill="hsl(var(--primary))" 
              name="Exam Score" 
            />
            <Bar 
              yAxisId="right"
              dataKey="attendance" 
              fill="hsl(var(--success))" 
              name="Attendance %" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h4 className="text-sm font-medium">Current Semester</h4>
          <p className="text-2xl font-bold mt-2">{data.currentSemester}</p>
        </Card>
        <Card className="p-4">
          <h4 className="text-sm font-medium">Attendance</h4>
          <p className="text-2xl font-bold mt-2">{data.attendance}%</p>
        </Card>
        <Card className="p-4">
          <h4 className="text-sm font-medium">Last Exam Score</h4>
          <p className="text-2xl font-bold mt-2">{data.lastExamScore}%</p>
        </Card>
      </div>
    </div>
  );
} 