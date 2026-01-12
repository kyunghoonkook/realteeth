import { formatTemperature, formatDate, getWeatherIconUrl } from '@shared/lib';
import type { DailyForecast as DailyForecastType } from '@entities/weather';

interface DailyForecastProps {
  forecasts: DailyForecastType[];
}

export function DailyForecast({ forecasts }: DailyForecastProps) {
  return (
    <div className="rounded-2xl bg-surface/50 backdrop-blur-md border border-white/10 p-4 md:p-6">
      <h3 className="text-white font-semibold mb-4">5일 예보</h3>
      <div className="space-y-3">
        {forecasts.map((forecast, index) => (
          <div
            key={forecast.date}
            className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
          >
            <div className="flex items-center gap-3 min-w-[140px]">
              <span className="text-sm text-gray-300 w-24">
                {index === 0 ? '오늘' : formatDate(forecast.date)}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <img
                src={getWeatherIconUrl(forecast.weatherIcon)}
                alt={forecast.weatherDescription}
                className="w-8 h-8"
              />
              <span className="text-xs text-gray-400 w-16 hidden md:block whitespace-nowrap overflow-hidden text-ellipsis">
                {forecast.weatherDescription}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-primary-300">
                {formatTemperature(forecast.tempMax)}
              </span>
              <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden hidden md:block">
                <div
                  className="h-full bg-gradient-to-r from-primary-400 to-accent-warm rounded-full"
                  style={{
                    width: `${((forecast.tempMax - forecast.tempMin) / 30) * 100}%`,
                    marginLeft: `${((forecast.tempMin + 10) / 50) * 100}%`,
                  }}
                />
              </div>
              <span className="text-sm text-gray-400">
                {formatTemperature(forecast.tempMin)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
