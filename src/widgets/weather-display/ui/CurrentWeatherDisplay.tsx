import { Cloud, Droplets, Wind, Sunrise, Sunset } from 'lucide-react';
import { formatTemperature, formatTime, getWeatherIconUrl } from '@shared/lib';
import type { CurrentWeather } from '@entities/weather';

interface CurrentWeatherDisplayProps {
  weather: CurrentWeather;
  locationName: string;
}

export function CurrentWeatherDisplay({ weather, locationName }: CurrentWeatherDisplayProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600/30 to-primary-900/30 backdrop-blur-md border border-white/10 p-6 md:p-8">
      {/* Background decoration */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-cool/20 rounded-full blur-2xl" />

      <div className="relative z-10">
        {/* Location */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-gray-300 text-lg">{locationName}</span>
        </div>

        {/* Main temperature */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-7xl md:text-8xl font-light text-white tracking-tighter">
              {formatTemperature(weather.temperature)}
            </p>
            <p className="text-xl text-gray-300 mt-2 capitalize">{weather.weatherDescription}</p>
          </div>
          <img
            src={getWeatherIconUrl(weather.weatherIcon)}
            alt={weather.weatherDescription}
            className="w-24 h-24 md:w-32 md:h-32"
          />
        </div>

        {/* Min/Max temperature */}
        <div className="flex items-center gap-4 text-gray-300 mb-6">
          <span>최고 {formatTemperature(weather.tempMax)}</span>
          <span className="w-1 h-1 bg-gray-500 rounded-full" />
          <span>최저 {formatTemperature(weather.tempMin)}</span>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DetailCard
            icon={<Cloud size={20} />}
            label="체감 온도"
            value={formatTemperature(weather.feelsLike)}
          />
          <DetailCard
            icon={<Droplets size={20} />}
            label="습도"
            value={`${weather.humidity}%`}
          />
          <DetailCard
            icon={<Wind size={20} />}
            label="바람"
            value={`${weather.windSpeed}m/s`}
          />
          <DetailCard
            icon={<Sunrise size={20} />}
            label="일출/일몰"
            value={
              <div className="flex flex-col text-xs">
                <span>{formatTime(weather.sunrise, weather.timezone)}</span>
                <span>{formatTime(weather.sunset, weather.timezone)}</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

interface DetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function DetailCard({ icon, label, value }: DetailCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
      <div className="text-primary-400">{icon}</div>
      <div>
        <span className="text-xs text-gray-400 block">{label}</span>
        <span className="text-sm text-white font-medium block">{value}</span>
      </div>
    </div>
  );
}
