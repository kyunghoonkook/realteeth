export const ENV = {
  OPENWEATHER_API_KEY: import.meta.env.VITE_OPENWEATHER_API_KEY || '',
  OPENWEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
} as const;
