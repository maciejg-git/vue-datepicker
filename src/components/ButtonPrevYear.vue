<template>
  <button @click="setPrevYear">
    <slot></slot>
  </button>
</template>

<script setup>
import { inject } from "vue" 

let { setPrevYear } = inject("controls")
</script>
