<template>
  <a href="" :class="getClassesByVariant()">
    {{ variant === "adjacent" ? date : date.getDate() }}
  </a>
</template>

<script setup>
import { defineProps, useAttrs } from "vue"

let props = defineProps({
  date: {
    type: [Date, Number]
  },
  variant: {
    type: [String, Object],
  },
  ["class:selected"]: {
    type: String,
  },
  ["class:today"]: {
    type: String,
  },
  ["class:adjacent"]: {
    type: String,
  },
})

let getClassesByVariant = () => {
  let c = ""
  if (props.variant === "adjacent") return props['class:adjacent']
  if (props.variant.selected) c += props['class:selected'] + " "
  if (props.variant.today) c += props['class:today']
  return c
}
</script>
