import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <h1 className="text-xl font-bold text-gray-900">Smart Waste</h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">Панель администратора</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/admin/dashboard')
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>📊</span>
                Дашборд
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bins"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/admin/bins')
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>🗑️</span>
                Контейнеры
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categories"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/admin/categories')
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>📁</span>
                Категории
              </Link>
            </li>
            <li>
              <Link
                to="/admin/areas"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/admin/areas')
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>📍</span>
                Районы
              </Link>
            </li>
            <li>
              <Link
                to="/admin/people"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/admin/people')
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>👥</span>
                Ответственные лица
              </Link>
            </li>
            <li>
              <Link
                to="/admin/notifications"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive('/admin/notifications')
                    ? 'bg-primary-50 text-primary-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>🔔</span>
                Уведомления
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {location.pathname.split('/').pop()?.charAt(0).toUpperCase() +
              (location.pathname.split('/').pop()?.slice(1) || '')}
          </h2>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Выйти
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
