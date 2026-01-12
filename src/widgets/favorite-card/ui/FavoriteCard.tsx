import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Pencil, Trash2, Check, X } from 'lucide-react';
import { formatTemperature, getWeatherIconUrl } from '@shared/lib';
import { useCurrentWeatherQuery } from '@features/get-weather';
import { Spinner, Input } from '@shared/ui';
import type { FavoriteLocation } from '@shared/lib';

interface FavoriteCardProps {
  favorite: FavoriteLocation;
  onUpdateAlias: (id: string, alias: string) => void;
  onRemove: (id: string) => void;
}

export function FavoriteCard({ favorite, onUpdateAlias, onRemove }: FavoriteCardProps) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editAlias, setEditAlias] = useState(favorite.alias);

  const { data: weather, isLoading, isError } = useCurrentWeatherQuery({
    latitude: favorite.latitude,
    longitude: favorite.longitude,
  });

  const handleClick = () => {
    if (!isEditing) {
      navigate(`/detail/${favorite.latitude}/${favorite.longitude}`, {
        state: { name: favorite.alias || favorite.name },
      });
    }
  };

  const handleSaveAlias = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateAlias(favorite.id, editAlias);
    setIsEditing(false);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditAlias(favorite.alias);
    setIsEditing(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(favorite.id);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface to-surface-light border border-white/10 p-4 cursor-pointer hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10"
    >
      {/* Location name / Edit mode */}
      {isEditing ? (
        <div className="flex items-center gap-2 mb-3 pr-8" onClick={(e) => e.stopPropagation()}>
          <Input
            value={editAlias}
            onChange={(e) => setEditAlias(e.target.value)}
            className="text-sm py-1.5 flex-1"
            autoFocus
          />
          <div className="flex gap-1 flex-shrink-0">
            <button
              onClick={handleSaveAlias}
              className="p-1.5 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
          {/* Star icon */}
          <div className="absolute top-3 right-3 text-accent-warm">
            <Star size={16} fill="currentColor" />
          </div>
        </div>
      ) : (
        <>
          {/* Star icon */}
          <div className="absolute top-3 right-3 text-accent-warm">
            <Star size={16} fill="currentColor" />
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEditClick}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
              aria-label="별칭 수정"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={handleRemove}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-red-500/50 text-gray-300 hover:text-white transition-colors"
              aria-label="삭제"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <h3 className="text-white font-medium mb-3 truncate pr-16">
            {favorite.alias || favorite.name}
          </h3>
        </>
      )}

      {/* Weather info */}
      {isLoading && (
        <div className="flex justify-center py-4">
          <Spinner size="sm" />
        </div>
      )}

      {isError && (
        <p className="text-sm text-red-400 py-4">해당 장소의 정보가 제공되지 않습니다.</p>
      )}

      {weather && !isLoading && (
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-light text-white">
              {formatTemperature(weather.temperature)}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {formatTemperature(weather.tempMax)} / {formatTemperature(weather.tempMin)}
            </p>
          </div>
          <img
            src={getWeatherIconUrl(weather.weatherIcon)}
            alt={weather.weatherDescription}
            className="w-16 h-16"
          />
        </div>
      )}
    </div>
  );
}
