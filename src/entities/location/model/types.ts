export interface Location {
  id: string;
  name: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
}

export interface SearchResult {
  address: string;
  parts: {
    city: string;
    district?: string;
    neighborhood?: string;
  };
}

export interface FavoriteLocation extends Location {
  alias: string;
  createdAt: number;
}
