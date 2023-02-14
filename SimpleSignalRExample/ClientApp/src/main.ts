import Vue from "vue";
import "./plugins/axios";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
