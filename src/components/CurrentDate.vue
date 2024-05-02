<template>
  <div>
    {{ monthNames[month] }} {{ year }}
  </div>
</template>

<script setup>
import { inject } from "vue" 

let monthNames = inject("months")
let { month, year } = inject("currentDate")
</script>
