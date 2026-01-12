import { formatTemperature, formatTime, getWeatherIconUrl } from '@shared/lib';
import type { HourlyForecast as HourlyForecastType } from '@entities/weather';

interface HourlyForecastProps {
  forecasts: HourlyForecastType[];
  timezone: number;
}

export function HourlyForecast({ forecasts, timezone }: HourlyForecastProps) {
  return (
    <div className="rounded-2xl bg-surface/50 backdrop-blur-md border border-white/10 p-4 md:p-6">
      <h3 className="text-white font-semibold mb-4">시간별 날씨</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {forecasts.map((forecast, index) => (
          <div
            key={forecast.time}
            className="flex flex-col items-center gap-2 min-w-[4.5rem] p-3 rounded-xl bg-white/5 border border-white/5"
          >
            <span className="text-xs text-gray-400">
              {index === 0 ? '지금' : formatTime(forecast.time, timezone)}
            </span>
            <img
              src={getWeatherIconUrl(forecast.weatherIcon)}
              alt={forecast.weatherDescription}
              className="w-10 h-10"
            />
            <span className="text-sm text-white font-medium">
              {formatTemperature(forecast.temperature)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
