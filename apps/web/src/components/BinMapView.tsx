import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Bin {
  id: string;
  qrCode: string;
  location: string;
  latitude?: number;
  longitude?: number;
  fullnessPercentage?: number;
  isFull: boolean;
  lastFullnessUpdate?: string;
  category: {
    name: string;
    icon: string;
    color: string;
  };
  area: {
    name: string;
  };
}

interface BinMapViewProps {
  bins: Bin[];
}

export default function BinMapView({ bins }: BinMapViewProps) {
  const [mapCenter, setMapCenter] = useState<L.LatLngExpression>([43.222, 76.851]); // Default to Almaty

  useEffect(() => {
    // Find first bin with coordinates to center map
    const binWithCoords = bins.find(b => b.latitude && b.longitude);
    if (binWithCoords && binWithCoords.latitude && binWithCoords.longitude) {
      setMapCenter([binWithCoords.latitude, binWithCoords.longitude]);
    }
  }, [bins]);

  const binsWithLocation = bins.filter(b => b.latitude && b.longitude);

  if (binsWithLocation.length === 0) {
    return (
      <div className="card p-8">
        <div className="text-center text-gray-500">
          <p className="text-lg mb-2">📍</p>
          <p>Нет контейнеров с координатами</p>
          <p className="text-sm mt-2">Добавьте координаты для контейнеров, чтобы увидеть их на карте</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Карта контейнеров</h3>
      <div className="h-[500px] rounded-lg border border-gray-300 overflow-hidden">
        <MapContainer
          center={mapCenter}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {binsWithLocation.map((bin) => (
            <Marker
              key={bin.id}
              position={[bin.latitude!, bin.longitude!]}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900 mb-1">{bin.qrCode}</div>
                  <div className="text-gray-600 mb-1">{bin.location}</div>
                  <div className="flex items-center gap-1 mb-1">
                    <span>{bin.category.icon}</span>
                    <span>{bin.category.name}</span>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">Заполненность:</span>{' '}
                    <span className={`${bin.isFull ? 'text-red-600' : 'text-green-600'}`}>
                      {bin.fullnessPercentage ?? 0}%
                    </span>
                  </div>
                  <div className="text-gray-500">{bin.area.name}</div>
                  {bin.lastFullnessUpdate && (
                    <div className="text-xs text-gray-400 mt-1">
                      Обновлено: {new Date(bin.lastFullnessUpdate).toLocaleString('ru-RU')}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
        <span>Всего контейнеров на карте: {binsWithLocation.length} из {bins.length}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Доступен</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>70%+</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Заполнен</span>
          </div>
        </div>
      </div>
    </div>
  );
}
