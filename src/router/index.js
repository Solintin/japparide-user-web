/*eslint-disable  */

import Vue from "vue";
import VueRouter from "vue-router";
//Homepage Routes
import Home from "@/views/index.vue";

// Auth Routes
import LoginDriver from "@/views/login-driver.vue";
import RegisterDriver from "@/views/register-driver.vue";
import LoginUser from "@/views/login-user.vue";
import RegisterUser from "@/views/register-user.vue";
// import Forgotpassword from "@/views/forgotpassword.vue";
// import Resetpassword from "@/views/resetpassword.vue";
// import Changepassword from "@/views/changepassword.vue";
// import BlockedPage from "@/views/blocked.vue";
// import AccountDeactivation from "@/views/deactivate.vue";

// // Dasboard Routes
import Index from "@/views/Dashboard/index.vue";
import AwaitingRide from "@/views/Dashboard/driver.vue";
// import VerifyEmail from "@/views/Dashboard/VerifyEmail.vue";
// import VerifyPhone from "@/views/Dashboard/VerifyPhone.vue";
// import Dashboard from "@/views/Dashboard/dashboard.vue";
// import Kyc from "@/views/Dashboard/kyc.vue";
// import Settings from "@/views/Dashboard/settings.vue";
// import Transaction from "@/views/Dashboard/transactionpage.vue";
// import SetupBiometric from "@/views//SetupBio.vue";
// import LoginWithBiometric from "@/views/loginwithbiometric.vue";
// import MobileLogin from "@/views/MobileLogin.vue";
// import Swipetopay from "@/views/Dashboard/swipepay.vue";
import store from "@/store";

const routeGuard = (to, from, next) => {
  const { isLoggedIn } = store.getters.data;
  const { rimplenet_account_status } = store.getters.currentUserData;

  if (
    to.matched.some((record) => record.meta.requiresLogin) &&
    isLoggedIn &&
    rimplenet_account_status != "Blocked"
  ) {
    next();
  } else {
    next("/");
  }
};
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/login",
    name: "LoginUser",
    component: LoginUser,
  },
  {
    path: "/register",
    name: "registerUser",
    component: RegisterUser,
  },
  {
    path: "/login-driver",
    name: "LoginDriver",
    component: LoginDriver,
  },
  {
    path: "/register-driver",
    name: "RegisterDriver",
    component: RegisterDriver,
  },

  {
    path: "/dashboard",
    name: "DashboardIndex",
    component: Index,
    children: [
      {
        path: "/driver",
        name: "Driver",
        component: AwaitingRide,
        // meta: {
        //   requiresLogin: true,
        //   title:
        //     "Dashboard | Modern Era payments solutions and accounting platform",
        // },
        // beforeEnter: routeGuard,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
