<script setup>
import BaseIcon from "./BaseIcon.vue";
import { useTheme } from "../composables/useTheme.js";
const { setTheme, currentTheme, calculateTheme } = useTheme();

calculateTheme();

const toggleTheme = () => {
  setTheme(currentTheme.value === "dark" ? "light" : "dark");
};
</script>
<template>
  <button class="theme-switcher" @click="toggleTheme()">
    <BaseIcon v-if="currentTheme === 'light'" name="dark-theme" size="32px" />
    <BaseIcon v-if="currentTheme === 'dark'" name="light-theme" size="33px" />
  </button>
</template>
<style scoped>
.theme-switcher {
  appearance: none;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  right: 1rem;
  top: 1rem;
}
.theme-switcher:hover {
  color: var(--text-color-1);
  filter: brightness(0) saturate(100%) invert(77%) sepia(8%) saturate(15%)
    hue-rotate(316deg) brightness(85%) contrast(88%);
}
.theme-switcher:focus-within {
  color: var(--text-color-1);
  filter: brightness(0) saturate(100%) invert(77%) sepia(8%) saturate(15%)
    hue-rotate(316deg) brightness(85%) contrast(88%);
}
</style>
