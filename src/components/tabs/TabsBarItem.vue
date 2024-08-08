<template>
  <li @click="handleTabsBarItemClick(props.for)" :class="getClassesByVariant">
    <slot :tab="tab"></slot>
  </li>
</template>

<script setup>
import { inject, onMounted, ref, computed, onUnmounted } from "vue";

let props = defineProps({
  for: {
    type: String,
  },
  ["class:item"]: {
    type: String,
    default: "",
  },
  ["class:itemActive"]: {
    type: String,
    default: "",
  },
});

let tab = ref(null);

let { addTab, removeTab, handleTabsBarItemClick } = inject("tabs");
let tabsBarProps = inject("tabs-bar-props");

tab = addTab(props.for);

onUnmounted(() => {
  removeTab(props.for)
})

let getClassesByVariant = computed(() => {
  return tab.isActive
    ? props["class:itemActive"]
      ? props["class:itemActive"]
      : tabsBarProps["class:itemActive"]
    : props["class:item"]
    ? props["class:item"]
    : tabsBarProps["class:item"];
});
</script>
