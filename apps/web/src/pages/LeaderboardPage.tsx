import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/user.service';

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  classifications: number;
}

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const response = await userService.getLeaderboard();
      setLeaderboardData(response.data);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Назад
          </button>
          <h1 className="text-xl font-bold text-gray-900">Таблица лидеров</h1>
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Загрузка таблицы лидеров...</p>
          </div>
        ) : (
          <>
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl mb-4 block">🏆</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Топ эко-воинов
          </h2>
          <p className="text-gray-600">
            Посмотрите, кто оказывает наибольшее влияние на окружающую среду
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-4 mb-12">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="bg-gray-200 rounded-t-xl p-4 mb-2">
              <span className="text-4xl">🥈</span>
              <p className="font-semibold text-gray-900 mt-2">@green_hero</p>
              <p className="text-2xl font-bold text-gray-700">480</p>
            </div>
            <div className="bg-gray-300 h-24 w-24 flex items-center justify-center text-white font-bold text-xl rounded-lg">
              2
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="bg-yellow-100 rounded-t-xl p-4 mb-2">
              <span className="text-5xl">🥇</span>
              <p className="font-bold text-gray-900 mt-2 text-lg">@eco_warrior</p>
              <p className="text-3xl font-bold text-yellow-600">540</p>
            </div>
            <div className="bg-yellow-400 h-32 w-28 flex items-center justify-center text-white font-bold text-2xl rounded-lg">
              1
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="bg-orange-100 rounded-t-xl p-4 mb-2">
              <span className="text-4xl">🥉</span>
              <p className="font-semibold text-gray-900 mt-2">@recycling_pro</p>
              <p className="text-2xl font-bold text-orange-700">420</p>
            </div>
            <div className="bg-orange-300 h-20 w-20 flex items-center justify-center text-white font-bold text-xl rounded-lg">
              3
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <div className="card">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Ранг
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Пользователь
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Очки
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                  Элементы
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry) => (
                <tr
                  key={entry.rank}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
                        entry.rank <= 3
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {entry.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {entry.username}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-primary-600">
                    {entry.points}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-600">
                    {entry.classifications}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Начните сканировать, чтобы занять место в таблице лидеров!
          </p>
          <button
            onClick={() => navigate('/scan')}
            className="btn-primary"
          >
            Начать сканирование
          </button>
        </div>
        </>
        )}
      </main>
    </div>
  );
}
