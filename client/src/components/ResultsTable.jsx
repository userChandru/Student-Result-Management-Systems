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
            examMarks: 65,
            internalMarks: 23,
            total: 88,
            credits: 3,
            deptHighest: 92,
            deptLowest: 45,
            deptRank: 3
          },
          {
            code: 'MA101',
            subject: 'Engineering Mathematics',
            examMarks: 52,
            internalMarks: 20,
            total: 72,
            credits: 3,
            deptHighest: 90,
            deptLowest: 40,
            deptRank: 8
          },
          {
            code: 'EH101',
            subject: 'Engineering Physics',
            examMarks: 48,
            internalMarks: 18,
            total: 66,
            credits: 2,
            deptHighest: 88,
            deptLowest: 35,
            deptRank: 12
          },
          {
            code: 'EC101',
            subject: 'Engineering Chemistry',
            examMarks: 58,
            internalMarks: 21,
            total: 79,
            credits: 2,
            deptHighest: 91,
            deptLowest: 42,
            deptRank: 5
          }
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
      <div className="bg-white dark:bg-slate-800 dark:border-slate-600 p-4 rounded-lg shadow-sm border border-slate-200 print:shadow-none">
        <div className="flex justify-between items-start mb-4">
          <div className="grid grid-cols-4 gap-4 flex-1">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Semester:</label>
              <Select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                options={[
                  { value: 'S1', label: 'Semester 1' },
                  { value: 'S2', label: 'Semester 2' },
                  { value: 'S3', label: 'Semester 3' },
                  { value: 'S4', label: 'Semester 4' }
                ]}
                className="print:border-none print:bg-transparent text-slate-600 border border-slate-200 dark:text-slate-900 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:border-slate-100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">SGPA:</label>
              <div className="h-10 flex items-center text-lg font-semibold text-slate-900 dark:text-slate-100">
                {resultsData?.sgpa || '-'}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">CGPA:</label>
              <div className="h-10 flex items-center text-lg font-semibold text-slate-900 dark:text-slate-100">
                {resultsData?.cgpa || '-'}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Dept Rank:</label>
              <div className="h-10 flex items-center text-lg font-semibold text-slate-900 dark:text-slate-100">
                {resultsData?.deptRank || '-'}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 print:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="flex items-center gap-2 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-slate-100"
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadCSV}
              className="flex items-center gap-2 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-600 dark:hover:text-slate-100"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-600">
        <Table>
          <thead>
            <tr className="bg-slate-50">
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-100">
                Subject Code
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-100">
                Subject
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-100">
                Credits
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-100">
                Exam Marks
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-100">
                Internal Marks
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-100">
                Total
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-100">
                Dept Highest
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-100 ">
                Dept Lowest
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-100 ">
                Dept Rank
              </th>
            </tr>
          </thead>
          <tbody>
            {resultsData?.subjects.map((subject, index) => (
              <tr 
                key={subject.code}
                className={`
                  border-b border-slate-100 dark:border-slate-700/50
                  ${index % 2 === 0 ? 'bg-white dark:bg-slate-700' : 'bg-slate-50/50 dark:bg-slate-800/50'}
                  ${subject.total >= 80 ? 'border-l-emerald-500' : 
                    subject.total >= 60 ? 'border-l-blue-500' : 
                    'border-l-amber-500'}
                `}
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                  {subject.code}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                  {subject.subject}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                  {subject.credits}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                  {subject.examMarks}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900 dark:text-slate-100">
                  {subject.internalMarks}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {subject.total}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-green-600 dark:text-green-400">
                  {subject.deptHighest}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {subject.deptLowest}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-indigo-600 dark:text-indigo-400">
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