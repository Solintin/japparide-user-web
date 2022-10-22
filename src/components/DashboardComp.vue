<!-- eslint-disable -->
<template>
  <div class="w-full py-16 px-4">
    <h2 class="font-medium">
      Welcome Back,
      <span class="font-semibold">
        {{ currentUserData.first_name }} {{ currentUserData.last_name }}
      </span>
    </h2>
    <div class="mt-5">
      <div
        class="border border-red-500 p-4 rounded bg-red-100 text-xs md:text-sm mb-2"
        v-if="currentUserData.user_kyc_level != '1'"
      >
        Hello there, to finalize the process of opening your account & have your
        Middey Account allocated for receiving of funds, click on the link to
        get started.
        <router-link to="/kyc" class="font-bold text-blue-600"
          >- GET STARTED</router-link
        >
        <p class="text-right"><i> Takes approximately 3 mins </i></p>
      </div>
      <div class="grid md:grid-cols-2 items-stretch gap-4">
        <div class="card text-white flex flex-col justify-between">
          <div class="font-bold w-full flex items-center justify-between">
            <div class="flex space-x-2 items-center text-2xl">
              <div class="" v-if="showBalance">
                ₦{{ digitFormatter(acct_balance) }}
              </div>
              <div class="" v-else>₦XXXX</div>

              <button @click="showBalance = !showBalance" class="flex items-center">
                <i class="text-white text-base cursor-pointer fa-solid fa-eye"></i>
              </button>
            </div>
            <div
              class="grid place-content-center bg-[#311d1d] rounded-full h-6 w-6 mb-1"
            >
              <div
                @click="getBalance"
                :class="loading ? 'animate animate-spin' : null"
              >
                <i class="text-xs fa-solid fa-rotate"></i>
              </div>
            </div>
          </div>

          <div class="space-y-1">
            <div
              class="text-sm md:text-2xl text-gray-900 mt-5 md:mt-0"
              v-if="currentUserData.account_no_ng_default"
            >
              <div class="flex items-center space-x-2">
                <span>{{ currentUserData.account_no_ng_default }} </span>

                <button
                  @click="
                    handleCopy(`${currentUserData.account_no_ng_default}`)
                  "
                >
                  <i
                    class="text-white cursor-pointer md:text-base text-sm fa-solid fa-clone"
                  ></i>
                </button>
              </div>
              <div class="flex items-center justify-between space-x-2">
                <span>{{ currentUserData.bank_name_ng_default }} </span>
              </div>
              <div class="flex items-center justify-between space-x-2">
                <span>{{ currentUserData.account_name_ng_default }} </span>
              </div>
            </div>
            <div v-else class="text-xl mt-10">
              <div>Account Details</div>
              <button
                @click="Overlay = !Overlay"
                class="text-blue-900 font-medium text-sm"
              >
                View account Number
              </button>
            </div>
          </div>
        </div>
        <!-- Mobile view -->
        <div class="md:hidden grid grid-cols-2 gap-4">
          <button
            @click="handleSendModal"
            class="cursor-pointer flex flex-col items-center space-y-1 p-4 rounded-2xl tranform hover:-translate-y-2 duration-300 shadow-sm bg-blue-100"
          >
            <div
              class="grid place-content-center w-10 h-10 text-white bg-[#0192ED] p-4 rounded-full"
            >
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </div>
            <h2 class="font-medium text-lg">Send</h2>
            <h6 class="text-xs font-medium text-center text-[#00000090]">
              Send Money to any bank at low rate
            </h6>
          </button>
          <button
            @click="handleReceiveModal"
            class="flex flex-col items-center space-y-1 p-4 rounded-2xl tranform hover:-translate-y-2 duration-300 shadow-sm bg-green-200"
          >
            <div
              class="grid place-content-center w-10 h-10 text-white bg-green-500 p-4 rounded-full"
            >
              <i class="fa-solid fa-download"></i>
            </div>
            <h2 class="font-medium text-lg">Receive</h2>
            <h6 class="text-xs font-medium text-[#00000090] text-center">
              Receive Money from any bank at low rate
            </h6>
          </button>
          <div
            class="flex flex-col items-center space-y-1 p-4 rounded-2xl tranform hover:-translate-y-2 duration-300 shadow-sm bg-yellow-100 bg-opacity-60"
          >
            <div
              class="grid place-content-center w-10 h-10 text-white bg-yellow-400 p-4 rounded-full"
            >
              <i class="fas fa-money-bill-alt"></i>
            </div>
            <h2 class="font-medium text-lg">Bill Payment</h2>
            <h6 class="text-xs font-medium text-center">
              Airtime/Data, Electricity Recharge and DSTV subscription
              <small class="text-gray-500">(Coming soon)</small>
            </h6>
          </div>
          <div
            class="flex flex-col items-center space-y-1 p-4 rounded-2xl tranform hover:-translate-y-2 duration-300 shadow-sm bg-gray-200"
          >
            <div
              class="grid place-content-center w-10 h-10 text-white bg-gray-300 p-4 rounded-full"
            >
              <i class="fa fa-file" aria-hidden="true"></i>
            </div>
            <h2 class="font-medium text-lg">Payroll</h2>
            <h6 class="text-xs font-medium text-center">
              Automate payment of worker's salary and pension.
              <small class="text-gray-500">(Coming soon)</small>
            </h6>
          </div>
        </div>
        <!-- Desktop view -->
        <div class="hidden md:grid md:grid-cols-2 gap-4">
          <button
            class="flex flex-col space-y-1 p-4 rounded-md tranform hover:-translate-y-2 duration-300 shadow-sm bg-white cursor-pointer"
            @click="handleSendModal"
          >
            <div
              class="grid place-content-center w-10 h-10 text-white bg-[#0192ED] p-4 rounded-full"
            >
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </div>
            <h2 class="font-medium text-lg text-left">Send</h2>
            <h6 class="text-xs font-medium text-left">
              Send Money to any bank at low rate
            </h6>
          </button>
          <button
            @click="handleReceiveModal"
            class="flex flex-col space-y-1 p-4 rounded-md tranform hover:-translate-y-2 duration-300 shadow-sm bg-white"
          >
            <div
              class="grid place-content-center w-10 h-10 text-white bg-[#0192ED] p-4 rounded-full"
            >
              <i class="fa-solid fa-download"></i>
            </div>
            <h2 class="font-medium text-lg text-left">Receive</h2>
            <h6 class="text-xs font-medium text-left">
              Receive Money to any bank at low rate
            </h6>
          </button>
          <div
            class="flex flex-col space-y-1 p-4 rounded-md tranform hover:-translate-y-2 duration-300 shadow-sm bg-white"
          >
            <div
              class="grid place-content-center w-10 h-10 text-white bg-[#0192ED] p-4 rounded-full"
            >
              <i class="fas fa-money-bill-alt"></i>
            </div>
            <h2 class="font-medium text-lg">Bill Payment</h2>
            <h6 class="text-xs font-medium">
              Airtime/Data, Electricity Recharge and DSTV subscription
              <small class="text-gray-500">(Coming soon)</small>
            </h6>
          </div>
          <div
            class="flex flex-col space-y-1 p-4 rounded-md tranform hover:-translate-y-2 duration-300 shadow-sm bg-white"
          >
            <div
              class="grid place-content-center w-10 h-10 text-white bg-[#0192ED] p-4 rounded-full"
            >
              <i class="fa fa-file" aria-hidden="true"></i>
            </div>
            <h2 class="font-medium text-lg">Payroll</h2>
            <h6 class="text-xs font-medium">
              Automate payment of worker's salary and pension.
              <small class="text-gray-500">(Coming soon)</small>
            </h6>
          </div>
        </div>
      </div>
    </div>

    <div class="my-4">
      <Transaction
        :transactions="TransactionDetails"
        :loading="transactionLoader"
        :transactionMobileData="transactionMobileData"
      />
    </div>

    <div
      v-show="Overlay"
      @click="Overlay = !Overlay"
      :class="
        Overlay
          ? ' transform  translate-x-0'
          : ' transform  - translate-x-[1000px]'
      "
      class="px-10 flex justify-center cursor-pointer items-center overlay transform transition duration-300 bg-red-500"
    ></div>

    <div
      class="z-[12] booknow transform transition duration-300"
      v-show="Overlay"
      :class="Overlay ? ' translate-x-0' : '- translate-x-[1000px]'"
    >
      <div class="rounded-md bg-white px-4 pt-5 pb-1">
        <p class="text-left">
          We need some extra infomation in order to verify you &amp; generate
          your Account Number, click Continue below to proceed.
        </p>

        <div class="flex justify-between">
          <button
            @click="Overlay = !Overlay"
            class="bg-red-500 rounded my-4 py-3 px-4 text-[12px] font-medium text-white"
          >
            Cancel
          </button>
          <router-link
            to="/kyc"
            class="bg-green-500 rounded my-4 py-3 px-4 text-[12px] font-medium text-white"
          >
            Continue
          </router-link>
        </div>
      </div>
    </div>
    <Send :isOpen="isOpenSend" :close="handleSendModal" />
    <Receive :isOpen="isOpenReceive" :close="handleReceiveModal" />
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "axios";
import * as util from "@/Utils/helper_function";
import { mapGetters } from "vuex";
import Send from "./Send.vue";
import Receive from "./Receive.vue";
import Transaction from "./TransHistory.vue";
export default {
  name: "DashboardComponent",
  data() {
    return {
      Overlay: false,
      isOpenSend: false,
      isOpenReceive: false,
      loading: false,
      transactionLoader: false,
      showBalance: false,
      acct_balance: 0,
      TransactionDetails: [],
      transactionMobileData: {},
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
  },
  mounted() {
    this.getBalance();
    this.getTransactionHistory();
  },
  methods: {
    handleSendModal() {
      if (this.currentUserData.user_kyc_level == "1") {
        this.isOpenSend = !this.isOpenSend;
      } else {
        this.$router.push("kyc");
      }
    },
    handleReceiveModal() {
      if (this.currentUserData.user_kyc_level == "1") {
        this.isOpenReceive = !this.isOpenReceive;
      } else {
        this.$router.push("kyc");
      }
    },
    hideBalance() {
      this.showBalance = !this.showBalance;
    },
    generateAccountNumber() {
      if (
        this.currentUserData.nll_user_email_address_verified == "yes" &&
        this.currentUserData.phone_verified
      ) {
        this.$router.push("/kyc");
      } else {
        this.Overlay = this.Overlay;
      }
    },
    async handleCopy(item) {
      await navigator.clipboard.writeText(item).then(() => {
        this.$toast.success("Copied");
      });
    },
    getBalance() {
      this.loading = true;
      axios
        .get(
          `https://backend.middey.com/wp-json/rimplenet/v1/user-wallet-balance?user_id=${this.currentUserData.id}&wallet_id=ngn`
        )
        .then((response) => {
          this.acct_balance = response.data.data.ngn;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    getTransactionHistory() {
      this.transactionLoader = true;

      axios
        .get(
          `https://backend.middey.com/wp-json/rimplenet/v1/transactions?user_id=${this.currentUserData.id}`
        )
        .then((response) => {
          this.TransactionDetails = response.data.data;
          this.TransactionDetails.forEach((item) => {
            const date = item.post_date.split(" ")[0];
            if (this.transactionMobileData[date]) {
              this.transactionMobileData[date].push(item);
            } else {
              this.transactionMobileData[date] = [item];
            }
          });
          this.transactionLoader = false;
        })
        .catch((err) => {
          console.log(err);
          this.transactionLoader = false;
        });
    },
    digitFormatter(balance) {
      return util.digitFormatter(balance);
    },
  },
  components: { Transaction, Send, Receive },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  z-index: 11;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
.booknow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
}
.copy .icon {
  display: none;
}
.copy:hover .icon {
  display: flex;
}
.card {
  background: url("../assets/card-wallet.jpeg");
  background-size: cover;
  background-position: 50%;
  border-radius: 10px;
  display: flex;
  align-items: start;
  padding: 2rem;
}
</style>
