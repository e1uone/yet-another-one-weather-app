const apiKey = import.meta.env.VITE_DADATA_API_KEY;
const defaultOptions = {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Token " + apiKey,
  },
};
const baseUrl = "http://suggestions.dadata.ru";

export const getDadata = async (query) => {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({
      query: query,
      language: "en",
      locations: { country: "*" },
      from_bound: { value: "city" },
      to_bound: { value: "city" },
    }),
  };
  const url = `${baseUrl}/suggestions/api/4_1/rs/suggest/address`;

  const response = await fetch(url, options);
  const result = await response.json();

  return result;
};

export const getDadataByCoordinates = async (coordinates) => {
  const options = {
    ...defaultOptions,
    body: JSON.stringify({
      lat: coordinates.latitude,
      lon: coordinates.longitude,
      language: "en",
    }),
  };

  const url = `${baseUrl}/suggestions/api/4_1/rs/geolocate/address`;
  const response = await fetch(url, options);
  const result = await response.json();

  return result;
};
