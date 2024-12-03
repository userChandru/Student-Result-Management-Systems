import { Card } from './ui/Card';

export function TopPerformers({ data }) {
  return (
    <div className="space-y-4">
      {data?.map((student, index) => (
        <Card 
          key={student.id} 
          className={`p-4 flex items-center justify-between transition-all duration-200 hover:shadow-md ${
            index === 0 
              ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 dark:from-amber-950/30 dark:to-yellow-950/30 dark:border-amber-800' 
              : index === 1
              ? 'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200 dark:from-slate-950/30 dark:to-gray-950/30 dark:border-slate-800'
              : index === 2
              ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 dark:from-orange-950/30 dark:to-amber-950/30 dark:border-orange-800'
              : index === 3
              ? 'bg-gradient-to-r from-bronze-50 to-stone-50 border-stone-200 dark:from-stone-950/30 dark:to-bronze-950/30 dark:border-stone-800'
              : index === 4
              ? 'bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200 dark:from-indigo-950/30 dark:to-blue-950/30 dark:border-indigo-800'
              : 'bg-white border-slate-200 dark:bg-slate-950/30 dark:border-slate-800'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index === 0 
                ? 'bg-amber-500 text-white dark:bg-amber-600' 
                : index === 1
                ? 'bg-slate-500 text-white dark:bg-slate-600'
                : index === 2
                ? 'bg-orange-500 text-white dark:bg-orange-600'
                : index === 3
                ? 'bg-stone-500 text-white dark:bg-stone-600'
                : index === 4
                ? 'bg-indigo-500 text-white dark:bg-indigo-600'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
            }`}>
              <span className="text-sm font-medium">{index + 1}</span>
            </div>
            <div>
              <h4 className="font-medium text-slate-900">{student.name}</h4>
              <p className="text-sm text-slate-600">{student.rollNo}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${
              index === 0 
                ? 'text-amber-700 dark:text-amber-400' 
                : index === 1
                ? 'text-slate-700 dark:text-slate-400'
                : index === 2
                ? 'text-orange-700 dark:text-orange-400'
                : index === 3
                ? 'text-stone-700 dark:text-stone-400'
                : index === 4
                ? 'text-indigo-700 dark:text-indigo-400'
                : 'text-slate-700 dark:text-slate-400'
            }`}>{student.cgpa.toFixed(2)}</p>
            <p className="text-sm text-slate-600">CGPA</p>
          </div>
        </Card>
      ))}
    </div>
  );
} 