<template>
  <li>
    <button @click="handleTabsBarItemClick(props.for)" v-bind="$attrs" :class="getClassesByVariant">
      <slot :tab="tab"></slot>
    </button>
  </li>
</template>

<script setup>
import { inject, onMounted, ref, computed, onUnmounted } from "vue";

defineOptions({
  inheritAttrs: false
})

let props = defineProps({
  for: {
    type: String,
  },
  ["classItem"]: {
    type: String,
    default: "",
  },
  ["classItemActive"]: {
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
    ? props["classItemActive"]
      ? props["classItemActive"]
      : tabsBarProps["classItemActive"]
    : props["classItem"]
    ? props["classItem"]
    : tabsBarProps["classItem"];
});
</script>
