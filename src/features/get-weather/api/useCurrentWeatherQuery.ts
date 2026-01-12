import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '@shared/api';
import { mapWeatherResponse, type CurrentWeather } from '@entities/weather';

interface UseCurrentWeatherQueryParams {
  latitude: number;
  longitude: number;
  enabled?: boolean;
}

export function useCurrentWeatherQuery({
  latitude,
  longitude,
  enabled = true,
}: UseCurrentWeatherQueryParams) {
  return useQuery<CurrentWeather>({
    queryKey: ['current-weather', latitude, longitude],
    queryFn: async () => {
      const data = await weatherApi.getCurrentWeather(latitude, longitude);
      return mapWeatherResponse(data);
    },
    enabled: enabled && !!latitude && !!longitude,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
