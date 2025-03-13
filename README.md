# vue-datepicker

Datepicker component for Vue 3.

[Documentation and examples](https://vue-datepicker-documentation.netlify.app/)

### Example usage:

```vue
<datepicker
  class="overflow-hidden bg-white text-center text-gray-800 dark:bg-neutral-800 dark:text-gray-300"
  v-model="date"
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
      class-today="!font-bold text-gray-400 dark:text-violet-400 border border-violet-400"
      class-adjacent="pointer-events-none text-gray-800/10 dark:text-gray-200/10"
      class-selected="!text-white dark:text-gray-200 bg-violet-400 dark:bg-violet-500 hover:bg-violet-600 dark:hover:bg-violet-700"
      class-selected-first="!text-white dark:text-gray-200 bg-violet-400 dark:bg-violet-500 hover:bg-violet-600 dark:hover:bg-violet-700"
      class-selected-last="!text-white dark:text-gray-200 bg-violet-400 dark:bg-violet-500 hover:bg-violet-600 dark:hover:bg-violet-700"
      class-selected-mid="!text-white dark:text-gray-200 bg-violet-400 dark:bg-neutral-600 hover:bg-violet-600 dark:hover:bg-neutral-500"
      class-partially-selected="text-gray-800 dark:text-gray-300 bg-gray-300 dark:bg-neutral-700"
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
```
---

### Datepicker features

- access to the components main template
- minimal Vue logic in the main template
- props only on the main datepicker component
- usable directly in the template or pasted to [SFC](https://vuejs.org/guide/scaling-up/sfc.html) for easy reuse
- useful defaults out of the box
- highly customizable
    - many changes and extensions can be made by editing main template with the use of the data exposed in slots
    - modify all classes of every element, no classes defined inside subcomponents
    - most internal data and functions available for injecting or as the slot props
    - customizable transitions
- user callback provided as props that extend generated day components with additional variants, these variants can be then styled with custom classes
- the `v-model`, by default, returns `Date` object. Optionally type can be changed to the `array` or `string`. For `array` and `string` date format is defined with the `modelFormat` prop
- separate class props for components with many variants or states
