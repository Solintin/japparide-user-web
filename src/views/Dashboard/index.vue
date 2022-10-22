<!-- eslint-disable -->
<template>
  <div class="flex min-h-screen">
    <!-- <div
      class="toggle-menu px-4 bg-white fixed top-0 inset-x-0 flex justify-between items-center"
    >
      <a href="/dashboard" class="font-bold text-[#0192ED]">
        <img src="@/assets/Middey_Horizontal.png" class="logo" />
      </a>
      <div class="space-x-6 flex items-center">
        <button class=" ">
          <i class="fa-solid text-xl fa-bell"></i>
        </button>

        <button @click="toggle" class=" ">
          <i class="fa-solid text-xl fa-bars"></i>
        </button>
      </div>
    </div> -->

    <div
      class="md:ml-[300px] px-4 py-3 bg-white text-[#000000] fixed top-0 inset-x-0 flex justify-between items-center"
    >
      <div class="font-bold capitalize flex gap-4 items-center">
        <button @click="toggle" class="md:hidden block">
          <i class="fa-solid text-xl fa-bars"></i>
        </button>
        <a href="/dashboard" class="font-bold text-[#0192ED]">
          <img src="@/assets/Middey_Horizontal.png" class="logo" />
        </a>
      </div>
      <div class="space-x-6 flex items-center">
        <button class=" ">
          <i class="fa-solid text-xl fa-bell"></i>
        </button>

        <button class=" ">
          <router-link to="/settings"
            ><img
              src="@/assets/Svg/user.svg"
              class="object-fit md:h-10 h-8 md:w-10 w-8"
          /></router-link>
        </button>
      </div>
    </div>

    <div
      v-if="isMobile"
      class="inset-0 bg-[#00000050] z-[3] absolute"
      @click="toggle"
    ></div>
    <div
      :class="[isMobile ? 'isOpen' : null, 'sidebar']"
      class="sidebar transform duration-500 md:w-[300px] w-[280px] z-10 h-screen md:flex flex-col justify-between bg-white pb-10"
    >
      <div>
        <div
          class="grid place-content-center mx-auto uppercase text-white font-bold text-xl bg-[#0192ED] rounded-full h-28 w-28 mt-4 mb-3"
        >
          {{ currentUserData.first_name.charAt(0)
          }}{{ currentUserData.last_name.charAt(0) }}
        </div>
        <h2 class="font-medium mb-6 text-center">
          <span class="font-semibold">
            {{ currentUserData.first_name }} {{ currentUserData.last_name }}
          </span>
        </h2>

        <div class="mt-4 px-5 space-y-2" @click="isMobile = false">
          <!-- Dashboard -->

          <router-link
            to="/dashboard"
            class="flex items-center hover:bg-[#0192ED90] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('dashboard')
                ? 'bg-[#0192ED90] text-[#ffffffdb]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-home text-base`"></i
            ></span>
            <div class="w-10/12">Home</div>
          </router-link>

          <!-- Kyc -->

          <router-link
            to="/kyc"
            class="flex items-center hover:bg-[#0192ED90] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('kyc')
                ? 'bg-[#0192ED90] text-[#ffffffdb]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-file text-base`"></i
            ></span>
            <div class="w-10/12">KYC/Compliance</div>
          </router-link>
          <div
            class="border-b-2 border-gray-300 -translate-x-[20px] w-[300px] transform"
          ></div>
          <!-- Transaction -->

          <div class="mt-8">
            <router-link
              to="transaction"
              class="flex items-center hover:bg-[#0192ED90] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 mt-6 py-2"
              :class="
                isActiveRoute('transaction')
                  ? 'bg-[#0192ED90] text-[#ffffffdb]'
                  : 'text-[#515352]'
              "
            >
              <span class="w-2/12">
                <i :class="`fa-solid fa-exchange text-base`"></i
              ></span>
              <div class="w-10/12">Transactions</div>
            </router-link>
          </div>
          <!-- Employee -->

          <router-link
            to="#"
            class="flex items-center hover:bg-[#0192ED90] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('employee')
                ? 'bg-[#0192ED90] text-[#ffffffdb]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-users text-base`"></i
            ></span>
            <div class="w-10/12">
              Employees
              <small class="text-[10px] text-gray-600">(Coming Soon)</small>
            </div>
          </router-link>

          <!-- Payroll -->

          <router-link
            to="#"
            class="flex items-center hover:bg-[#0192ED90] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('payroll')
                ? 'bg-[#0192ED90] text-[#ffffffdb]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-credit-card text-base`"></i
            ></span>
            <div class="w-10/12">
              Payroll
              <small class="text-[10px] text-gray-600">(Coming Soon)</small>
            </div>
          </router-link>

          <!-- Swipetopay -->
          <router-link
            to="/swipetopay"
            class="flex items-center hover:bg-[#0192ED90] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('swipetopay')
                ? 'bg-[#0192ED90] text-[#ffffffdb]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-money-check-dollar text-base`"></i
            ></span>
            <div class="w-10/12">Pay Merchant</div>
          </router-link>

          <!-- Settings -->
          <router-link
            to="/settings"
            class="flex items-center hover:bg-[#0192ED90] hover:text-[#ffffffdb] transition-all transform duration-500 font-medium rounded-md px-5 py-2"
            :class="
              isActiveRoute('settings')
                ? 'bg-[#0192ED90] text-[#ffffffdb]'
                : 'text-[#515352]'
            "
          >
            <span class="w-2/12">
              <i :class="`fa-solid fa-cog text-base`"></i
            ></span>
            <div class="w-10/12">Settings</div>
          </router-link>
        </div>
      </div>

      <div class="border-y-2 py-2 border-gray-300">
        <div
          class="flex items-center transform duration-500 transition-all font-medium text-base rounded-md hover:bg-[#0192ED90] hover:text-[#ffffffdb] mx-5 px-5 py-2 mt-2 cursor-pointer"
        >
          <div class="w-2/12"><i class="fa-solid fa-network-wired"></i></div>
          <div
            @click="toggleIntegration"
            class="w-10/12 flex justify-between items-center"
          >
            <div>Integrations</div>
            <div><i class="fa-solid fa-angle-down"></i></div>
          </div>
        </div>

        <div
          v-if="isIntegrationActive"
          class="ml-20 flex flex-col text-xs md:text-sm font-medium space-y-2"
        >
          <div class="flex space-x-2">
            <div><i class="fa-solid fa-angles-right"></i></div>
            <div>Scan to Pay</div>
          </div>
          <div class="flex space-x-2">
            <div><i class="fa-solid fa-angles-right"></i></div>
            <div>Ding by Nellalink</div>
          </div>
          <div class="flex space-x-2">
            <div><i class="fa-solid fa-angles-right"></i></div>
            <div>Smart Orders by Rimplates</div>
          </div>
        </div>
      </div>

      <div
        @click="logout"
        class="flex items-center transform duration-500 transition-all font-medium text-base rounded-md hover:bg-[#0192ED90] hover:text-[#ffffffdb] mx-5 px-5 mt-10 py-2 cursor-pointer"
      >
        <span class="w-2/12">
          <i class="fa-solid fa-arrow-right-from-bracket"></i
        ></span>
        <div class="w-10/12">Logout</div>
      </div>
    </div>
    <div class="main h-screen">
      <router-view></router-view>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import { mapGetters } from "vuex";
export default {
  name: "admin",
  data() {
    return {
      isMobile: false,
      isIntegrationActive: false,
    };
  },
  watch: {
    // checkActivity() {
    //   if (this.checkActivity) {
    //     this.logout();
    //     this.$swal("Timeout, Your session has expired");
    //   }
    // },
  },
  computed: {
    currentPath() {
      return this.$route.path;
    },
    pageHeader() {
      return this.$route.name;
    },
    checkMobile() {
      return this.isMobile;
    },
    checkActivity() {
      return this.$store.state.idleVue.isIdle;
    },
    ...mapGetters(["currentUserData"]),
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
      localStorage.removeItem("vuex");
    },
    toggle() {
      this.isMobile = !this.isMobile;
    },
    toggleIntegration() {
      this.isIntegrationActive = !this.isIntegrationActive;
    },
    isActiveRoute(route) {
      if (this.currentPath.toLowerCase().includes(route)) {
        return true;
      }
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped>
.toggle-menu {
  display: none;
}
.sidebar {
  position: fixed;
  min-width: 300px;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  @apply overflow-x-hidden;
}
.sidebar::-webkit-scrollbar {
  width: 4px;
}
.sidebar::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background: #999;
}
.main {
  margin-left: 300px;
  width: 100%;
}
.logo {
  width: 200px;
  height: 40px;
  object-fit: contain;
}
@media screen and (max-width: 640px) {
  .logo {
    width: 100px;
    height: 20px;
    object-fit: contain;
  }
  .toggle-menu {
    display: flex;
  }

  .main {
    margin-left: 0;
  }

  .sidebar {
    left: -100vw;
    transition: all 0.2s linear;
  }
  .sidebar.isOpen {
    left: 0;
  }
}
</style>
