<template>
  <transition :name="transition + '-' + transitionDirection" mode="out-in">
    <div :key="current.month.toString() + current.year.toString()">
      <slot></slot>
    </div>
  </transition>
</template>

<script setup>
import { inject, provide } from "vue";

let selectedSingle = inject("selectedSingle");
let selectedRange = inject("selectedRange");
let rangeMode = inject("rangeMode");
let rangeState = inject("rangeState");
let mouseOverDate = inject("mouseOverDate");
let today = inject("today");
let transition = inject("transition");
let transitionDirection = inject("transitionDirection");
let current = inject("current");
let customVariants = inject("customVariants");

let isPartiallySelected = (date) => {
  if (rangeMode.value && rangeState.value == 1)
    return (
      (mouseOverDate.value >= date && date >= selectedRange.value[0]) ||
      (mouseOverDate.value <= date && date <= selectedRange.value[0])
    );
};

let isSelectedDay = (date) => {
  if (!rangeMode.value) {
    return (
      selectedSingle.value && selectedSingle.value.getTime() == date.getTime()
    );
  } else {
    if (rangeState.value == 1) {
      return;
    }
    return selectedRange.value[0] <= date && date <= selectedRange.value[1];
  }
};

let isToday = (date) => today.getTime() == date.getTime();

let getDayVariant = (date) => {
  if (typeof date === "number") return "adjacent";

  let variants = {};

  if (customVariants) {
    for (let variant in customVariants) {
      variants[variant] = customVariants[variant](date);
    }
  }

  return {
    ...variants,
    selected: isSelectedDay(date),
    today: isToday(date),
    partiallySelected: isPartiallySelected(date),
  };
};

provide("getDayVariant", getDayVariant);
</script>
