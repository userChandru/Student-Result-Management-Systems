import { Card } from './ui/Card';
import { Select } from './ui/Select';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function DepartmentAnalytics() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedSemester, setSelectedSemester] = useState('1');

  const departmentData = {
    performance: [
      { department: 'CSE', avgCGPA: 8.5, passRate: 92, studentCount: 120 },
      { department: 'ECE', avgCGPA: 8.2, passRate: 88, studentCount: 110 },
      { department: 'MECH', avgCGPA: 7.9, passRate: 85, studentCount: 100 },
      { department: 'CIVIL', avgCGPA: 8.0, passRate: 87, studentCount: 90 },
    ],
    toppers: {
      CSE: [
        { name: 'John Doe', cgpa: 9.8 },
        { name: 'Jane Smith', cgpa: 9.7 }
      ],
      ECE: [
        { name: 'Alice Johnson', cgpa: 9.6 },
        { name: 'Bob Wilson', cgpa: 9.5 }
      ]
    },
    genderDistribution: [
      { name: 'Male', value: 60, color: '#4F46E5' },
      { name: 'Female', value: 40, color: '#EC4899' }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          label="Academic Year"
          options={[
            { value: '2024', label: '2023-2024' },
            { value: '2023', label: '2022-2023' }
          ]}
        />
        <Select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          label="Semester"
          options={[
            { value: '1', label: 'Semester 1' },
            { value: '2', label: 'Semester 2' }
          ]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Department Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={departmentData.performance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" />
                <YAxis yAxisId="right" orientation="right" stroke="#EC4899" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="avgCGPA" name="Avg CGPA" fill="#4F46E5" />
                <Bar yAxisId="right" dataKey="passRate" name="Pass Rate %" fill="#EC4899" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={departmentData.genderDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {departmentData.genderDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Department Toppers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(departmentData.toppers).map(([dept, students]) => (
            <div key={dept} className="space-y-3">
              <h4 className="font-medium text-slate-900">{dept}</h4>
              {students.map((student, index) => (
                <div 
                  key={index}
                  className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg flex justify-between items-center"
                >
                  <span className="font-medium">{student.name}</span>
                  <span className="text-indigo-600 font-semibold">
                    CGPA: {student.cgpa}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 