import { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface Notification {
  id: string;
  type: string;
  message: string;
  sentAt: string;
  status: string;
  bin: {
    id: string;
    qrCode: string;
    location: string;
    category: {
      name: string;
      color: string;
      icon: string;
    };
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState({ total: 0, sent: 0, failed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [notificationsRes, statsRes] = await Promise.all([
        api.get('/notifications'),
        api.get('/notifications/stats'),
      ]);
      setNotifications(notificationsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'BIN_FULL':
        return '🗑️';
      case 'BIN_EMPTIED':
        return '✅';
      case 'SYSTEM':
        return '⚙️';
      default:
        return '🔔';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SENT':
        return 'bg-green-100 text-green-700';
      case 'FAILED':
        return 'bg-red-100 text-red-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Уведомления</h1>
          <p className="text-gray-600">История всех системных уведомлений</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Всего отправлено</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Доставлено</p>
              <p className="text-3xl font-bold text-green-600">{stats.sent}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Не доставлено</p>
              <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="card">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <span className="text-4xl mb-4 block">🔔</span>
            <p>Уведомлений пока нет</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: notification.bin.category.color + '20' }}
                >
                  {getTypeIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {notification.bin.qrCode}
                    </span>
                    <span className="text-sm text-gray-600">
                      • {notification.bin.location}
                    </span>
                  </div>
                  <p className="text-gray-700">{notification.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{new Date(notification.sentAt).toLocaleString()}</span>
                    <span
                      className={`px-2 py-1 rounded ${getStatusColor(notification.status)}`}
                    >
                      {notification.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
