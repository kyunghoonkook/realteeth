import { useState, useCallback, useEffect } from 'react';
import { storage, type FavoriteLocation } from '@shared/lib';
import { smallModal } from '@shared/ui';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  useEffect(() => {
    setFavorites(storage.getFavorites());
  }, []);

  const addFavorite = useCallback(
    (location: Omit<FavoriteLocation, 'id' | 'createdAt'>) => {
      if (favorites.length >= 6) {
        smallModal.warning('즐겨찾기는 최대 6개까지 추가할 수 있습니다.');
        return false;
      }

      const isDuplicate = favorites.some(
        (fav) => fav.latitude === location.latitude && fav.longitude === location.longitude
      );

      if (isDuplicate) {
        smallModal.info('이미 즐겨찾기에 추가된 장소입니다.');
        return false;
      }

      const newFavorite = storage.addFavorite(location);
      if (newFavorite) {
        setFavorites((prev) => [...prev, newFavorite]);
        smallModal.success('즐겨찾기에 추가되었습니다.');
        return true;
      }
      return false;
    },
    [favorites]
  );

  const removeFavorite = useCallback((id: string) => {
    storage.removeFavorite(id);
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    smallModal.success('즐겨찾기에서 삭제되었습니다.');
  }, []);

  const updateAlias = useCallback((id: string, alias: string) => {
    storage.updateFavoriteAlias(id, alias);
    setFavorites((prev) =>
      prev.map((fav) => (fav.id === id ? { ...fav, alias } : fav))
    );
    smallModal.success('별칭이 수정되었습니다.');
  }, []);

  const isFavorite = useCallback(
    (latitude: number, longitude: number) => {
      return favorites.some(
        (fav) => fav.latitude === latitude && fav.longitude === longitude
      );
    },
    [favorites]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    updateAlias,
    isFavorite,
    canAddMore: favorites.length < 6,
  };
}
