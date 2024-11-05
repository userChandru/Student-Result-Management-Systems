import { Card } from './ui/Card';

export function TopPerformers({ data }) {
  return (
    <div className="space-y-4">
      {data?.map((student, index) => (
        <Card key={student.id} className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium">{index + 1}</span>
            </div>
            <div>
              <h4 className="font-medium">{student.name}</h4>
              <p className="text-sm text-muted-foreground">{student.rollNo}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">{student.cgpa.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">CGPA</p>
          </div>
        </Card>
      ))}
    </div>
  );
} 