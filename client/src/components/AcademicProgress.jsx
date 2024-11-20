import { Progress } from './ui/Progress';
import { Card } from './ui/Card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export function AcademicProgress({ data }) {
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-600">Credits Progress</h4>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-slate-200">
            <Progress 
              value={(data.completedCredits / data.totalCredits) * 100} 
              className="h-2 bg-slate-100"
            />
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-slate-600">{data.completedCredits} completed</span>
              <span className="text-slate-600">Total: {data.totalCredits}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-600">Current CGPA</h4>
          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-slate-200">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              {data.currentCGPA?.toFixed(2)}
            </div>
            <p className="text-sm text-slate-600 mt-1">Out of 10.0</p>
          </div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-slate-200">
        <h4 className="text-sm font-medium text-slate-600 mb-4">GPA Trend</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.semesterWiseGPA}>
              <XAxis 
                dataKey="semester" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 10]} 
                stroke="#64748b"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="gpa" 
                stroke="url(#gradientLine)" 
                strokeWidth={2}
                dot={{ 
                  fill: '#fff',
                  stroke: '#4F46E5',
                  strokeWidth: 2,
                  r: 4
                }}
                activeDot={{
                  r: 6,
                  fill: '#4F46E5'
                }}
              />
              <defs>
                <linearGradient id="gradientLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 