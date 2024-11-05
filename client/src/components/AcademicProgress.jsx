import { Card } from './ui/Card';
import { Progress } from './ui/Progress';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function AcademicProgress({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="text-sm font-medium mb-2">Credits Completed</h4>
          <Progress 
            value={(data.completedCredits / data.totalCredits) * 100} 
            className="h-2"
          />
          <p className="mt-2 text-sm text-muted-foreground">
            {data.completedCredits} of {data.totalCredits} credits
          </p>
        </Card>

        <Card className="p-4">
          <h4 className="text-sm font-medium mb-2">Current CGPA</h4>
          <p className="text-3xl font-bold">{data.currentCGPA.toFixed(2)}</p>
        </Card>
      </div>

      <Card className="p-4">
        <h4 className="text-sm font-medium mb-4">GPA Trend</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.semesterWiseGPA}>
              <XAxis dataKey="semester" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="gpa" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
} 