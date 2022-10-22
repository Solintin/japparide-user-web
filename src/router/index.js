/*eslint-disable  */

import Vue from "vue";
import VueRouter from "vue-router";
//Homepage Routes
import Home from "@/views/index.vue";

// Auth Routes
import Login from "@/views/login.vue";
// import Register from "@/views/register.vue";
// import Forgotpassword from "@/views/forgotpassword.vue";
// import Resetpassword from "@/views/resetpassword.vue";
// import Changepassword from "@/views/changepassword.vue";
// import BlockedPage from "@/views/blocked.vue";
// import AccountDeactivation from "@/views/deactivate.vue";

// // Dasboard Routes
// import Index from "@/views/Dashboard/index.vue";
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
    name: "Login",
    component: Login,
  },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: Register,
  // },
  // {
  //   path: "/forgotpassword",
  //   name: "Forgotpassword",
  //   component: Forgotpassword,
  // },
  // {
  //   path: "/resetpassword",
  //   name: "Resetpassword",
  //   component: Resetpassword,
  // },
  // {
  //   path: "/changepassword",
  //   name: "changepassword",
  //   component: Changepassword,
  // },
  // {
  //   path: "/verify_email",
  //   name: "VerifyEmail",
  //   component: VerifyEmail,
  // },
  // {
  //   path: "/verify_phone",
  //   name: "VerifyPhone",
  //   component: VerifyPhone,
  // },
  // {
  //   path: "/blocked",
  //   name: "blocked",
  //   component: BlockedPage,
  // },
  // {
  //   path: "/deactivate-account",
  //   name: "AccountDeactivation",
  //   component: AccountDeactivation,
  // },
  // {
  //   path: "/setupbiometric",
  //   name: "SetupBiometric",
  //   component: SetupBiometric,
  // },
  // {
  //   path: "/loginwithbiometric",
  //   name: "loginwithbiometric",
  //   component: LoginWithBiometric,
  // },
  // {
  //   path: "/biometrics",
  //   name: "MobileLogin",
  //   component: MobileLogin,
  // },
  // {
  //   path: "/index",
  //   name: "DashboardIndex",
  //   component: Index,
  //   children: [
  //     {
  //       path: "/dashboard",
  //       name: "dashboard",
  //       component: Dashboard,
  //       meta: {
  //         requiresLogin: true,
  //         title:
  //           "Dashboard | Modern Era payments solutions and accounting platform",
  //       },
  //       beforeEnter: routeGuard,
  //     },
  //     {
  //       path: "/transaction",
  //       name: "transaction",
  //       component: Transaction,
  //       meta: {
  //         requiresLogin: true,
  //         title:
  //           "Transactions | Modern Era payments solutions and accounting platform",
  //       },
  //       beforeEnter: routeGuard,
  //     },
  //     {
  //       path: "/kyc",
  //       name: "kyc",
  //       component: Kyc,
  //       meta: {
  //         requiresLogin: true,
  //       },
  //       beforeEnter: routeGuard,
  //     },
  //     {
  //       path: "/settings",
  //       name: "Settings",
  //       component: Settings,
  //       meta: {
  //         requiresLogin: true,
  //       },
  //       beforeEnter: routeGuard,
  //     },
  //     {
  //       path: "/swipetopay",
  //       name: "swipetopay",
  //       component: Swipetopay,
  //       meta: {
  //         requiresLogin: true,
  //       },
  //       beforeEnter: routeGuard,
  //     },
  //   ],
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
