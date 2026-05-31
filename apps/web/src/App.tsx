import { Routes, Route } from 'react-router-dom';
import ScanPage from './pages/ScanPage';
import ResultPage from './pages/ResultPage';
import LeaderboardPage from './pages/LeaderboardPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import CategoriesPage from './pages/admin/CategoriesPage';
import AreasPage from './pages/admin/AreasPage';
import PeoplePage from './pages/admin/PeoplePage';
import BinsPage from './pages/admin/BinsPage';
import NotificationsPage from './pages/admin/NotificationsPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<ScanPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="areas" element={<AreasPage />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="bins" element={<BinsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
