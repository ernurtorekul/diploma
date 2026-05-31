import { useState, useEffect } from 'react';
import { api } from '../../services/api';

interface BinCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
  _count?: { bins: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<BinCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BinCategory | null>(null);
  const [formData, setFormData] = useState({ name: '', color: '#10B981', icon: '♻️' });

  const predefinedColors = [
    '#10B981', '#6B7280', '#84CC16', '#3B82F6', '#F59E0B',
    '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'
  ];

  const predefinedIcons = ['♻️', '🗑️', '🌱', '🍾', '📄', '🧴', '📦', '🔋', '💊', '🧪'];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await api.get('/bin-categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.patch(`/bin-categories/${editing.id}`, formData);
      } else {
        await api.post('/bin-categories', formData);
      }
      closeModal();
      loadCategories();
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Не удалось сохранить категорию');
    }
  };

  const handleEdit = (category: BinCategory) => {
    setEditing(category);
    setFormData({ name: category.name, color: category.color, icon: category.icon });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту категорию?')) return;
    try {
      await api.delete(`/bin-categories/${id}`);
      loadCategories();
    } catch (error: any) {
      console.error('Failed to delete category:', error);
      alert(error.response?.data?.message || 'Невозможно удалить категорию с назначенными контейнерами');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setFormData({ name: '', color: '#10B981', icon: '♻️' });
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
          <h1 className="text-2xl font-bold text-gray-900">Категории контейнеров</h1>
          <p className="text-gray-600">Управление категориями контейнеров для отходов</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary"
        >
          + Добавить категорию
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category._count?.bins || 0} контейнеров</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-gray-400 hover:text-primary-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Цвет:</span>
                <div
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-xs text-gray-500">{category.color}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editing ? 'Редактировать категорию' : 'Добавить категорию'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Иконка
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {predefinedIcons.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`p-2 text-2xl rounded-lg border-2 transition-colors ${
                          formData.icon === icon
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Цвет
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {predefinedColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-10 h-10 rounded-lg border-2 transition-colors ${
                          formData.color === color
                            ? 'border-gray-900 scale-110'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
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
