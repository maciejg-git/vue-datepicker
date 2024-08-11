<template>
  <div class="w-[320px] rounded-md p-2 dark:bg-neutral-800">
    <datepicker
      class="overflow-hidden bg-white text-center text-gray-800 dark:bg-neutral-800 dark:text-gray-300"
      v-model="date"
      :range-mode="range"
      model-format="string"
      v-slot="{ days }"
    >
      <date-control-bar class="my-4 grid grid-flow-col grid-cols-6">
        <button-prev-year
          class="mx-auto flex flex-col justify-center rounded px-2 py-1 leading-none focus:outline-none focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-400"
        >
          <chevron-double-left />
        </button-prev-year>
        <button-prev-month
          class="mx-auto flex flex-col justify-center rounded px-2 py-1 leading-none focus:outline-none focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-400"
        >
          <chevron-left />
        </button-prev-month>

        <current-date class="col-span-2 inline-block font-bold"></current-date>

        <button-next-month
          class="mx-auto flex flex-col justify-center rounded px-2 py-1 leading-none focus:outline-none focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-400"
        >
          <chevron-right />
        </button-next-month>
        <button-next-year
          class="mx-auto flex flex-col justify-center rounded px-2 py-1 leading-none focus:outline-none focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-400"
        >
          <chevron-double-right />
        </button-next-year>
      </date-control-bar>

      <weekday-bar class="mb-2 grid grid-cols-7" v-slot="{ weekdays }">
        <weekday
          v-for="weekday in weekdays"
          :weekday="weekday"
          class="text-sm font-semibold dark:text-gray-300"
        ></weekday>
      </weekday-bar>

      <days-container class="relative mb-2 grid grid-cols-7">
        <day
          v-for="day in days"
          :date="day"
          class="mx-1 my-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full py-1 text-sm font-semibold"
          class:today="!font-bold text-gray-400 dark:text-violet-400 border border-violet-400"
          class:adjacent="pointer-events-none text-gray-800/10 dark:text-gray-200/10"
          class:selected="!text-white dark:text-gray-200 bg-violet-400 dark:bg-violet-500 hover:bg-violet-600 dark:hover:bg-violet-700"
          class:selected-first="!text-white dark:text-gray-200 bg-violet-400 dark:bg-violet-500 hover:bg-violet-600 dark:hover:bg-violet-700"
          class:selected-last="!text-white dark:text-gray-200 bg-violet-400 dark:bg-violet-500 hover:bg-violet-600 dark:hover:bg-violet-700"
          class:selected-mid="!text-white dark:text-gray-200 bg-violet-400 dark:bg-neutral-600 hover:bg-violet-600 dark:hover:bg-neutral-500"
          class:partially-selected="text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-neutral-700"
        >
        </day>
      </days-container>

      <datepicker-footer
        class="bg-gray-100 py-1 text-sm font-semibold dark:bg-neutral-700 dark:text-gray-300"
      >
      </datepicker-footer>

      <button-bar class="flex justify-between pt-2">
        <button
          class="border-secondary-700 rounded-md bg-gray-500 px-4 py-1 font-medium text-gray-100 transition-opacity transition-shadow duration-150 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600 sm:text-base"
        >
          Cancel
        </button>
        <button
          class="rounded-md border-violet-700 bg-violet-500 px-4 py-1 font-medium text-gray-100 transition-opacity duration-150 hover:bg-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-200 dark:bg-violet-500 dark:hover:bg-violet-600 sm:text-base"
        >
          OK
        </button>
      </button-bar>
    </datepicker>
  </div>
  <button @click="range = !range">range</button>
  {{ range ? date[0] + " " + date[1] : date }}

  <tabs v-model="active">
    <tabs-bar
      class="flex flex-auto items-center border-b pl-2 dark:border-neutral-600"
      class:item="bg-gray-100
        hover:bg-gray-50
        border-gray-300
        dark:text-gray-300/80
        dark:bg-neutral-900
        dark:hover:bg-neutral-800
        dark:border-neutral-600"
      class:item-active="shadow-none
        bg-white
        hover:bg-white
        border-b-transparent
        dark:border-neutral-600
        dark:text-gray-300
        dark:bg-neutral-800
        dark:hover:bg-neutral-800
        dark:border-b-transparent"
    >
      <tabs-bar-item
        for="tab 2"
        class="-mb-px -ml-px block overflow-ellipsis whitespace-nowrap rounded-t-md border p-2 px-4 transition-all duration-200"
        >tab 2</tabs-bar-item
      >
      <tabs-bar-item
        for="tab 3"
        class="-mb-px -ml-px block overflow-ellipsis whitespace-nowrap rounded-t-md border p-2 px-4 transition-all duration-200"
        >tab 3</tabs-bar-item
      >
      <tabs-bar-item
        for="tab 4"
        class="-mb-px -ml-px block overflow-ellipsis whitespace-nowrap rounded-t-md border p-2 px-4 transition-all duration-200"
        >tab 4</tabs-bar-item
      >
      <tabs-bar-item
        v-for="tab in tabsData"
        :for="tab.name"
        class="-mb-px -ml-px block overflow-ellipsis whitespace-nowrap rounded-t-md border p-2 px-4 transition-all duration-200"
        >{{ tab.name }}</tabs-bar-item
      >
    </tabs-bar>
    <tabs-container class="p-4">
      <tab name="tab 2"> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum. </tab>
      <tab name="tab 3"> It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout. The point of using
      Lorem Ipsum is that it has a more-or-less normal distribution of letters,
      as opposed to using 'Content here, content here', making it look like
      readable English </tab>
      <tab name="tab 4"> tab 4 </tab>
      <tab v-for="tab in tabsData" :name="tab.name"> {{ tab.name }} </tab>
    </tabs-container>
  </tabs>
  <button @click="addTab">add tab</button>
</template>

<script setup>
import { ref } from "vue";
import { getDays } from "../date-api";

let date = ref("");
let range = ref(false);

let daysApi = ref([]);

getDays().then((res) => {
  daysApi.value = res;
});

let active = ref("tab 2")

let tabsData = ref([
{ name: "tab 5"}
])

let addTab = () => {
tabsData.value.push({ name: "tab " + tabsData.value.length + 2})
}
</script>

<style></style>
