import { Bell } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export function NotificationPanel() {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      // Mock data for now
      return [
        {
          id: 1,
          title: 'New Result Published',
          message: 'Semester 4 results are now available',
          date: '2024-03-15',
          read: false
        },
        {
          id: 2,
          title: 'Revaluation Update',
          message: 'Your revaluation request has been approved',
          date: '2024-03-14',
          read: true
        }
      ];
    }
  });

  return (
    <div className="space-y-4">
      {notifications?.map(notification => (
        <div 
          key={notification.id}
          className={`p-4 rounded-lg border ${
            notification.read 
              ? 'bg-white border-slate-200' 
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <Bell className={`w-5 h-5 ${notification.read ? 'text-slate-400' : 'text-blue-500'}`} />
            <div>
              <h4 className="font-medium text-slate-900">{notification.title}</h4>
              <p className="text-sm text-slate-600">{notification.message}</p>
              <p className="text-xs text-slate-400 mt-1">{notification.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 