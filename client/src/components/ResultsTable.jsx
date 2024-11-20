import { Select } from './ui/Select';
import { Table } from './ui/Table';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Download, Printer } from 'lucide-react';
import { Button } from './ui/Button';
import toast from 'react-hot-toast';

export function ResultsTable() {
  const [selectedSemester, setSelectedSemester] = useState('S1');

  const { data: resultsData, isLoading } = useQuery({
    queryKey: ['results', selectedSemester],
    queryFn: async () => {
      // Replace with actual API call
      return {
        semester: 'S1',
        sgpa: 8.75,
        cgpa: 8.75,
        deptRank: 5,
        subjects: [
          {
            code: 'CS101',
            subject: 'Programming Fundamentals',
            examMarks: 75,
            internalMarks: 22,
            total: 97,
            deptHighest: 98,
            deptLowest: 45,
            deptRank: 3
          },
          {
            code: 'MA101',
            subject: 'Engineering Mathematics',
            examMarks: 70,
            internalMarks: 24,
            total: 94,
            deptHighest: 96,
            deptLowest: 42,
            deptRank: 4
          },
          // Add more subjects as needed
        ]
      };
    }
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    // Implementation for CSV download
    toast.success('Results downloaded successfully');
  };

  return (
    <div className="space-y-6 print:space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 print:shadow-none">
        <div className="flex justify-between items-start mb-4">
          <div className="grid grid-cols-4 gap-4 flex-1">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">Semester:</label>
              <Select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                options={[
                  { value: 'S1', label: 'Semester 1' },
                  { value: 'S2', label: 'Semester 2' },
                  { value: 'S3', label: 'Semester 3' },
                  { value: 'S4', label: 'Semester 4' }
                ]}
                className="print:border-none print:bg-transparent"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">SGPA:</label>
              <div className="h-10 flex items-center text-lg font-semibold text-slate-900">
                {resultsData?.sgpa || '-'}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">CGPA:</label>
              <div className="h-10 flex items-center text-lg font-semibold text-slate-900">
                {resultsData?.cgpa || '-'}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600">Dept Rank:</label>
              <div className="h-10 flex items-center text-lg font-semibold text-slate-900">
                {resultsData?.deptRank || '-'}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 print:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadCSV}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <Table>
          <thead>
            <tr className="bg-slate-50">
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600">
                Subject Code
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600">
                Subject
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600">
                Exam Marks
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600">
                Internal Marks
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600">
                Total
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600">
                Dept Highest
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600">
                Dept Lowest
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600">
                Dept Rank
              </th>
            </tr>
          </thead>
          <tbody>
            {resultsData?.subjects.map((subject, index) => (
              <tr 
                key={subject.code}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900">
                  {subject.code}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900">
                  {subject.subject}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900">
                  {subject.examMarks}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900">
                  {subject.internalMarks}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">
                  {subject.total}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-green-600">
                  {subject.deptHighest}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-red-600">
                  {subject.deptLowest}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-indigo-600">
                  {subject.deptRank}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
} 