<script setup>
import WeatherApp from "./components/WeatherApp.vue";
import { usePWA } from "./composables/usePWA.js";
import { useTheme } from "./composables/useTheme.js";

usePWA();

const { calculateTheme } = useTheme();

calculateTheme();
</script>

<template>
  <WeatherApp />
</template>

<style scoped></style>
