import { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface Area {
  id: string;
  name: string;
  responsiblePerson?: {
    id: string;
    name: string;
    telegramId: string;
  };
  _count?: { bins: number };
}

export default function AreasPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Area | null>(null);
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    loadAreas();
  }, []);

  const loadAreas = async () => {
    try {
      const response = await api.get('/areas');
      // API interceptor unwraps response.data.data to just return the data
      setAreas(response || []);
    } catch (error) {
      console.error('Failed to load areas:', error);
      setAreas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.patch(`/areas/${editing.id}`, formData);
      } else {
        await api.post('/areas', formData);
      }
      closeModal();
      loadAreas();
    } catch (error) {
      console.error('Failed to save area:', error);
      alert('Не удалось сохранить район');
    }
  };

  const handleEdit = (area: Area) => {
    setEditing(area);
    setFormData({ name: area.name });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот район?')) return;
    try {
      await api.delete(`/areas/${id}`);
      loadAreas();
    } catch (error: any) {
      console.error('Failed to delete area:', error);
      alert(error.response?.data?.message || 'Невозможно удалить район с назначенными контейнерами');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({ name: '' });
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
          <h1 className="text-2xl font-bold text-gray-900">Районы</h1>
          <p className="text-gray-600">Управление географическими районами для сбора отходов</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          + Добавить район
        </button>
      </div>

      {/* Areas List */}
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Название района
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Ответственное лицо
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Контейнеры
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {areas?.map((area) => (
              <tr key={area.id} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">{area.name}</td>
                <td className="py-3 px-4">
                  {area.responsiblePerson ? (
                    <div>
                      <div className="font-medium text-gray-900">
                        {area.responsiblePerson.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {area.responsiblePerson.telegramId}
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-400">Not assigned</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {area._count?.bins || 0}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleEdit(area)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(area.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            {areas.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  Районы не найдены. Создайте свой первый район для начала работы.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editing ? 'Редактировать район' : 'Добавить район'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название района
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Downtown District"
                    required
                  />
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
