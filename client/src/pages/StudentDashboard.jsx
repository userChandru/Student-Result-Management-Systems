import { ResultsTable } from '../components/ResultsTable';
import { AcademicTrends } from '../components/AcademicTrends';
import { PerformanceComparison } from '../components/PerformanceComparison';
import { RevaluationSystem } from '../components/RevaluationSystem';
import { NotificationSystem } from '../components/NotificationSystem';
import { ThemeToggle } from '../components/ThemeToggle';
import { Card } from '../components/ui/Card';

export function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 w-screen ">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Student Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <NotificationSystem />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Results Section */}
          <section>
            <Card className="p-6 border border-slate-200 dark:border-slate-400">
              <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Semester Results</h2>
              <ResultsTable />
            </Card>
          </section>

          {/* Academic Progress */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AcademicTrends />
            <PerformanceComparison />
          </section>

          {/* Revaluation Section */}
          <section>
            <Card className="p-6 border border-slate-200 dark:border-slate-400">
              <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Revaluation Requests</h2>
              <RevaluationSystem />
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
} 