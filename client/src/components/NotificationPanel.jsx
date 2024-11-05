import { useQuery } from '@tanstack/react-query';
import { Bell, CheckCircle, XCircle } from 'lucide-react';

export function NotificationPanel() {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => fetch('/api/notifications').then(res => res.json())
  });

  return (
    <div className="space-y-4">
      {notifications?.map(notification => (
        <div 
          key={notification.id} 
          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
        >
          <Bell className="w-5 h-5 mt-0.5 text-muted-foreground" />
          <div>
            <p className="text-sm">{notification.message}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {new Date(notification.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 