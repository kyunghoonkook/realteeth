import { useQuery } from '@tanstack/react-query';
import { weatherApi } from '@shared/api';
import {
  mapWeatherResponse,
  mapForecastToHourly,
  mapForecastToDaily,
  type WeatherData,
} from '@entities/weather';

interface UseWeatherQueryParams {
  latitude: number;
  longitude: number;
  enabled?: boolean;
}

export function useWeatherQuery({ latitude, longitude, enabled = true }: UseWeatherQueryParams) {
  return useQuery<WeatherData>({
    queryKey: ['weather', latitude, longitude],
    queryFn: async () => {
      const [currentWeather, forecast] = await Promise.all([
        weatherApi.getCurrentWeather(latitude, longitude),
        weatherApi.getForecast(latitude, longitude),
      ]);

      return {
        current: mapWeatherResponse(currentWeather),
        hourly: mapForecastToHourly(forecast),
        daily: mapForecastToDaily(forecast),
      };
    },
    enabled: enabled && !!latitude && !!longitude,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
