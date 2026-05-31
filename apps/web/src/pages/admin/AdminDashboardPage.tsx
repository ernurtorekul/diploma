import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

interface DashboardStats {
  totalBins: number;
  fullBins: number;
  totalClassifications: number;
  totalUsers: number;
}

interface Bin {
  id: string;
  qrCode: string;
  location: string;
  fullnessPercentage: number;
  isFull: boolean;
  lastFullnessUpdate: string;
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalBins: 0,
    fullBins: 0,
    totalClassifications: 0,
    totalUsers: 0,
  });
  const [recentBins, setRecentBins] = useState<Bin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      // Fetch bins data
      const binsResponse = await api.get('/bins');
      const bins = binsResponse.data;

      // Calculate stats from real data
      const totalBins = bins.length;
      const fullBins = bins.filter((b: Bin) => b.isFull).length;

      // Fetch users count
      const usersResponse = await api.get('/users/leaderboard');
      const totalUsers = usersResponse.data.length;

      // Calculate total classifications
      const totalClassifications = bins.reduce((sum: number, b: any) => sum + (b._count?.classifications || 0), 0);

      setStats({
        totalBins,
        fullBins,
        totalClassifications,
        totalUsers,
      });

      // Get recent bins with updates
      const binsWithUpdates = bins
        .filter((b: Bin) => b.lastFullnessUpdate)
        .sort((a: Bin, b: Bin) => new Date(b.lastFullnessUpdate).getTime() - new Date(a.lastFullnessUpdate).getTime())
        .slice(0, 5);

      setRecentBins(binsWithUpdates);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const then = new Date(dateString);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'только что';
    if (diffMins < 60) return `${diffMins} мин назад`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} ч назад`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} д назад`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <h1 className="text-xl font-bold text-gray-900">Smart Waste Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Выйти
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Дашборд</h2>
          <p className="text-gray-600">Обзор вашей системы управления отходами</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Bins */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Всего контейнеров</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBins}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🗑️</span>
              </div>
            </div>
          </div>

          {/* Full Bins */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Заполненные контейнеры</p>
                <p className="text-3xl font-bold text-orange-600">{stats.fullBins}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </div>

          {/* Classifications */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Классификации</p>
                <p className="text-3xl font-bold text-primary-600">
                  {stats.totalClassifications}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
            </div>
          </div>

          {/* Users */}
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Активные пользователи</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Быстрые действия</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/admin/bins')}
              className="card text-left hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🗑️</span>
                <div>
                  <p className="font-semibold text-gray-900">Управление контейнерами</p>
                  <p className="text-sm text-gray-600">Добавить, редактировать или удалить контейнеры</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/categories')}
              className="card text-left hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📁</span>
                <div>
                  <p className="font-semibold text-gray-900">Категории</p>
                  <p className="text-sm text-gray-600">Управление категориями отходов</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/areas')}
              className="card text-left hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-900">Районы</p>
                  <p className="text-sm text-gray-600">Настройка районов сбора</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Последние обновления контейнеров</h3>
          <div className="card">
            {recentBins.length > 0 ? (
              <div className="space-y-4">
                {recentBins.map((bin) => (
                  <div
                    key={bin.id}
                    className="flex items-center justify-between py-3 border-b last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          bin.isFull ? 'bg-red-100' : 'bg-green-100'
                        }`}
                      >
                        <span>🗑️</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {bin.location} ({bin.qrCode})
                        </p>
                        <p className="text-xs text-gray-600">
                          Заполненность: {bin.fullnessPercentage}%
                          {bin.isFull && ' • Заполнен'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(bin.lastFullnessUpdate)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Нет обновлений контейнеров
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
