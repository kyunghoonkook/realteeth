import { useState, useCallback, useEffect } from 'react';
import { getCurrentPosition, type GeolocationPosition } from '@shared/lib';

interface UseGeolocationResult {
  position: GeolocationPosition | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useGeolocation(): UseGeolocationResult {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosition = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const pos = await getCurrentPosition();
      setPosition(pos);
    } catch (err) {
      setError(err instanceof Error ? err.message : '위치 정보를 가져올 수 없습니다.');
      // 기본 위치: 서울시청
      setPosition({
        latitude: 37.5665,
        longitude: 126.978,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  return {
    position,
    isLoading,
    error,
    refetch: fetchPosition,
  };
}
