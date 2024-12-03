import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../components/ui/Card';
import { AcademicProgress } from '../components/AcademicProgress';
import { SemesterComparison } from '../components/charts/SemesterComparison';
import { NotificationPanel } from '../components/NotificationPanel';
import { NotificationSystem } from '../components/NotificationSystem';
import { ThemeToggle } from '../components/ThemeToggle';

export function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(null);

  const { data: studentData, isLoading } = useQuery({
    queryKey: ['student-progress', selectedChild],
    queryFn: async () => {
      return {
        progress: {
          completedCredits: 85,
          totalCredits: 120,
          currentCGPA: 9.2,
          semesterWiseGPA: [
            { semester: 'Sem 1', gpa: 8.8 },
            { semester: 'Sem 2', gpa: 9.0 },
            { semester: 'Sem 3', gpa: 9.2 },
            { semester: 'Sem 4', gpa: 9.3 }
          ]
        },
        semesterData: {
          currentSemester: 4,
          attendance: 92,
          lastExamScore: 88
        }
      };
    }
  });

  return (
    <div className="w-screen min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              John Doe's Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-4 space-y-4 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 col-span-2">
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Academic Overview</h3>
            <AcademicProgress data={studentData?.progress} />
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Notifications</h3>
            <NotificationPanel />
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="font-semibold mb-4 text-slate-900 dark:text-slate-100">Semester Performance</h3>
          <SemesterComparison data={studentData?.semesterData} />
        </Card>
      </main>
    </div>
  );
} 