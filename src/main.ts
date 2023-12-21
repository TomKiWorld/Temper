import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { PiniaHistory } from "@/plugins/PiniaHistory";
import "./assets/css/base.scss";

const pinia = createPinia();
pinia.use(PiniaHistory);

createApp(App).use(pinia).mount("#app");
