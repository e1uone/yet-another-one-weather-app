<script lang="ts" setup>
import BaseIcon from "./BaseIcon.vue";
import { ref, computed } from "vue";

const temperatureType = ref("F");

function changeTemperatureType() {
  temperatureType.value = temperatureType.value === "F" ? "C" : "F";
}

const isCelsius = computed(() => temperatureType.value === "C");

defineProps({
  isError: {
    type: Boolean,
    required: false,
    default: false,
  },
  weather: {
    type: Object,
    required: false,
    default: () => {
      return {
        cloudiness: 0,
        windSpeed: 0,
        humidity: 0,
        temperatureValue: 32,
        temperatureValueCelsius: 0,
        temperatureHigh: 32,
        temperatureHighCelsius: 0,
        temperatureLow: 32,
        temperatureLowCelsius: 0,
        location: "Unknown location",
        description: "",
        iconName: "weather-cloud",
      };
    },
  },
});
</script>
<template>
  <div class="weather-display">
    <section class="weather-display__top">
      <div>
        <BaseIcon name="weather-cloud" size="35px" />
        {{ `${weather.cloudiness}%` }}
      </div>
      <div>
        <BaseIcon name="wind" size="35px" />
        {{ `${weather.windSpeed} m/s` }}
      </div>
      <div>
        <BaseIcon name="humidity" size="25px" />
        {{ `${weather.humidity}%` }}
      </div>
    </section>

    <section class="weather-display__main">
      <p class="weather-display__location">
        {{ weather.location }}
      </p>
      <div class="weather-display__temperature-container">
        <div class="weather-display__temperature">
          {{
            isCelsius
              ? weather.temperatureValueCelsius
              : weather.temperatureValue
          }}
        </div>
        <div class="weather-display__temperature-side">
          <button
            class="weather-display__temperature-button"
            type="button"
            @click="changeTemperatureType()"
          >
            {{ `°${temperatureType}` }}
          </button>
          <div>
            <BaseIcon name="arrow-up" size="15px" />
            {{
              `${
                isCelsius
                  ? weather.temperatureHighCelsius
                  : weather.temperatureHigh
              }°${temperatureType}`
            }}
          </div>

          <div>
            <BaseIcon name="arrow-down" size="15px" />

            {{
              `${
                isCelsius
                  ? weather.temperatureLowCelsius
                  : weather.temperatureLow
              }°${temperatureType}`
            }}
          </div>
        </div>
      </div>
    </section>

    <section class="weather-display__bottom">
      <div class="weather-display__icon">
        <BaseIcon :name="weather.iconName" size="5rem" />
      </div>

      <section v-if="isError" class="weather-display__error">
        There's a problem at the weather forecast server :(
      </section>

      <section v-else class="weather-display__description">
        {{ weather.description }}
      </section>
    </section>
  </div>
</template>
<style scoped>
.weather-display {
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1rem 2rem 1rem;
}

.weather-display__top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
}

.weather-display__main {
  display: flex;
  flex-direction: column;
}

.weather-display__temperature-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-display__location {
  text-align: center;
  font-size: 1.5rem;
}

.weather-display__temperature {
  font-size: 7rem;
}

.weather-display__temperature-side {
  div {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }
}

.weather-display__bottom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: 600px) {
    padding-bottom: 3rem;
  }
}

.weather-display__temperature-button {
  border: none;
  background-color: transparent;
  font-size: 2rem;
  color: inherit;
  cursor: pointer;
  transition: color 0.1s;
}

.weather-display__temperature-button:hover {
  color: var(--text-color-1);
}

.weather-display__temperature-button:focus-visible {
  outline: none;
  color: var(--text-color-1);
}

.weather-display__description {
  text-align: center;
  font-size: 1.5rem;
  text-transform: capitalize;
}

.weather-display__error {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  text-align: center;
  font-size: 1.25rem;
}
.weather-display__icon {
  height: 80px;
}
</style>
