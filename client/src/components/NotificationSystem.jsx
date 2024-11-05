import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Bell } from 'lucide-react';

export function NotificationSystem() {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => fetch('/api/notifications').then(res => res.json()),
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  useEffect(() => {
    if (notifications?.length > 0) {
      notifications.forEach(notification => {
        if (!notification.read) {
          toast(notification.message, {
            icon: <Bell className="w-4 h-4" />,
            duration: 5000
          });
        }
      });
    }
  }, [notifications]);

  return null;
} 