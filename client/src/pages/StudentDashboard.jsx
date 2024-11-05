import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, LineChart } from 'recharts';
import { Card } from '../components/ui/Card';
import { ResultsTable } from '../components/ResultsTable';
import { SubjectBarChart } from '../components/charts/SubjectBarChart';
import { CGPALineChart } from '../components/charts/CGPALineChart';
import { GaugeChart } from '../components/charts/GaugeChart';
import { Select } from '../components/ui/Select';

export function StudentDashboard() {
  const [selectedSemester, setSelectedSemester] = useState(1);

  const { data: results, isLoading } = useQuery({
    queryKey: ['results', selectedSemester],
    queryFn: async () => {
      return {
        cgpa: 9.2,
        sgpa: 9.5,
        completionPercentage: 85,
        subjects: [
          { 
            code: 'CS201', 
            name: 'Data Structures', 
            examMarks: 92, 
            internalMarks: 45,
            maxMarks: 100,
            deptHighest: 95,
            deptLowest: 65,
            deptRank: 3
          },
          { 
            code: 'CS202', 
            name: 'Operating Systems', 
            examMarks: 88,
            internalMarks: 43,
            maxMarks: 100,
            deptHighest: 92,
            deptLowest: 60,
            deptRank: 5
          },
          { 
            code: 'CS203', 
            name: 'Computer Networks', 
            examMarks: 90,
            internalMarks: 47,
            maxMarks: 100,
            deptHighest: 94,
            deptLowest: 62,
            deptRank: 4
          }
        ],
        cgpaTrend: [
          { semester: 1, cgpa: 8.8 },
          { semester: 2, cgpa: 9.0 },
          { semester: 3, cgpa: 9.2 },
          { semester: 4, cgpa: 9.3 }
        ]
      };
    }
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">No results found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <Select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          options={['1', '2', '3', '4', '5', '6', '7', '8']}
          label="Semester"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-gray-600">Current CGPA</h3>
          <GaugeChart value={results.cgpa} maxValue={10} />
        </Card>
        
        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-gray-600">Current SGPA</h3>
          <GaugeChart value={results.sgpa} maxValue={10} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-gray-600">Completion Status</h3>
          <GaugeChart value={results.completionPercentage} maxValue={100} />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-gray-600">Subject Performance</h3>
          <SubjectBarChart data={results.subjects} />
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-gray-600">CGPA Trend</h3>
          <CGPALineChart data={results.cgpaTrend} />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4 text-gray-600">Semester Results</h3>
        <ResultsTable data={results.subjects} />
      </Card>
    </div>
  );
} 