<!-- eslint-disable -->
<template>
  <div>
    <div
      :class="
        isOpen
          ? ' transform  translate-x-0'
          : ' transform  -translate-x-[10000px]'
      "
      class="overlay px-10 flex justify-center items-center transform"
    >
      <div class="z-[12] w-[400px] transform transition duration-300">
        <div class="rounded-md bg-white px-4 pt-12 pb-8">
          <div
            class="text-sm md:text-2xl text-gray-900 mt-5 md:mt-0 space-y-4"
            v-if="currentUserData.account_no_ng_default"
          >
            <div
              class="flex items-center border rounded justify-between p-4 space-x-2"
            >
              <span ref="acctNumber"
                >{{ currentUserData.account_no_ng_default }}
              </span>
              <button
                @click="handleCopy(`${currentUserData.account_no_ng_default}`)"
              >
                <i
                  class="text-blue-400 cursor-pointer md:text-xl text-sm fa-solid fa-clone"
                ></i>
              </button>
            </div>
            <div class="flex items-center border rounded p-4 space-x-2">
              <span>{{ currentUserData.bank_name_ng_default }} </span>
            </div>
            <div class="flex items-center border rounded p-4 space-x-2">
              <span>{{ currentUserData.account_name_ng_default }} </span>
            </div>
          </div>
          <div v-else class="text-xl mt-10 text-center font-medium">
            <p>
              You are not fully verified, to generate middey account details
              click the below button to complete/submit your settlement details
            </p>
            <router-link to="/kyc" class="text-blue-900 font-font text-sm mt-4">
              Generate Account Number
            </router-link>
          </div>
          <h6 v-if="!currentUserData.no_of_credits_for_this_month" class="text-xs font-medium text-green-600 my-2">
           🎉Congratulations! You now have access to 3 free credit transfers monthly.
          </h6>
          <h6 v-else-if="currentUserData.no_of_credits_for_this_month == 1" class="text-xs font-medium text-green-600 my-2">
           You now have access to 2 free credit transfers left.
          </h6>
          <h6 v-else-if="currentUserData.no_of_credits_for_this_month == 2" class="text-xs font-medium text-green-600 my-2">
           You now have access to 1 free credit transfer left.
          </h6>
          

          <div class="mt-4 flex justify-center">
            <button
              @click="close"
              class="border w-full border-red-500 rounded my-4 py-3 px-4 text-[12px] font-medium text-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import { mapGetters } from "vuex";

export default {
  name: "receive",
  props: ["isOpen", "close"],

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
  },
  mounted() {},
  methods: {
    async handleCopy(item) {
      await navigator.clipboard.writeText(item).then(() => {
        this.$toast.success("Copied");
      });
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.3s linear;
}
.booknow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
}
</style>
