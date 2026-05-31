import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ScanPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const binId = searchParams.get('binId');

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [capturedImage, setCapturedImage] = useState<string>('');

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Не удается получить доступ к камере. Пожалуйста, предоставьте разрешения на использование камеры.');
      console.error('Camera error:', err);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage('');
  };

  const proceedToClassification = () => {
    // In a real app, upload image and get classification
    navigate('/result', {
      state: {
        image: capturedImage,
        binId: binId || undefined,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            <h1 className="text-xl font-bold text-gray-900">Smart Waste</h1>
          </div>
          <button
            onClick={() => navigate('/leaderboard')}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Таблица лидеров
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Сканируйте ваш отход
          </h2>
          <p className="text-gray-600">
            Сделайте фото вашего отхода для классификации с помощью ИИ
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Camera View */}
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured waste item"
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          )}

          {/* Capture Button Overlay */}
          {!capturedImage && (
            <div className="absolute bottom-8 left-0 right-0 flex justify-center">
              <button
                onClick={captureImage}
                className="w-20 h-20 bg-white rounded-full border-4 border-primary-500 hover:bg-primary-50 transition-colors shadow-lg flex items-center justify-center"
              >
                <div className="w-16 h-16 bg-primary-500 rounded-full" />
              </button>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* Action Buttons */}
        {capturedImage && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={retakePhoto}
              className="flex-1 btn-secondary"
            >
              Переснять фото
            </button>
            <button
              onClick={proceedToClassification}
              className="flex-1 btn-primary"
            >
              Классифицировать
            </button>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 card">
          <h3 className="font-semibold text-gray-900 mb-2">Как это работает</h3>
          <ol className="text-sm text-gray-600 space-y-2">
            <li>1. Направьте камеру на отход</li>
            <li>2. Сделайте четкое фото</li>
            <li>3. Наш ИИ определит правильный способ утилизации</li>
            <li>4. Получайте экоточки за правильную утилизацию!</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
