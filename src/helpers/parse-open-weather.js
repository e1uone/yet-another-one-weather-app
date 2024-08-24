export const parseOpenWeather = (openWeatherData, locationName) => {
  const resultObject = {
    cloudiness: openWeatherData.clouds.all,
    windSpeed: Math.round(openWeatherData.wind.speed),
    humidity: openWeatherData.main.humidity,
    temperatureValue: Math.round(openWeatherData.main.temp),
    temperatureValueCelsius: convertToCelsius(
      Math.round(openWeatherData.main.temp)
    ),
    temperatureHigh: Math.round(openWeatherData.main.temp_max),
    temperatureHighCelsius: convertToCelsius(
      Math.round(openWeatherData.main.temp_max)
    ),
    temperatureLow: Math.round(openWeatherData.main.temp_min),
    temperatureLowCelsius: convertToCelsius(
      Math.round(openWeatherData.main.temp_min)
    ),
    location: formatLocation(openWeatherData.name, openWeatherData.sys.country),
    description: openWeatherData.weather[0].description,
    iconName: getWeatherIcon(openWeatherData.weather[0].id),
    locationName: locationName,
  };

  return resultObject;
};

const convertToCelsius = (fahrenheit) => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};
const formatLocation = (city, country) => {
  if (city === null && country === null) {
    return "";
  }

  return `${city}, ${country}`;
};

const isThunderstorm = (id) => {
  return id > 199 && id < 233;
};

const isDrizzle = (id) => {
  return id > 299 && id < 322;
};

const isRain = (id) => {
  return id > 499 && id < 532;
};

const isSnow = (id) => {
  return id > 599 && id < 623;
};

const getWeatherIcon = (id) => {
  if (isThunderstorm(id)) {
    return "weather-thunderstorm";
  }

  if (isDrizzle(id) || isRain(id)) {
    return "weather-rain";
  }

  if (isSnow(id)) {
    return "weather-snow";
  }

  if (id === 800) {
    return "weather-sun";
  }

  return "weather-cloud";
};
