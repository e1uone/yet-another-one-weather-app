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
  return `${location.data.city}, ${location.data.country}`;
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
  background: rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  color: var(--text-white);
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
}

.location-item:hover {
  background: rgba(0, 0, 0, 0.3);
}

.location-item:focus-visible {
  background: rgba(0, 0, 0, 0.5);
}

.location-item--active {
  background: rgba(0, 0, 0, 0.4);
}

.location-item__location-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
