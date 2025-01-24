import { Card } from './ui/Card';
import { Select } from './ui/Select';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function BatchAnalytics() {
  const [selectedBatch, setSelectedBatch] = useState('2024');
  const [selectedDepartment, setSelectedDepartment] = useState('CSE');

  const { data: batchData } = useQuery({
    queryKey: ['batch-analytics', selectedBatch, selectedDepartment],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return {
        passFailRate: [
          { name: 'Pass', value: 85, color: '#4ade80' },
          { name: 'Fail', value: 15, color: '#f87171' }
        ],
        subjectWiseAnalysis: [
          { subject: 'Database', pass: 90, fail: 10, average: 75 },
          { subject: 'Networks', pass: 85, fail: 15, average: 72 },
          { subject: 'Algorithms', pass: 80, fail: 20, average: 68 }
        ],
        topPerformers: [
          { name: 'John Doe', cgpa: 9.8 },
          { name: 'Jane Smith', cgpa: 9.7 },
          { name: 'Bob Johnson', cgpa: 9.6 }
        ]
      };
    }
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          label="Select Batch"
          labelClassName="text-slate-900 dark:text-slate-100"
          options={[
            { value: '2024', label: '2024' },
            { value: '2023', label: '2023' }
          ]}
          className="bg-white/80 border-indigo-100 text-slate-700 focus:border-indigo-300"
        />
        <Select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          label="Select Department"
          labelClassName="text-slate-900 dark:text-slate-100"
          options={[
            { value: 'CSE', label: 'Computer Science' },
            { value: 'ECE', label: 'Electronics' }
          ]}
          className="bg-white/80 border-indigo-100 text-slate-700 focus:border-indigo-300"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Pass/Fail Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={batchData?.passFailRate}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  label
                >
                  {batchData?.passFailRate.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Subject-wise Analysis</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={batchData?.subjectWiseAnalysis}>
                <Bar dataKey="average" fill="#4F46E5" name="Average Score" />
                <Bar dataKey="pass" fill="#4ade80" name="Pass Rate" />
                <Legend />
                <Tooltip cursor={false}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Top Performers</h3>
        <div className="space-y-4">
          {batchData?.topPerformers.map((student, index) => ( 
            <div 
              key={index}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <span className="font-medium text-indigo-900 dark:text-indigo-900">{student.name}</span>
              </div>
              <span className="text-indigo-600 font-semibold">CGPA: {student.cgpa}</span>
            </div>
          ))}
        </div>
      </Card> */}
    </div>
  );
} 