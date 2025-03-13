<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script setup>
import { provide } from "vue";

let props = defineProps({
  ["classItem"]: {
    type: String,
    default: "",
  },
  ["classItemActive"]: {
    type: String,
    default: "",
  },
});

provide("tabs-bar-props", props);
</script>
