<template>
  <div>
    <slot v-bind="slotProps"></slot>
  </div>
</template>

<script setup>
import {
  ref,
  provide,
  computed,
  defineProps,
  toRef,
  reactive,
  toRefs,
  watch,
} from "vue";

let props = defineProps({
  modelValue: {
    type: [Date, String, Array],
  },
  locale: {
    type: String,
    default: "",
  },
  mondayFirstWeekday: {
    type: Boolean,
    default: true,
  },
  format: {
    type: Object,
    default: () => ({
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
  rangeMode: {
    type: Boolean,
    default: false,
  },
  transition: {
    type: String,
    default: "fade",
  },
  autoEmit: {
    type: Boolean,
    default: true,
  },
  modelFormat: {
    type: [Function, Object],
    default: null,
  },
});

let emit = defineEmits(["update:modelValue"]);

let { rangeMode, transition } = toRefs(props);

let selectedSingle = ref("");
let selectedRange = ref([]);

let today = new Date();
today.setHours(0, 0, 0, 0);

let current = reactive({
  month: today.getMonth(),
  year: today.getFullYear(),
});

let getNumberRange = (from, count) => {
  return Array.from({ length: count }, (_, i) => i + from);
};

let locale = computed(() => {
  return props.locale || navigator?.language || "en-GB";
});

let names = {
  months: computed(() => {
    return Array.from({ length: 12 }, (v, i) =>
      new Date(0, i, 1).toLocaleString(locale.value, {
        month: "short",
      })
    );
  }),
  weekdays: computed(() =>
    Array.from({ length: 7 }, (v, i) =>
      new Date(2021, 1, props.mondayFirstWeekday ? i + 1 : i).toLocaleString(
        locale.value,
        {
          weekday: "short",
        }
      )
    )
  ),
};

let todayFormatted = computed(() =>
  today.toLocaleDateString(locale.value, props.format)
);

let getCountDaysInMonth = (y, m) => 32 - new Date(y, m, 32).getDate();

let prevMonth = (m, y) => {
  return m - 1 < 0 ? { m: 11, y: y - 1 } : { m: m - 1, y };
};

let nextMonth = (m, y) => {
  return m + 1 > 11 ? { m: 0, y: y + 1 } : { m: m + 1, y };
};

let getFirstDay = (m, y) => {
  let d = new Date(m, y).getDay();
  return props.mondayFirstWeekday ? (6 + d) % 7 : d;
};

let days = computed(() => {
  let day = getFirstDay(current.year, current.month);
  let daysInMonth = getCountDaysInMonth(current.year, current.month);

  let days = getNumberRange(1, daysInMonth);
  days = days.map((i) => new Date(current.year, current.month, i));

  // if (!props.adjacentMonths) {
  //   days = [...Array(day).fill(""), ...days];
  //   return { days };
  // }

  let { m, y } = prevMonth(current.month, current.year);
  let daysCountPrev = getCountDaysInMonth(y, m);
  let prevMonthDays = getNumberRange(daysCountPrev - day + 1, day);
  let nextMonthDays = getNumberRange(1, 42 - daysInMonth - day);
  return { daysInMonth, days: [...prevMonthDays, ...days, ...nextMonthDays] };
});

let setNextMonth = () =>
  ({ m: current.month, y: current.year } = nextMonth(
    current.month,
    current.year
  ));

let setPrevMonth = () =>
  ({ m: current.month, y: current.year } = prevMonth(
    current.month,
    current.year
  ));

let setNextYear = () => ++current.year;

let setPrevYear = () => --current.year;

let transitionDirection = ref("");

let rangeState = ref(0);

let mouseOverDate = ref(null);

watch(rangeMode, () => reset());

let reset = () => {
  selectedSingle.value = null;
  selectedRange.value = [];
  rangeState.value = 0;
};

let addRangeDate = (date) => {
  if (rangeState.value === 2) {
    selectedRange.value = [];
    rangeState.value = 0;
  }
  selectedRange.value[rangeState.value] = date;
  rangeState.value++;
};

let emitSelection = () => {
  let modelFormat =
    typeof props.modelFormat === "function" ? props.modelFormat : (d) => d;
  if (props.rangeMode) {
    let formatted = selectedRange.value.map(modelFormat);
    emit("update:modelValue", formatted);
  } else {
    let formatted = modelFormat(selectedSingle.value);
    emit("update:modelValue", formatted);
  }
};

let handleMouseOverDay = (date) => {
  mouseOverDate.value = date;
};

let handleControlButtonClick = (action) => {
  if (action === "prev-month") {
    transitionDirection.value = "prev";
    setPrevMonth();
  } else if (action === "next-month") {
    transitionDirection.value = "next";
    setNextMonth();
  } else if (action === "prev-year") {
    transitionDirection.value = "prev";
    setPrevYear();
  } else if (action === "next-year") {
    transitionDirection.value = "next";
    setNextYear();
  }
};

let handleDayClicked = (date) => {
  if (props.rangeMode) {
    addRangeDate(date);
    if (rangeState.value == 2) {
      if (selectedRange.value[0] > selectedRange.value[1]) {
        selectedRange.value.reverse();
      }
      if (props.autoEmit) emitSelection();
    }
  } else {
    selectedSingle.value = date;
    if (props.autoEmit) emitSelection();
  }
};

let slotProps = reactive({
  days,
  names,
  today,
  current,
  selectedSingle,
  selectedRange,
  rangeState,
  rangeMode,
  mouseOverDate,
  events: {
    handleDayClicked,
    handleControlButtonClick,
    handleMouseOverDay,
  },
});

provide("days", days);
provide("names", names);
provide("today", today);
provide("current", current);
provide("events", {
  handleDayClicked,
  handleControlButtonClick,
  handleMouseOverDay,
});
provide("todayFormatted", todayFormatted);
provide("selectedSingle", selectedSingle);
provide("selectedRange", selectedRange);
provide("transition", transition);
provide("transitionDirection", transitionDirection);
provide("rangeMode", rangeMode);
provide("rangeState", rangeState);
provide("mouseOverDate", mouseOverDate);
</script>
