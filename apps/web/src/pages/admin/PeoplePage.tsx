import { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface ResponsiblePerson {
  id: string;
  name: string;
  telegramId: string;
  areaId: string;
  area?: {
    id: string;
    name: string;
  };
}

export default function PeoplePage() {
  const [people, setPeople] = useState<ResponsiblePerson[]>([]);
  const [areas, setAreas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ResponsiblePerson | null>(null);
  const [formData, setFormData] = useState({ name: '', telegramId: '', areaId: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [peopleRes, areasRes] = await Promise.all([
        api.get('/responsible-persons'),
        api.get('/areas'),
      ]);
      setPeople(peopleRes.data);
      setAreas(areasRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.patch(`/responsible-persons/${editing.id}`, formData);
      } else {
        await api.post('/responsible-persons', formData);
      }
      closeModal();
      loadData();
    } catch (error) {
      console.error('Failed to save person:', error);
      alert('Не удалось сохранить ответственное лицо');
    }
  };

  const handleEdit = (person: ResponsiblePerson) => {
    setEditing(person);
    setFormData({ name: person.name, telegramId: person.telegramId, areaId: person.areaId });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этого человека?')) return;
    try {
      await api.delete(`/responsible-persons/${id}`);
      loadData();
    } catch (error) {
      console.error('Failed to delete person:', error);
      alert('Не удалось удалить ответственное лицо');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({ name: '', telegramId: '', areaId: '' });
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
          <h1 className="text-2xl font-bold text-gray-900">Ответственные лица</h1>
          <p className="text-gray-600">Управление персоналом, отвечающим за сбор отходов</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          + Добавить человека
        </button>
      </div>

      {/* People List */}
      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Имя
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Telegram ID
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                Назначенный район
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-gray-900">{person.name}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                    {person.telegramId}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {person.area ? (
                    <span className="text-gray-900">{person.area.name}</span>
                  ) : (
                    <span className="text-gray-400">Not assigned</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleEdit(person)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(person.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            {people.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  Ответственные лица не найдены. Добавьте первого человека для начала работы.
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
            <h2 className="text-xl font-bold mb-4">
              {editing ? 'Редактировать человека' : 'Добавить человека'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Полное имя
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Aibek Smailov"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telegram ID
                  </label>
                  <input
                    type="text"
                    value={formData.telegramId}
                    onChange={(e) => setFormData({ ...formData, telegramId: e.target.value })}
                    className="input-field"
                    placeholder="e.g., @username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Назначенный район
                  </label>
                  <select
                    value={formData.areaId}
                    onChange={(e) => setFormData({ ...formData, areaId: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Выберите район</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
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
