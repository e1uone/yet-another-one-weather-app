<script setup>
import LoadingSpinner from "./LoadingSpinner.vue";
</script>
<template>
  <div class="weather-app-loader">
    <LoadingSpinner />
  </div>
</template>
<style scoped>
.weather-app-loader {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
