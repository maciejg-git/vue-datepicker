import './assets/main.css'
import "./tailwind.css"
import DatepickerPlugin from "./components/datepicker"
import TabsPlugin from "./components/tabs"

import { createApp } from 'vue'
import App from './App.vue'

let app = createApp(App)
app.use(DatepickerPlugin)
app.use(TabsPlugin)
app.mount('#app')
