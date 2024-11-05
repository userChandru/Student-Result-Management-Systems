import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '../components/ui/Card';
import { AcademicProgress } from '../components/AcademicProgress';
import { SemesterComparison } from '../components/charts/SemesterComparison';
import { NotificationPanel } from '../components/NotificationPanel';

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 col-span-2">
          <h3 className="font-semibold mb-4">Academic Overview</h3>
          <AcademicProgress data={studentData?.progress} />
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4">Notifications</h3>
          <NotificationPanel />
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Semester Performance</h3>
        <SemesterComparison data={studentData?.semesterData} />
      </Card>
    </div>
  );
} 