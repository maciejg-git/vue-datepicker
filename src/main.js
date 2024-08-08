import './assets/main.css'
import "./tailwind.css"
import DatepickerPlugin from "./components/datepicker"
import Tabs from "./components/tabs/Tabs.vue"
import TabsBar from "./components/tabs/TabsBar.vue"
import TabsBarItem from "./components/tabs/TabsBarItem.vue"
import TabsContainer from "./components/tabs/TabsContainer.vue"
import Tab from "./components/tabs/Tab.vue"

import { createApp } from 'vue'
import App from './App.vue'

let app = createApp(App)
app.use(DatepickerPlugin)
app.component("Tabs", Tabs)
app.component("TabsBar", TabsBar)
app.component("TabsBarItem", TabsBarItem)
app.component("TabsContainer", TabsContainer)
app.component("Tab", Tab)
app.mount('#app')
