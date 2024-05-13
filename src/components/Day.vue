<template>
  <a
    href=""
    :class="getClassesByVariant()"
    @mouseenter="handleMouseOverDay(date)"
    @click.prevent="handleDayClicked(date, variant)"
  >
    <slot :date="date" :variant="variant">
      {{ variant === "adjacent" ? date : date.getDate() }}
    </slot>
  </a>
</template>

<script setup>
import { defineProps, inject, computed } from "vue";

let props = defineProps({
  date: {
    type: [Date, Number, String],
  },
  ["class:selected"]: {
    type: String,
    default: "",
  },
  ["class:today"]: {
    type: String,
    default: "",
  },
  ["class:adjacent"]: {
    type: String,
    default: "",
  },
  ["class:partiallySelected"]: {
    type: String,
    default: "",
  },
  ["class:user"]: {
    type: Function,
    default: "",
  },
});

let getDayVariant = inject("getDayVariant");
let { handleDayClicked, handleMouseOverDay } = inject("events");

let variant = computed(() => getDayVariant(props.date));

let getClassesByVariant = () => {
  let c = "";

  if (variant.value === "adjacent") {
    return props["class:adjacent"];
  }

  if (variant.value.selected) c += props["class:selected"] + " ";
  if (variant.value.today) c += props["class:today"] + " ";
  if (variant.value.partiallySelected)
    c += props["class:partiallySelected"] + " ";

  if (props["class:user"]) c += props["class:user"](props.date, variant.value);

  return c;
};
</script>
