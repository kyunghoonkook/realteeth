const STORAGE_KEYS = {
  FAVORITES: 'weather-app-favorites',
} as const;

export interface FavoriteLocation {
  id: string;
  name: string;
  alias: string;
  latitude: number;
  longitude: number;
  createdAt: number;
}

export const storage = {
  getFavorites: (): FavoriteLocation[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  setFavorites: (favorites: FavoriteLocation[]): void => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  },

  addFavorite: (location: Omit<FavoriteLocation, 'id' | 'createdAt'>): FavoriteLocation | null => {
    const favorites = storage.getFavorites();
    
    if (favorites.length >= 6) {
      return null;
    }

    const isDuplicate = favorites.some(
      (fav) => fav.latitude === location.latitude && fav.longitude === location.longitude
    );

    if (isDuplicate) {
      return null;
    }

    const newFavorite: FavoriteLocation = {
      ...location,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };

    storage.setFavorites([...favorites, newFavorite]);
    return newFavorite;
  },

  removeFavorite: (id: string): void => {
    const favorites = storage.getFavorites();
    storage.setFavorites(favorites.filter((fav) => fav.id !== id));
  },

  updateFavoriteAlias: (id: string, alias: string): void => {
    const favorites = storage.getFavorites();
    const updated = favorites.map((fav) =>
      fav.id === id ? { ...fav, alias } : fav
    );
    storage.setFavorites(updated);
  },
};
