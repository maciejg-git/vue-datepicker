<template>
  <div>
    <slot :single="single" :days="days"></slot>
  </div>
</template>

<script setup>
import { ref, provide, computed, defineProps, toRef } from "vue"

let props = defineProps({
  modelValue: {
    type: [Date, String, Array],
  },
  locale: {
    type: String,
    default: "en-GB",
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
  range: {
    type: Boolean,
    default: false,
  }
})

let emit = defineEmits(['update:modelValue'])

let single = ref("");
let range = ref([]);

let today = new Date();
today.setHours(0, 0, 0, 0);

let month = ref(today.getMonth());
let year = ref(today.getFullYear());

let getNumberRange = (from, count) => {
  return Array.from({ length: count }, (_, i) => i + from);
}

let locale = computed(() => {
  if (!props.locale) return navigator.language;
  return props.locale
});

let monthNames = computed(() => {
  return Array.from({ length: 12 }, (v, i) =>
    new Date(0, i, 1).toLocaleString(locale.value, {
      month: "short",
    })
  );
});

let dayNames = computed(() =>
  Array.from({ length: 7 }, (v, i) =>
    new Date(2021, 1, props.mondayFirstWeekday ? i + 1 : i).toLocaleString(
      locale.value,
      {
        weekday: "short",
      }
    )
  )
);

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
  let day = getFirstDay(year.value, month.value);
  let daysInMonth = getCountDaysInMonth(year.value, month.value);

  let days = getNumberRange(1, daysInMonth);
  days = days.map((i) => {
    return new Date(year.value, month.value, i);
  });

  // if (!props.adjacentMonths) {
  //   days = [...Array(day).fill(""), ...days];
  //   return { days };
  // }

  let { m, y } = prevMonth(month.value, year.value);
  let daysCountPrev = getCountDaysInMonth(y, m);
  let prevMonthDays = getNumberRange(daysCountPrev - day + 1, day);
  let nextMonthDays = getNumberRange(1, 42 - daysInMonth - day);
  return { daysInMonth, prevMonthDays, days, nextMonthDays };
});

let setNextMonth = () =>
  ({ m: month.value, y: year.value } = nextMonth(month.value, year.value));

let setPrevMonth = () =>
  ({ m: month.value, y: year.value } = prevMonth(month.value, year.value));

let setNextYear = () => ++year.value;

let setPrevYear = () => --year.value;

let transition = ref("")

let rangeState = ref(0);

let mouseOverRange = ref(null);

let addRangeDate = (date) => {
  if (rangeState.value == 2) {
    rangeState.value = 0;
    mouseOverRange.value = false;
    range.value = []
  }
  range.value[rangeState.value] = date;
  rangeState.value++;
};

let handleMouseOverDay = (date) => {
  mouseOverRange.value = date;
};

let handleControlButtonClick = (action) => {
  if (action === "prev-month") {
    transition.value = "prev"
    setPrevMonth()
  }
  if (action === "next-month") {
    transition.value = "next"
    setNextMonth()
  }
  if (action === "prev-year") {
    transition.value = "prev"
    setPrevYear()
  }
  if (action === "next-year") {
    transition.value = "next"
    setNextYear()
  }
}

let handleDayClicked = (date, event) => {
  // event.preventDefault()

  if (props.range) {
    addRangeDate(date);
    if (rangeState.value == 2) {
      if (range.value[0] > range.value[1]) range.value.reverse();
      emit("update:modelValue", range.value)
    }
  } else {
    single.value = date;
    emit("update:modelValue", single.value)
  }
}

// names
//   weekadays
//   months
// today
// current
//   month
//   year
// models
//   single
//   range
// range state
// mode
//   single
//   range
// mouse over date
// handles

provide("days", days)
provide("weekdays", dayNames)
provide("months", monthNames)
provide("today", today)
provide("currentDate", { month, year })
provide("events", { handleDayClicked, handleControlButtonClick, handleMouseOverDay })
provide("today", today)
provide("todayFormatted", todayFormatted)
provide("singleModel", single)
provide("rangeModel", range)
provide("transition", transition)
provide("rangeMode", toRef(props, "range"))
provide("rangeState", rangeState)
provide("mouseOverRange", mouseOverRange)
</script>
