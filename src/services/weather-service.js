const apiKey = import.meta.env.VITE_OPEN_WEATHER_APP_ID;
export const getWeather = async (coordinates, fetchOptions) => {
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${apiKey}`;

  const response = await fetch(baseUrl, fetchOptions);

  const result = await response.json();

  return result;
};
