<script lang="ts" setup>
defineProps({
  location: {
    type: Object,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
const getLocationName = (location) => {
  return `${location.data.city}, ${location.data.country_iso_code}`;
};
</script>
<template>
  <button
    class="location-item"
    :class="{ 'location-item--active': isActive }"
    :title="getLocationName(location)"
  >
    <span class="location-item__location-title">
      {{ getLocationName(location) }}
    </span>
  </button>
</template>
<style scoped>
.location-item {
  background: rgba(0, 0, 0, 0.1);
  border: 2px solid var(--border-color-0);
  width: 100%;
  color: var(--text-color-0);
  appearance: none;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 0 0.85rem;
  transition: background 0.1s, border-color 0.15s ease-in-out;
}

.location-item:hover {
  background: rgba(0, 0, 0, 0.3);
  border-color: var(--border-color-1);
}

.location-item:focus-visible {
  background: rgba(0, 0, 0, 0.3);
  border-color: var(--border-color-1);
}

.location-item--active {
  background: rgba(0, 0, 0, 0.25);
  border-color: var(--border-color-1);
}

.location-item__location-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
