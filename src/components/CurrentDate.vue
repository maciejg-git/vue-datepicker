<template>
  <div>
    {{ months[current.month] }} {{ current.year }}
  </div>
</template>

<script setup>
import { inject } from "vue" 

let { months } = inject("names")
let current = inject("current")
</script>
