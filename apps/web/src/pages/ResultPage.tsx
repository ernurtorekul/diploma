import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { classificationService } from '../services/classification.service';

interface ResultPageState {
  image: string;
  binId?: string;
}

interface ClassificationResult {
  category: string;
  confidence: number;
  description: string;
  pointsEarned: number;
  totalPoints: number;
  binColor: string;
  binIcon: string;
}

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ResultPageState;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ClassificationResult | null>(null);

  useEffect(() => {
    if (!state?.image) {
      navigate('/scan');
      return;
    }

    // Call actual classification API
    const classifyImage = async () => {
      try {
        const response = await classificationService.classify({
          imageUrl: state.image,
          binId: state.binId || '',
        });

        // The axios interceptor already unwraps response.data
        console.log('API Response:', response);

        setResult({
          category: response.category?.name || response.result || 'Неизвестно',
          confidence: response.confidence || 0,
          description: response.description || '',
          pointsEarned: response.pointsEarned || 0,
          totalPoints: response.totalPoints || 0,
          binColor: response.binColor || response.category?.color || '#10B981',
          binIcon: response.binIcon || response.category?.icon || '♻️',
        });
      } catch (error) {
        console.error('Classification failed:', error);
        setResult({
          category: 'Ошибка классификации',
          confidence: 0,
          description: 'Не удалось определить категорию отхода. Попробуйте еще раз.',
          pointsEarned: 0,
          totalPoints: 0,
          binColor: '#EF4444',
          binIcon: '❌',
        });
      } finally {
        setLoading(false);
      }
    };

    classifyImage();
  }, [state, navigate]);

  const handleAnotherScan = () => {
    navigate('/scan');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Анализ вашего отхода...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    navigate('/scan');
    return null;
  }

  const confidencePercentage = Math.round(result.confidence * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2">
          <span className="text-2xl">♻️</span>
          <h1 className="text-xl font-bold text-gray-900">Smart Waste</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Классификация завершена!
          </h2>
        </div>

        {/* Result Card */}
        <div className="card mb-6">
          {/* Image Preview */}
          <div className="mb-6">
            <img
              src={state.image}
              alt="Classified item"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Category */}
          <div className="text-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-lg"
              style={{ backgroundColor: result.binColor }}
            >
              <span className="text-2xl">{result.binIcon}</span>
              <span>{result.category}</span>
            </div>
          </div>

          {/* Confidence */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Точность</span>
              <span className="text-sm font-semibold text-gray-900">
                {confidencePercentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all"
                style={{ width: `${confidencePercentage}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">{result.description}</p>
          </div>

          {/* Points Earned */}
          <div className="flex items-center justify-center gap-3 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <span className="text-3xl">⭐</span>
            <div>
              <p className="text-sm text-gray-600">Вы заработали</p>
              <p className="text-2xl font-bold text-yellow-600">
                +{result.pointsEarned} Эко-очков
              </p>
            </div>
          </div>
        </div>

        {/* Total Points */}
        <div className="card mb-6 text-center">
          <p className="text-sm text-gray-600 mb-1">Ваши общие очки</p>
          <p className="text-4xl font-bold text-primary-600">
            {result.totalPoints}
          </p>
        </div>

        {/* Action Button */}
        <button onClick={handleAnotherScan} className="w-full btn-primary">
          Сканировать еще один отход
        </button>
      </main>
    </div>
  );
}
