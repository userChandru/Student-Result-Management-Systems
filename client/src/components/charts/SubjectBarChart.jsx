import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function SubjectBarChart({ data }) {
  if (!data) return null;

  const chartData = data.map(subject => ({
    name: subject.code,
    marks: subject.marks,
    average: subject.batchAverage,
  }));

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="marks" fill="hsl(var(--primary))" name="Your Marks" />
          <Bar dataKey="average" fill="hsl(var(--muted))" name="Batch Average" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 