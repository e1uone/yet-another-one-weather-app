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
  right: 10px;
  z-index: 10;
}
</style>
