import Vue from "vue";
import App from "./App.vue";
import store from "./store";

// Registering components globally.
import "./components/register";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
