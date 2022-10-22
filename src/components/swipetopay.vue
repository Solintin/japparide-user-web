<!-- eslint-disable -->
<template>
  <div class="">
    <div class="w-full h-screen overflow-y-auto py-2">
      <div class="bg-white rounded-lg p-4 mt-2">
        <form @submit.prevent="handleSearch">
          <div class="mb-4 rounded flex border">
            <input
              type="search"
              name="email"
              placeholder="Business Email"
              v-model.trim="searchParam"
              class="bg-transparent w-full border-none outline-none flex-1 p-3"
            />
          </div>
          <button
            class="flex justify-center items-center space-x-3 bg-[#0192ED] text-white px-8 py-3 rounded"
            :disabled="loading"
          >
            <action-loader v-if="loading" />

            <div v-else class="font-medium">Search Merchant</div>
          </button>
        </form>

        <div v-if="isDataAvailable">
          <div class="font-bold text-sm md:text-xl mb-4 uppercase mt-6">
            {{ merchant.attributes.legal_registered_name }}
          </div>
          <div class="mb-4 rounded flex border">
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              v-model.trim="amount"
              class="bg-transparent w-full border-none outline-none flex-1 p-3"
            />
          </div>
          <!-- <div class="text-base mb-8">Amount: #2,500</div> -->
          <p class="">
            <span class="text-red-500">N/B:</span> Upon Successfull payments the
            merchant will be notified of this transaction via webhook
          </p>

          <div class="grid place-content-center mt-4">
            <drag-verify
              :width="width"
              :height="height"
              :text="text"
              :success-text="successText"
              :background="background"
              :progress-bar-bg="progressBarBg"
              :completed-bg="completedBg"
              :handler-bg="handlerBg"
              :handler-icon="''"
              :text-size="textSize"
              :success-icon="successIcon"
              :circle="getShape"
              @passcallback="successHandler"
            ></drag-verify>
          </div>

          <div class="flex justify-center items-center gap-4 mt-6">
            <div
              class="bg-blue-500 p-2 h-6 w-6 rounded-full grid place-content-center"
            >
              <i class="text-xs text-white fa fa-info"></i>
            </div>
            <span>Powered by Nellalink</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "axios";
import dragVerify from "vue-drag-verify";
import ActionLoader from "./ActionLoader.vue";

export default {
  name: "app",
  components: {
    dragVerify,
    ActionLoader,
  },
  data() {
    return {
      handlerIcon: "fa fa-angle-double-right",
      successIcon: "fa fa-check",
      background: "#cccccc",
      progressBarBg: "#FFFF99",
      completedBg: "#66cc66",
      handlerBg: "#fff",
      text: "Swipe to pay",
      successText: "success",
      width: 250,
      height: 40,
      textSize: "20px",
      isCircle: "true",

      amount : null,
      isDataAvailable: false,
      merchant : null,
      loading: false,
      searchParam: "",
    };
  },
  computed: {
    getShape() {
      return this.isCircle === "true";
    },
  },
  methods: {
    successHandler() {
      this.$toast.success("Payment Completed");
      
    },




    handleSearch() {
      this.loading = true
      axios
        .get(
          `https://pay-merchant.herokuapp.com/search?use=business_contact_email&value=${this.searchParam}`
        )
        .then((response) => {
          this.loading = false

          console.log(response.data.data);
           this.merchant = response.data.data;
          const { attributes } = response.data.data;

          if (attributes) {
            this.$toast.success("Merchant Retrieved Successfully");
            this.isDataAvailable = true;
          }else{
            this.$toast.error("Merchant not found");

          }

        }).catch(err=> {
          this.$toast.error("Merchant not found");

          console.log(err);
          this.loading = false

        });
    },

  },
};
</script>
