<template>
  <transition :name="'slide-' + transition" mode="out-in">
    <render-vnode :vnodes="daysVNode" />
  </transition>
</template>

<script setup>
import { useSlots, h, cloneVNode, inject, watch, ref, shallowRef } from "vue";

let slots = useSlots();

let days = inject("days");
let single = inject("singleModel");
let today = inject("today");
let transition = inject("transition")
let { month, year } = inject("currentDate");
let { handleDayClicked } = inject("events");

let dayVNode = slots.default()[0];

let daysVNode = shallowRef([]);

let isSelectedDay = (date) => {
  // if (!props.range) {
  return single.value && single.value.getTime() == date.getTime();
  // }
  // else {
  //   if (rangeState.value == 1) {
  //     return;
  //   }
  //   return range.value[0] <= date && date <= range.value[1];
  // }
};

let isToday = (date) => today.getTime() == date.getTime();

let getDayVariant = (date) => {
  return {
    selected: isSelectedDay(date),
    today: isToday(date),
  }
  if (isSelectedDay(date)) return "selected";
  if (isToday(date)) return "today"
  return "default";
};

watch(
  [days, single],
  () => {
    let d = Array.from({ length: days.value.daysInMonth }, (v, i) =>
      cloneVNode(dayVNode, {
        date: days.value.days[i],
        variant: getDayVariant(days.value.days[i]),
        onClick: (event) => handleDayClicked(days.value.days[i], event),
      })
    );
    let pd = Array.from({ length: days.value.prevMonthDays.length }, (v, i) =>
      cloneVNode(dayVNode, {
        date: days.value.prevMonthDays[i],
        variant: "adjacent",
      })
    );
    let nd = Array.from({ length: days.value.nextMonthDays.length }, (v, i) =>
      cloneVNode(dayVNode, {
        date: days.value.nextMonthDays[i],
        variant: "adjacent",
      })
    );
    daysVNode.value = [...pd, ...d, ...nd];
  },
  { immediate: true }
);

let renderVnode = (props) => {
  return h(
    "div",
    { key: month.value.toString() + year.value.toString() },
    props.vnodes
  );
};
</script>
