import type { WeatherResponse, ForecastResponse } from '@shared/api';
import type { CurrentWeather, HourlyForecast, DailyForecast } from './types';

export const mapWeatherResponse = (data: WeatherResponse): CurrentWeather => ({
  temperature: data.main.temp,
  feelsLike: data.main.feels_like,
  tempMin: data.main.temp_min,
  tempMax: data.main.temp_max,
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  weatherId: data.weather[0]?.id ?? 800,
  weatherMain: data.weather[0]?.main ?? 'Clear',
  weatherDescription: data.weather[0]?.description ?? '맑음',
  weatherIcon: data.weather[0]?.icon ?? '01d',
  sunrise: data.sys.sunrise,
  sunset: data.sys.sunset,
  timezone: data.timezone,
  locationName: data.name,
});

export const mapForecastToHourly = (data: ForecastResponse): HourlyForecast[] => {
  return data.list.slice(0, 8).map((item) => ({
    time: item.dt,
    temperature: item.main.temp,
    weatherId: item.weather[0]?.id ?? 800,
    weatherIcon: item.weather[0]?.icon ?? '01d',
    weatherDescription: item.weather[0]?.description ?? '맑음',
  }));
};

export const mapForecastToDaily = (data: ForecastResponse): DailyForecast[] => {
  const dailyMap = new Map<string, DailyForecast>();

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    const existing = dailyMap.get(date);

    if (!existing) {
      dailyMap.set(date, {
        date: item.dt,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        weatherId: item.weather[0]?.id ?? 800,
        weatherIcon: item.weather[0]?.icon ?? '01d',
        weatherDescription: item.weather[0]?.description ?? '맑음',
      });
    } else {
      existing.tempMin = Math.min(existing.tempMin, item.main.temp_min);
      existing.tempMax = Math.max(existing.tempMax, item.main.temp_max);
    }
  });

  return Array.from(dailyMap.values()).slice(0, 5);
};
