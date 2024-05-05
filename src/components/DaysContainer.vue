<template>
  <!-- <transition :name="'slide-' + transition" mode="out-in"> -->
  <!--   <render-vnode :vnodes="daysVNode" /> -->
  <!-- </transition> -->

  <!-- <transition :name="'slide-' + transition" mode="out-in"> -->
  <!--   <div :key="month.toString() + year.toString()"> -->
  <!--     <day -->
  <!--       v-for="day in days.prevMonthDays" -->
  <!--       :date="day" -->
  <!--       variant="adjacent" -->
  <!--       v-bind="dayVNode.props" -->
  <!--     ></day> -->
  <!--     <day -->
  <!--       v-for="day in days.days" -->
  <!--       :date="day" -->
  <!--       :variant="getDayVariant(day)" -->
  <!--       v-bind="dayVNode.props" -->
  <!--       @click.prevent="handleDayClicked(day)" -->
  <!--       @mouseenter="handleMouseOverDay(day)" -->
  <!--     > -->
       <!-- <template v-for="el in daySlotContent"> -->
       <!--   <component :is="el"></component> -->
       <!-- </template>  -->
    <!--   </day> -->
    <!--   <day -->
    <!--     v-for="day in days.nextMonthDays" -->
    <!--     :date="day" -->
    <!--     variant="adjacent" -->
    <!--     v-bind="dayVNode.props" -->
    <!--   ></day> -->
    <!-- </div> -->
  <!-- </transition> -->

  <!-- <div> -->
  <!--   <template v-for="day in days.days"> -->
  <!--     <component :is="cloneVNode(dayVNode)" :date="day" :variant="getDayVariant(day)" @mouseenter="handleMouseOverDay(day)" @click.prevent="handleDayClicked(day)"></component> -->
  <!--   </template> -->
  <!-- </div> -->

  <transition :name="'slide-' + transition" mode="out-in">
  <div :key="month.toString() + year.toString()">
    <slot></slot>
  </div>
  </transition>
</template>

<script setup>
import { useSlots, h, cloneVNode, inject, watch, ref, shallowRef, provide } from "vue";
import Day from "./Day.vue";

let slots = useSlots();

let days = inject("days");
let single = inject("singleModel");
let range = inject("rangeModel");
let rangeMode = inject("rangeMode");
let rangeState = inject("rangeState");
let mouseOverRange = inject("mouseOverRange");
let today = inject("today");
let transition = inject("transition");
let { month, year } = inject("currentDate");
let { handleDayClicked, handleMouseOverDay } = inject("events");

let dayVNode = slots.default()[0];

// let daySlotContent = dayVNode.children.default()

let daysVNode = shallowRef([]);

let isPartiallySelected = (date) => {
  if (rangeMode.value && rangeState.value == 1)
    return (
      (mouseOverRange.value >= date && date >= range.value[0]) ||
      (mouseOverRange.value <= date && date <= range.value[0])
    );
};

let isSelectedDay = (date) => {
  if (!rangeMode.value) {
    return single.value && single.value.getTime() == date.getTime();
  } else {
    if (rangeState.value == 1) {
      return;
    }
    return range.value[0] <= date && date <= range.value[1];
  }
};

let isToday = (date) => today.getTime() == date.getTime();

let getDayVariant = (date) => {
  return {
    selected: isSelectedDay(date),
    today: isToday(date),
    partiallySelected: isPartiallySelected(date),
  };
};

// watch(
//   [days, single, () => range.value[1], mouseOverRange],
//   () => {
//     let d = Array.from({ length: days.value.daysInMonth }, (v, i) =>
//       cloneVNode(dayVNode, {
//         date: days.value.days[i],
//         variant: getDayVariant(days.value.days[i]),
//         onClick: (event) => handleDayClicked(days.value.days[i], event),
//         onMouseenter: (event) => handleMouseOverDay(days.value.days[i]),
//       })
//     );
//     let pd = Array.from({ length: days.value.prevMonthDays.length }, (v, i) =>
//       cloneVNode(dayVNode, {
//         date: days.value.prevMonthDays[i],
//         variant: "adjacent",
//       })
//     );
//     let nd = Array.from({ length: days.value.nextMonthDays.length }, (v, i) =>
//       cloneVNode(dayVNode, {
//         date: days.value.nextMonthDays[i],
//         variant: "adjacent",
//       })
//     );
//     daysVNode.value = [...pd, ...d, ...nd];
//   },
//   { immediate: true }
// );

let renderVnode = (props) => {
  return h(
    "div",
    { key: month.value.toString() + year.value.toString() },
    props.vnodes
  );
};

provide("getDayVariant", getDayVariant)
</script>
