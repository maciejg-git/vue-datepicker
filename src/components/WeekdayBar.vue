<template>
  <render-vnode :vnodes="weekdaysVNode" />
</template>

<script setup>
import { useSlots, h, cloneVNode, inject, watch, ref, shallowRef } from "vue";
  
let slots = useSlots();

let weekdays = inject("weekdays");

let weekdayVNode = slots.default()[0];

let weekdaysVNode = shallowRef([])

watch(weekdays, () => {
  weekdaysVNode.value = Array.from({ length: 7 }, (v, i) =>
    cloneVNode(weekdayVNode, { weekday: weekdays.value[i]})
  );
}, {immediate: true})

let renderVnode = (props) => {
  return h("div", null, props.vnodes);
};
</script>
