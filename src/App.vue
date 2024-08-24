<script setup>
import WeatherApp from "./components/WeatherApp.vue";
import { usePWA } from "./composables/usePWA.js";

usePWA();
</script>

<template>
  <WeatherApp />
</template>

<style scoped></style>
