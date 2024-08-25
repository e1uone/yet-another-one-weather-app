<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getWeather } from "../services/weather-service";
import { getDadataByCoordinates } from "../services/dadata-service";
import { parseOpenWeather } from "../helpers/parse-open-weather";
import DadataInput from "./DadataInput.vue";
import WeatherDisplay from "./WeatherDisplay.vue";
import SavedLocationsWidget from "./SavedLocationsWidget.vue";
import WeatherLoader from "./WeatherLoader.vue";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const query = ref("");
const dadataResult = ref(null);
const selectedLocation = ref(null);
const currentWeather = ref();
const savedLocationsRef = ref(null);
const isWeatherFetching = ref(false);
const isWeatherFetchingError = ref(false);

let pendingWeatherController = null;

const onDadataResultUpdate = (dadataResult) => {
  savedLocationsRef.value.addNewLocation(dadataResult);
  changeLocation(dadataResult);
};

const changeLocation = async (location) => {
  selectedLocation.value = location;

  try {
    isWeatherFetching.value = true;

    if (pendingWeatherController) {
      pendingWeatherController.abort("ExpectedAbortError");
    }

    const controller = new AbortController();

    pendingWeatherController = controller;

    const response = await getWeather(
      {
        longitude: location.data.geo_lon,
        latitude: location.data.geo_lat,
      },
      { signal: controller.signal }
    );

    currentWeather.value = parseOpenWeather(response);
    isWeatherFetchingError.value = false;
    pendingWeatherController = null;

    isWeatherFetching.value = false;
  } catch (error) {
    console.error(error);

    if (error !== "ExpectedAbortError") {
      isWeatherFetchingError.value = true;
      isWeatherFetching.value = false;
      $toast.error(
        "There is some problems with weather forecast service, try again later."
      );
    }
  }
};

const getNavigatorGeolocation = async () => {
  if (savedLocationsRef.value.locations.length > 0) {
    return;
  }
  if (!("geolocation" in navigator)) {
    $toast.info("Your browser doesn't support geolocation.");
    return;
  }

  isWeatherFetching.value = true;

  navigator.geolocation.getCurrentPosition(async (position) => {
    try {
      const response = await getDadataByCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      savedLocationsRef.value.addNewLocation(response.suggestions[0]);
      changeLocation(response.suggestions[0]);
      $toast.success("Found your location successfully.");
    } catch (e) {
      $toast.warning("Failed to get your location.");
      console.error(e);
    }
  });
};

onMounted(() => {
  getNavigatorGeolocation();
});
</script>
<template>
  <div class="weather-app-wrapper">
    <div class="weather-app">
      <section class="weather-app__content">
        <DadataInput
          v-model="query"
          v-model:dadata-result="dadataResult"
          placeholder=" Search your city..."
          @update:dadata-result="onDadataResultUpdate($event)"
        />

        <WeatherDisplay
          v-show="!isWeatherFetching"
          class="weather-app__weather-display"
          :weather="currentWeather"
          :is-error="isWeatherFetchingError"
        />

        <WeatherLoader v-show="isWeatherFetching" class="weather-app__loader" />
      </section>

      <SavedLocationsWidget
        ref="savedLocationsRef"
        class="weather-app__saved-locations-widget"
        @select-location="changeLocation($event)"
      />
    </div>
  </div>
</template>
<style scoped>
.weather-app-wrapper {
  min-height: 100dvh;
  max-width: 33rem;

  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 600px) {
    max-width: 100%;
    width: 100%;
    flex-direction: column;
  }
}

.base-input {
  width: 100%;
  height: 50px;
}

.weather-app {
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  min-height: 500px;
  width: 100%;
  padding: 1rem;
  display: flex;
  border-radius: 10px;
  background: linear-gradient(to bottom, #8fdbe6 0%, rgb(107, 197, 211) 100%);

  @media screen and (max-width: 600px) {
    border-radius: 0px;
    flex-direction: column;
    flex: 1;
  }
}

.weather-app__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  @media screen and (max-width: 600px) {
    justify-content: center;
    padding: 0;
  }
}

.weather-app__weather-display {
  flex: 100%;
}

.weather-app__loader {
  flex: 100%;
  height: 100%;
}

.weather-app__saved-locations-widget {
  width: 150px;
  border-left: 1px solid rgba(255, 255, 255, 0.3);

  @media screen and (max-width: 600px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
  }
}
</style>
