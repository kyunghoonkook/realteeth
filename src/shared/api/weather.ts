import { ENV } from '@shared/config';

const API_KEY = ENV.OPENWEATHER_API_KEY;
const BASE_URL = ENV.OPENWEATHER_BASE_URL;

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  timezone: number;
  name: string;
}

export interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
  city: {
    name: string;
    timezone: number;
  };
}

export interface GeocodingResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const weatherApi = {
  getCurrentWeather: async (lat: number, lon: number): Promise<WeatherResponse> => {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    );
    
    if (!response.ok) {
      throw new Error('날씨 정보를 가져오는데 실패했습니다.');
    }
    
    return response.json();
  },

  getForecast: async (lat: number, lon: number): Promise<ForecastResponse> => {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    );
    
    if (!response.ok) {
      throw new Error('예보 정보를 가져오는데 실패했습니다.');
    }
    
    return response.json();
  },

  getCoordinates: async (cityName: string): Promise<GeocodingResponse[]> => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)},KR&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('위치 정보를 가져오는데 실패했습니다.');
    }
    
    return response.json();
  },
};
