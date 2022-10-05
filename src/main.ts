import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(ElementPlus);
app.use(pinia);
app.use(router);

app.mount("#app");
