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
          className={`p-4 rounded-lg border transition-all duration-200 ${
            notification.read 
              ? 'bg-gradient-to-br from-white to-slate-50/30 border-slate-200' 
              : 'bg-gradient-to-br from-blue-50 to-indigo-50/30 border-blue-200 shadow-sm shadow-blue-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <Bell className={`w-5 h-5 ${
              notification.read 
                ? 'text-slate-400' 
                : 'text-blue-500 animate-pulse'
            }`} />
            <div>
              <h4 className={`font-medium ${
                notification.read 
                  ? 'text-slate-700' 
                  : 'text-blue-700'
              }`}>{notification.title}</h4>
              <p className={`text-sm ${
                notification.read 
                  ? 'text-slate-600' 
                  : 'text-blue-600'
              }`}>{notification.message}</p>
              <p className="text-xs text-slate-400 mt-1">{notification.date}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 