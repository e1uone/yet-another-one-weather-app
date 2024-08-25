<script lang="ts" setup>
import { onMounted, ref } from "vue";
import LocationItem from "./LocationItem.vue";
const locations = ref([]);
const activeItemIndex = ref(0);
const props = defineProps({
  storageKey: {
    type: String,
    default: "locations",
  },
});
const emit = defineEmits(["select-location"]);

const setCurrentLocation = (location, index) => {
  emit("select-location", location);
  activeItemIndex.value = index;
};

const addNewLocation = (location) => {
  const isExistIndex = locations.value.findIndex((l) => {
    return (
      l.data.geo_lat == location.data.geo_lat &&
      l.data.geo_lon == location.data.geo_lon
    );
  });

  if (isExistIndex >= 0) {
    activeItemIndex.value = isExistIndex;
    return;
  }

  if (locations.value.length >= 5) {
    locations.value.pop();
  }

  locations.value.unshift(location);

  saveLocations(locations.value);
  activeItemIndex.value = 0;
};

defineExpose({
  locations,
  addNewLocation,
});

const saveLocations = (locations) => {
  localStorage.setItem(props.storageKey, JSON.stringify(locations));
};
const loadLocations = () => {
  const loadedLocations = JSON.parse(localStorage.getItem("locations"));
  if (!loadedLocations) {
    return;
  }

  locations.value = loadedLocations;

  setCurrentLocation(loadedLocations[0], 0);
};

onMounted(() => {
  loadLocations();
});
</script>
<template>
  <section class="saved-locations-widget">
    <template v-if="locations.length">
      <LocationItem
        v-for="(location, index) in locations"
        :key="`location_${index}`"
        class="saved-locations-widget__location-item"
        :location="location"
        :is-active="activeItemIndex === index"
        @click="setCurrentLocation(location, index)"
      />
    </template>
    <div v-else class="saved-locations-widget--empty">
      <span>There will be your saved locations</span>
    </div>
  </section>
</template>
<style scoped>
.saved-locations-widget {
  min-width: 200px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media screen and (max-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 1rem 0rem;
  }
}
.saved-locations-widget__location-item {
  @media screen and (max-width: 600px) {
    width: auto;
  }
  @media screen and (max-width: 420px) {
    width: 100%;
  }
}

.saved-locations-widget--empty {
  color: var(--text-white);
  display: flex;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
