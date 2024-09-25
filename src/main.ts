import { createApp } from "vue";
import { createPinia } from "pinia";
import { formRules } from "./utils/formRules";
import { plugin, defaultConfig } from "@formkit/vue";

import config from "./formkit.config";
import App from "./App.vue";
import router from "./router";

import "./index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig(config));

app.mount("#app");

formRules();
