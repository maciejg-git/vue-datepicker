import './assets/main.css'
import "./tailwind.css"
import DatepickerPlugin from "./components"

import { createApp } from 'vue'
import App from './App.vue'

let app = createApp(App)
app.use(DatepickerPlugin)
app.mount('#app')
