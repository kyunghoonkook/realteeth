import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { CurrentWeatherDisplay, HourlyForecast, DailyForecast } from '@widgets/weather-display';
import { useWeatherQuery } from '@features/get-weather';
import { useFavorites } from '@features/manage-favorites';
import { Spinner, Button } from '@shared/ui';

export function DetailPage() {
  const { lat, lon } = useParams<{ lat: string; lon: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { name?: string } | null;

  const latitude = parseFloat(lat || '0');
  const longitude = parseFloat(lon || '0');
  const locationName = locationState?.name || '선택한 위치';

  const { addFavorite, isFavorite, canAddMore } = useFavorites();

  const {
    data: weatherData,
    isLoading,
    isError,
  } = useWeatherQuery({
    latitude,
    longitude,
    enabled: latitude !== 0 && longitude !== 0,
  });

  const isLocationFavorite = isFavorite(latitude, longitude);

  const handleAddFavorite = () => {
    addFavorite({
      name: locationName,
      alias: locationName,
      latitude,
      longitude,
    });
  };

  return (
    <div className="min-h-screen bg-surface-dark">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-surface-dark via-surface to-primary-900/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>뒤로가기</span>
            </button>

            {!isLocationFavorite && canAddMore && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAddFavorite}
                leftIcon={<Star size={16} />}
              >
                즐겨찾기 추가
              </Button>
            )}

            {isLocationFavorite && (
              <span className="flex items-center gap-2 text-accent-warm">
                <Star size={16} fill="currentColor" />
                <span className="text-sm">즐겨찾기됨</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-white">{locationName}</h1>
        </header>

        {/* Main content */}
        <main className="space-y-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Spinner size="lg" />
              <p className="mt-4 text-gray-400">날씨 정보를 불러오는 중...</p>
            </div>
          )}

          {isError && !isLoading && (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg mb-4">해당 장소의 정보가 제공되지 않습니다.</p>
              <Button variant="secondary" onClick={() => navigate('/')}>
                홈으로 돌아가기
              </Button>
            </div>
          )}

          {weatherData && !isLoading && (
            <>
              {/* Current weather */}
              <CurrentWeatherDisplay
                weather={weatherData.current}
                locationName={locationName}
              />

              {/* Hourly forecast */}
              <HourlyForecast
                forecasts={weatherData.hourly}
                timezone={weatherData.current.timezone}
              />

              {/* Daily forecast */}
              <DailyForecast forecasts={weatherData.daily} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
