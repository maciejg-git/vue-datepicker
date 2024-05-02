<template>
  <div>
    {{ todayFormatted }}
  </div>
</template>

<script setup>
import { inject } from "vue"

let todayFormatted = inject("todayFormatted")
</script>
