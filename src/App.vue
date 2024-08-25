<script setup>
import WeatherApp from "./components/WeatherApp.vue";
import ThemeSwitcher from "./components/ThemeSwitcher.vue";
import { usePWA } from "./composables/usePWA.js";

usePWA();
</script>

<template>
  <ThemeSwitcher class="theme-switcher" />
  <WeatherApp />
</template>

<style scoped>
.theme-switcher {
  position: fixed;
  top: 10px;
  right: 1rem;
  z-index: 10;
  @media screen and (max-width: 600px) {
    top: 9rem;
  }
}
</style>
