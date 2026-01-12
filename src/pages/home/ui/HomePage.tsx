import { useState } from 'react';
import { MapPin, Navigation, Star } from 'lucide-react';
import { SearchBar } from '@widgets/search-bar';
import { CurrentWeatherDisplay, HourlyForecast, DailyForecast } from '@widgets/weather-display';
import { FavoritesList } from '@widgets/favorites-list';
import { useGeolocation } from '@features/get-location';
import { useWeatherQuery } from '@features/get-weather';
import { useFavorites } from '@features/manage-favorites';
import { weatherApi } from '@shared/api';
import { Spinner, Button, smallModal } from '@shared/ui';
import { findCoordinates } from '@shared/data/coordinates';
import type { SearchResult } from '@entities/location';

export function HomePage() {
  const { position, isLoading: isLocationLoading, error: locationError } = useGeolocation();
  const { favorites, addFavorite, removeFavorite, updateAlias, canAddMore, isFavorite } = useFavorites();

  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lon: number;
    name: string;
  } | null>(null);

  const currentLat = selectedLocation?.lat ?? position?.latitude ?? 0;
  const currentLon = selectedLocation?.lon ?? position?.longitude ?? 0;
  const currentName = selectedLocation?.name ?? '현재 위치';

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
  } = useWeatherQuery({
    latitude: currentLat,
    longitude: currentLon,
    enabled: currentLat !== 0 && currentLon !== 0,
  });

  const handleSearchSelect = async (result: SearchResult) => {
    const displayName = result.parts.neighborhood || result.parts.district || result.parts.city;
    
    // 먼저 로컬 좌표 데이터에서 찾기
    const localCoords = findCoordinates(result.parts.city, result.parts.district);
    
    if (localCoords) {
      setSelectedLocation({
        lat: localCoords.lat,
        lon: localCoords.lon,
        name: displayName,
      });
      return;
    }

    // 로컬에 없으면 API 호출
    try {
      const searchQuery = result.parts.city + (result.parts.district ? ' ' + result.parts.district : '');
      const coords = await weatherApi.getCoordinates(searchQuery);

      if (coords && coords.length > 0) {
        setSelectedLocation({
          lat: coords[0].lat,
          lon: coords[0].lon,
          name: displayName,
        });
      } else {
        smallModal.error('해당 장소의 정보가 제공되지 않습니다.');
      }
    } catch {
      smallModal.error('위치 정보를 가져오는데 실패했습니다.');
    }
  };

  const handleAddFavorite = () => {
    if (!selectedLocation) {
      smallModal.info('먼저 장소를 검색해주세요.');
      return;
    }

    addFavorite({
      name: selectedLocation.name,
      alias: selectedLocation.name,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lon,
    });
  };

  const handleUseCurrentLocation = () => {
    setSelectedLocation(null);
  };

  const isLoading = isLocationLoading || isWeatherLoading;
  const isCurrentLocationFavorite = selectedLocation
    ? isFavorite(selectedLocation.lat, selectedLocation.lon)
    : false;

  return (
    <div className="min-h-screen bg-surface-dark">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-surface-dark via-surface to-primary-900/20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6 md:py-10">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
            날씨
          </h1>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar onSelect={handleSearchSelect} />
            </div>

            {selectedLocation && (
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleUseCurrentLocation}
                  leftIcon={<Navigation size={18} />}
                >
                  현재 위치
                </Button>
                {!isCurrentLocationFavorite && canAddMore && (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleAddFavorite}
                    leftIcon={<Star size={18} />}
                  >
                    즐겨찾기
                  </Button>
                )}
              </div>
            )}
          </div>

          {locationError && !selectedLocation && (
            <p className="mt-2 text-sm text-amber-400 flex items-center gap-2">
              <MapPin size={16} />
              {locationError} (서울시청 기준으로 표시)
            </p>
          )}
        </header>

        {/* Main content */}
        <main className="space-y-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Spinner size="lg" />
              <p className="mt-4 text-gray-400">날씨 정보를 불러오는 중...</p>
            </div>
          )}

          {isWeatherError && !isLoading && (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg mb-2">해당 장소의 정보가 제공되지 않습니다.</p>
              <p className="text-gray-400">다른 장소를 검색해보세요.</p>
            </div>
          )}

          {weatherData && !isLoading && (
            <>
              {/* Current weather */}
              <CurrentWeatherDisplay
                weather={weatherData.current}
                locationName={currentName}
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

          {/* Favorites section */}
          <section className="pt-6">
            <FavoritesList
              favorites={favorites}
              onUpdateAlias={updateAlias}
              onRemove={removeFavorite}
              canAddMore={canAddMore}
            />
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>데이터 제공: OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
}
