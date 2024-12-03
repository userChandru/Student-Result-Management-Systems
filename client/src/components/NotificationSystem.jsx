import { useState, useEffect } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function NotificationSystem() {
  const [showNotifications, setShowNotifications] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      // Replace with actual API call
      return [
        {
          id: 1,
          title: 'New Results Published',
          message: 'Semester 4 results are now available',
          type: 'result',
          read: false,
          timestamp: '2024-03-15T10:30:00Z'
        },
        {
          id: 2,
          title: 'Revaluation Update',
          message: 'Your revaluation request for Database Management has been approved',
          type: 'revaluation',
          read: true,
          timestamp: '2024-03-14T15:45:00Z'
        }
      ];
    }
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId) => {
      // Replace with actual API call
      return new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    }
  });

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'result':
        return '📊';
      case 'revaluation':
        return '📝';
      default:
        return '📌';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="relative dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="h-5 w-5 dark:text-slate-100" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {showNotifications && (
        <Card className="absolute right-0 mt-2 w-80 max-h-[400px] overflow-y-auto z-50 shadow-lg">
          <div className="p-4 border-b border-slate-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Notifications</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-2 space-y-2">
            {notifications?.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg dark:bg-slate-700 ${
                  notification.read ? 'bg-white' : 'bg-blue-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm dark:text-slate-100">
                      {notification.title}  
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0"
                      onClick={() => markAsReadMutation.mutate(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
} 