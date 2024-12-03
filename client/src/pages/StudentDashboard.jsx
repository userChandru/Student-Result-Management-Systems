import { ResultsTable } from '../components/ResultsTable';
import { AcademicTrends } from '../components/AcademicTrends';
import { PerformanceComparison } from '../components/PerformanceComparison';
import { RevaluationSystem } from '../components/RevaluationSystem';
import { NotificationSystem } from '../components/NotificationSystem';
import { ThemeToggle } from '../components/ThemeToggle';
import { Card } from '../components/ui/Card';

export function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30 w-screen">
      <header className="bg-gradient-to-r from-white to-slate-50/80 dark:from-slate-800 dark:to-slate-700/80 border-b border-slate-200 dark:border-slate-700 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
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
            <Card className="p-6 border border-slate-200 dark:border-slate-400 bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/30 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6 text-indigo-700 dark:text-slate-100">
                Semester Results
              </h2>
              <ResultsTable />
            </Card>
          </section>

          {/* Academic Progress */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-slate-200 dark:border-slate-400 bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/30 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6 text-indigo-700 dark:text-slate-100">
                Academic Trends
              </h2>
              <AcademicTrends />
            </Card>
            
            <Card className="p-6 border border-slate-200 dark:border-slate-400 bg-gradient-to-br from-white to-indigo-50/30 dark:from-slate-800 dark:to-blue-900/30 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6 text-blue-700 dark:text-slate-100">
                Performance Comparison
              </h2>
              <PerformanceComparison />
            </Card>
          </section>

          {/* Revaluation Section */}
          <section>
            <Card className="p-6 border border-slate-200 dark:border-slate-400 bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-800 dark:to-slate-700/30 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-6 text-indigo-700 dark:text-slate-100">
                Revaluation Requests
              </h2>
              <RevaluationSystem />
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
} 