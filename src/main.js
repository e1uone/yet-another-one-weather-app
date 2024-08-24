import "./styles/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import ToastPlugin from "vue-toast-notification";

import "vue-toast-notification/dist/theme-default.css";
const app = createApp(App);

app.config.errorHandler = (err, vm, info) => {
  console.error("Error:", err);
  console.error("Vue component:", vm);
  console.error("Additional info:", info);
};
app.use(ToastPlugin);
app.mount("#app");
