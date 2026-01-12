export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  weatherId: number;
  weatherMain: string;
  weatherDescription: string;
  weatherIcon: string;
  sunrise: number;
  sunset: number;
  timezone: number;
  locationName: string;
}

export interface HourlyForecast {
  time: number;
  temperature: number;
  weatherId: number;
  weatherIcon: string;
  weatherDescription: string;
}

export interface DailyForecast {
  date: number;
  tempMin: number;
  tempMax: number;
  weatherId: number;
  weatherIcon: string;
  weatherDescription: string;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}
