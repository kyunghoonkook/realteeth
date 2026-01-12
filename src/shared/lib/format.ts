export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°`;
};

export const formatTime = (timestamp: number, timezone: number = 0): string => {
  const date = new Date((timestamp + timezone) * 1000);
  const hours = date.getUTCHours();
  const ampm = hours >= 12 ? '오후' : '오전';
  const displayHours = hours % 12 || 12;
  return `${ampm} ${displayHours}시`;
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = dayNames[date.getDay()];
  return `${month}월 ${day}일 (${dayName})`;
};

export const getWeatherDescription = (weatherId: number): string => {
  if (weatherId >= 200 && weatherId < 300) return '천둥번개';
  if (weatherId >= 300 && weatherId < 400) return '이슬비';
  if (weatherId >= 500 && weatherId < 600) return '비';
  if (weatherId >= 600 && weatherId < 700) return '눈';
  if (weatherId >= 700 && weatherId < 800) return '안개';
  if (weatherId === 800) return '맑음';
  if (weatherId > 800) return '구름';
  return '알 수 없음';
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
