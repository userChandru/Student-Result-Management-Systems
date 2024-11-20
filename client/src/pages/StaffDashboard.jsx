import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { BatchAnalytics } from '../components/BatchAnalytics';
import { RevaluationTable } from '../components/RevaluationTable';
import { TopPerformers } from '../components/TopPerformers';
import { UploadMarks } from '../components/UploadMarks';

export function StaffDashboard() {
  const [selectedBatch, setSelectedBatch] = useState('2024');
  const [selectedDepartment, setSelectedDepartment] = useState('CSE');

  const { data: batchData, isLoading } = useQuery({
    queryKey: ['batch-analytics', selectedBatch, selectedDepartment],
    queryFn: async () => {
      return {
        analytics: {
          averageCGPA: 8.5,
          passPercentage: 92,
          topperCGPA: 9.8,
          studentsCount: 120,
          departmentRank: 2,
          distribution: [
            { name: 'Above 8.5', value: 30 },
            { name: '7.0 - 8.5', value: 45 },
            { name: 'Below 7.0', value: 25 }
          ],
          performanceMetrics: {
            attendance: 85,
            assignmentCompletion: 90,
            examScores: 88
          }
        },
        topPerformers: [
          { id: 1, name: 'John Doe', rollNo: 'CS2024001', cgpa: 9.8 },
          { id: 2, name: 'Jane Smith', rollNo: 'CS2024015', cgpa: 9.6 },
          { id: 3, name: 'Alex Johnson', rollNo: 'CS2024032', cgpa: 9.5 },
          { id: 4, name: 'Sarah Williams', rollNo: 'CS2024045', cgpa: 9.4 },
          { id: 5, name: 'Michael Brown', rollNo: 'CS2024058', cgpa: 9.3 }
        ]
      };
    }
  });

  return (
    <div className="space-y-6  w-screen">
      <div className="flex gap-4 items-center">
        <Select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          options={['2024', '2025', '2026']}
          label="Batch"
        />
        <Select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          options={['CSE', 'ECE', 'MECH']}
          label="Department"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Batch Analytics</h3>
          <BatchAnalytics data={batchData?.analytics} />
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Top Performers</h3>
          <TopPerformers data={batchData?.topPerformers} />
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Upload Marks</h3>
        <UploadMarks batch={selectedBatch} department={selectedDepartment} />
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Revaluation Requests</h3>
        <RevaluationTable />
      </Card>
    </div>
  );
} 