<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    require: true,
    default: "",
  },
  size: {
    type: String,
    default: "3rem",
  },
});

function getImageUrl(name) {
  return new URL(`../assets/icons/${name}.svg`, import.meta.url).href;
}
</script>
<template>
  <img class="base-icon" :src="getImageUrl(name)" :alt="`icon-${name}`" />
</template>
<style scoped>
.base-icon {
  width: v-bind(size);
  filter: invert(77%) sepia(92%) saturate(18%) hue-rotate(13deg)
    brightness(110%) contrast(111%);
}
</style>
