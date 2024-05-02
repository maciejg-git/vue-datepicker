<template>
  <button @click="setNextYear">
    <slot></slot>
  </button>
</template>

<script setup>
import { inject } from "vue" 

let { setNextYear } = inject("controls")
</script>
