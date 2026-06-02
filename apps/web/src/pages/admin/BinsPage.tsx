import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import MapPicker from '../../components/MapPicker';
import BinMapView from '../../components/BinMapView';

interface Bin {
  id: string;
  qrCode: string;
  location: string;
  latitude?: number;
  longitude?: number;
  isFull: boolean;
  fullnessPercentage?: number;
  fullnessThreshold?: number;
  lastFullnessUpdate?: string;
  area: { id: string; name: string };
  category: { id: string; name: string; color: string; icon: string };
  _count?: { classifications: number };
}

interface Area {
  id: string;
  name: string;
}

interface BinCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export default function BinsPage() {
  const [bins, setBins] = useState<Bin[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [categories, setCategories] = useState<BinCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'map'>('table');
  const [editing, setEditing] = useState<Bin | null>(null);
  const [formData, setFormData] = useState({
    qrCode: '',
    location: '',
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
    areaId: '',
    categoryIds: [] as string[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [binsRes, areasRes, categoriesRes] = await Promise.all([
        api.get('/bins'),
        api.get('/areas'),
        api.get('/bin-categories'),
      ]);
      // API interceptor unwraps response.data.data to just return the data
      setBins(binsRes || []);
      setAreas(areasRes || []);
      setCategories(categoriesRes || []);
    } catch (error) {
      console.error('Failed to load bins:', error);
      setBins([]);
      setAreas([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        // Editing single bin - use first category
        await api.patch(`/bins/${editing.id}`, {
          ...formData,
          categoryId: formData.categoryIds[0],
        });
      } else {
        // Creating new bins - one for each selected category
        const baseQrCode = formData.qrCode || 'BIN';
        const promises = formData.categoryIds.map((categoryId, index) => {
          const qrCode = formData.categoryIds.length > 1
            ? `${baseQrCode}-${index + 1}`
            : baseQrCode;

          return api.post('/bins', {
            qrCode,
            location: formData.location,
            latitude: formData.latitude,
            longitude: formData.longitude,
            areaId: formData.areaId,
            categoryId,
          });
        });

        await Promise.all(promises);
      }
      closeModal();
      loadData();
    } catch (error) {
      console.error('Failed to save bin(s):', error);
      alert('Не удалось сохранить контейнер(ы)');
    }
  };

  const handleEdit = (bin: Bin) => {
    setEditing(bin);
    setFormData({
      qrCode: bin.qrCode,
      location: bin.location,
      latitude: bin.latitude,
      longitude: bin.longitude,
      areaId: bin.area.id,
      categoryIds: [bin.category.id],
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот контейнер?')) return;

    const bin = bins.find(b => b.id === id);
    const hasClassifications = bin && bin._count && bin._count.classifications > 0;

    if (hasClassifications) {
      if (!confirm('Этот контейнер имеет связанные классификации. Они также будут удалены. Продолжить?')) {
        return;
      }
    }

    try {
      await api.delete(`/bins/${id}`);
      loadData();
    } catch (error: any) {
      console.error('Failed to delete bin:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Не удалось удалить контейнер';
      alert(errorMessage);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({
      qrCode: '',
      location: '',
      latitude: undefined,
      longitude: undefined,
      areaId: '',
      categoryIds: [],
    });
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
          <h1 className="text-2xl font-bold text-gray-900">Контейнеры</h1>
          <p className="text-gray-600">Управление контейнерами для отходов и их расположением</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Таблица
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'map'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📍 Карта
            </button>
          </div>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            + Добавить контейнер
          </button>
        </div>
      </div>

      {/* Bins Display */}
      {viewMode === 'map' ? (
        <BinMapView bins={bins} />
      ) : (
        <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                QR-код
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                ID контейнера
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Расположение
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Категория
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Район
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Заполненность
              </th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">
                Классификации
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {bins?.map((bin) => (
              <tr key={bin.id} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <code className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {bin.qrCode}
                  </code>
                </td>
                <td className="py-3 px-4">
                  <code className="px-2 py-1 bg-blue-50 rounded text-xs text-blue-700 select-all">
                    {bin.id}
                  </code>
                </td>
                <td className="py-3 px-4 font-medium text-gray-900">
                  {bin.location}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: bin.category.color + '20' }}
                    >
                      {bin.category.icon}
                    </span>
                    <span>{bin.category.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {bin.area.name}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 w-24 overflow-hidden">
                        <div
                          className={`h-2.5 rounded-full transition-colors ${
                            bin.isFull
                              ? 'bg-red-500'
                              : bin.fullnessPercentage && bin.fullnessPercentage >= 70
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                          }`}
                          style={{ width: `${bin.fullnessPercentage || 0}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {bin.fullnessPercentage ?? 0}%
                      </span>
                    </div>
                    {bin.lastFullnessUpdate && (
                      <span className="text-xs text-gray-500">
                        {new Date(bin.lastFullnessUpdate).toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                    {bin.isFull && (
                      <span className="text-xs text-red-600 font-medium">Заполнен</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {bin._count?.classifications || 0}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleEdit(bin)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(bin.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            {bins.length === 0 && (
              <tr>
                <td colSpan={8} className="py-8 text-center text-gray-500">
                  Контейнеры не найдены. Создайте свой первый контейнер для начала работы.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editing ? 'Редактировать контейнер' : 'Добавить контейнер'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Базовый QR-код {editing ? '' : '(автоматически добавляется суффикс при выборе нескольких категорий)'}
                  </label>
                  <input
                    type="text"
                    value={formData.qrCode}
                    onChange={(e) => setFormData({ ...formData, qrCode: e.target.value })}
                    className="input-field"
                    placeholder={editing ? 'e.g., BIN-ALM-005' : 'e.g., BIN-PARK-01'}
                    required
                  />
                  {formData.categoryIds.length > 1 && !editing && (
                    <p className="text-xs text-gray-500 mt-1">
                      Будет создано: {formData.qrCode || 'BIN'}-1, {formData.qrCode || 'BIN'}-2 и т.д.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Расположение
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Central Park, North Entrance"
                    required
                  />
                </div>

                <MapPicker
                  latitude={formData.latitude}
                  longitude={formData.longitude}
                  onLocationSelect={(lat, lng) =>
                    setFormData({ ...formData, latitude: lat, longitude: lng })
                  }
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Район
                  </label>
                  <select
                    value={formData.areaId}
                    onChange={(e) => setFormData({ ...formData, areaId: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Выберите район</option>
                    {areas?.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {editing ? 'Категория' : 'Категории (выберите все применимые)'}
                  </label>
                  <div className="space-y-2">
                    {categories?.map((category) => (
                      <label key={category.id} className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.categoryIds.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                categoryIds: [...formData.categoryIds, category.id],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                categoryIds: formData.categoryIds.filter((id) => id !== category.id),
                              });
                            }
                          }}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                          required={formData.categoryIds.length === 0 && !editing}
                        />
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: category.color + '20' }}
                        >
                          {category.icon}
                        </span>
                        <span className="font-medium">{category.name}</span>
                      </label>
                    ))}
                  </div>
                  {formData.categoryIds.length > 1 && (
                    <p className="text-sm text-primary-600 mt-2">
                      📦 {formData.categoryIds.length} контейнеров будет создано в этом месте
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="submit" className="flex-1 btn-primary">
                  {editing ? 'Обновить' : 'Создать'}
                </button>
                <button type="button" onClick={closeModal} className="flex-1 btn-secondary">
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
