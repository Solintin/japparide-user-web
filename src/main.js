import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import OtpInput from "@bachdgvn/vue-otp-input";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";


//Swipee

import VueSweetalert2 from "vue-sweetalert2";
/* eslint-disable  */

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
// import IdleVue from "idle-vue";

import VueCountryDropdown from "vue-country-dropdown";
import WebCam from 'vue-web-cam'

Vue.use(VueCountryDropdown);
Vue.use(WebCam)
Vue.use(VueSweetalert2);
Vue.component("v-otp-input", OtpInput);

// const eventsHub = new Vue();
// const sessionTime = window.location.pathname.toLowerCase().includes("kyc")
//   ? 5 * 60 * 1000
//   : 2 * 60 * 1000;

// Vue.use(IdleVue, {
//   eventEmitter: eventsHub,
//   store,
//   idleTime: sessionTime, // 5 seconds
//   startAtIdle: false,
// });

const options = {
  position: "top-center",
};

Vue.use(ElementUI);
Vue.use(Toast, options);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
