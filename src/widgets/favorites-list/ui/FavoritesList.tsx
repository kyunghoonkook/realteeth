import { Star, Plus } from 'lucide-react';
import { FavoriteCard } from '@widgets/favorite-card';
import type { FavoriteLocation } from '@shared/lib';

interface FavoritesListProps {
  favorites: FavoriteLocation[];
  onUpdateAlias: (id: string, alias: string) => void;
  onRemove: (id: string) => void;
  canAddMore: boolean;
}

export function FavoritesList({
  favorites,
  onUpdateAlias,
  onRemove,
  canAddMore,
}: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <div className="rounded-2xl bg-surface/50 backdrop-blur-md border border-white/10 p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Star size={28} className="text-gray-500" />
          </div>
          <h3 className="text-white font-medium mb-2">즐겨찾기가 비어있습니다</h3>
          <p className="text-sm text-gray-400 max-w-xs">
            자주 확인하는 장소를 검색해서 즐겨찾기에 추가해보세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <Star size={18} className="text-accent-warm" />
          즐겨찾기
        </h2>
        <span className="text-sm text-gray-400">
          {favorites.length}/6
          {canAddMore && (
            <span className="ml-2 text-primary-400">
              <Plus size={14} className="inline" /> 추가 가능
            </span>
          )}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((favorite) => (
          <FavoriteCard
            key={favorite.id}
            favorite={favorite}
            onUpdateAlias={onUpdateAlias}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
