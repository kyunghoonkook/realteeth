import { useState, useMemo, useCallback } from 'react';
import koreaDistricts from '@shared/data/korea_districts.json';
import type { SearchResult } from '@entities/location';

const parseAddress = (address: string): SearchResult => {
  const parts = address.split('-');
  return {
    address,
    parts: {
      city: parts[0] || '',
      district: parts[1],
      neighborhood: parts[2],
    },
  };
};

const allLocations: SearchResult[] = koreaDistricts.map(parseAddress);

export function useLocationSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.trim().toLowerCase();
    const filtered = allLocations.filter((location) => {
      const { city, district, neighborhood } = location.parts;
      return (
        city.toLowerCase().includes(searchTerm) ||
        district?.toLowerCase().includes(searchTerm) ||
        neighborhood?.toLowerCase().includes(searchTerm)
      );
    });

    return filtered.slice(0, 20);
  }, [query]);

  const handleQueryChange = useCallback((value: string) => {
    setQuery(value);
    setIsOpen(true);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
    setIsOpen(false);
  }, []);

  const closeResults = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    query,
    results,
    isOpen,
    setQuery: handleQueryChange,
    clearQuery,
    closeResults,
  };
}
