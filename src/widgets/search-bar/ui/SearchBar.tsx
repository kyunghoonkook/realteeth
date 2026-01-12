import { useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { Input } from '@shared/ui';
import { useLocationSearch } from '@features/search-location';
import type { SearchResult } from '@entities/location';

interface SearchBarProps {
  onSelect: (result: SearchResult) => void;
}

export function SearchBar({ onSelect }: SearchBarProps) {
  const { query, results, isOpen, setQuery, clearQuery, closeResults } = useLocationSearch();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeResults();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeResults]);

  const handleSelect = (result: SearchResult) => {
    onSelect(result);
    clearQuery();
  };

  const formatDisplay = (result: SearchResult) => {
    const { city, district, neighborhood } = result.parts;
    if (neighborhood) return `${neighborhood}, ${district}, ${city}`;
    if (district) return `${district}, ${city}`;
    return city;
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="도시, 구, 동 검색..."
        leftIcon={<Search size={20} />}
        rightIcon={
          query ? (
            <button
              onClick={clearQuery}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="검색어 지우기"
            >
              <X size={16} />
            </button>
          ) : null
        }
      />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 max-h-80 overflow-y-auto bg-surface border border-white/10 rounded-xl shadow-xl z-50 animate-fade-in">
          {results.map((result, index) => (
            <button
              key={`${result.address}-${index}`}
              onClick={() => handleSelect(result)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
            >
              <MapPin size={18} className="text-primary-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-white font-medium truncate">{formatDisplay(result)}</p>
                <p className="text-sm text-gray-400 truncate">{result.address.replace(/-/g, ' ')}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-surface border border-white/10 rounded-xl shadow-xl z-50 animate-fade-in">
          <p className="text-gray-400 text-center">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
