<!-- eslint-disable -->
<template>
  <div>
    <div class="w-full h-screen overflow-y-auto py-16 px-4">
      <div class="bg-white rounded-lg p-4 mt-5">
        <div class="flex flex-col space-y-2 divide-y">
          <div class="flex flex-col space-y-2">
            <div class="font-bold space-x-2">
              <div>Profile Name</div>
            </div>
            <div class="text-gray-500">
              <span class="">
                {{ currentUserData.first_name }}
                {{ currentUserData.last_name }}
              </span>
            </div>
          </div>
          <div class="flex flex-col space-y-2">
            <div class="font-bold space-x-2">
              <div>UserName</div>
            </div>
            <div class="text-gray-500">
              <span class="f">
                {{ currentUserData.username }}
              </span>
            </div>
          </div>
          <div class="flex justify-between items-center py-2">
            <div class="flex flex-col space-y-2">
              <div class="font-bold flex space-x-2">
                <div>Email</div>
                <div
                  v-if="
                    currentUserData.nll_user_email_address_verified == 'yes'
                  "
                  class="verified"
                >
                  Verified
                </div>
                <div v-else class="not-verified">Not verified</div>
              </div>
              <div class="text-gray-500">{{ currentUserData.user_email }}</div>
            </div>
            <button
              v-if="currentUserData.nll_user_email_address_verified !== 'yes'"
              @click="verifyUserEmail"
              class="bg-blue-500 text-white md:text-base text-xs rounded py-2 px-3"
              :class="loadingVerifyEmail ? 'cursor-not-allowed' : ''"
              :disabled="loadingVerifyEmail"
            >
              <ActionLoader1 v-if="loadingVerifyEmail" />

              <div v-else class="font-medium">Verify</div>
            </button>
          </div>
          <div class="flex justify-between items-center py-2">
            <div class="flex flex-col space-y-2">
              <div class="font-bold flex space-x-2">
                <div>Phone</div>
                <div v-if="currentUserData.phone_verified" class="verified">
                  Verified
                </div>
                <div v-else class="not-verified">Not verified</div>
              </div>
              <div class="text-gray-500" v-if="!currentUserData.phone_number">
                +234 XXX-XXX-XXX
              </div>
              <div class="text-gray-500" v-else>
                {{ currentUserData.phone_number }}
              </div>
            </div>
            <button
              v-if="!currentUserData.phone_verified"
              @click="verifyUserPhone"
              class="bg-blue-500 text-white md:text-base text-xs rounded py-2 px-3"
              :class="loadingVerifyPhone ? 'cursor-not-allowed' : ''"
              :disabled="loadingVerifyPhone"
            >
              <ActionLoader2 v-if="!showPhoneOTP && loadingVerifyPhone" />

              <div v-else class="font-medium">Verify</div>
            </button>
          </div>

          <div class="flex justify-between items-center py-2">
            <div class="flex flex-col space-y-2">
              <div class="font-bold flex space-x-2">
                <div>BVN</div>
                <div
                  v-if="currentUserData.user_kyc_level == '1'"
                  class="verified"
                >
                  Verified
                </div>
                <div v-else class="not-verified">Not verified</div>
              </div>
              <div class="text-gray-500">XXXXXXXXX</div>
            </div>
            <router-link
              to="/kyc"
              v-if="currentUserData.user_kyc_level != '1'"
              class="bg-blue-500 text-white md:text-base text-xs rounded py-2 px-3"
            >
              <div class="font-medium">Verify</div>
            </router-link>
          </div>

          <div class="flex justify-between items-center py-2">
            <div class="flex flex-col space-y-2">
              <div class="font-bold space-x-2">
                <div>Change Password</div>
              </div>
              <div class="text-gray-500">Request for a change of password</div>
            </div>
            <button
              @click="requestChangePasswordToken"
              class="bg-blue-500 text-white md:text-base text-xs rounded py-2 px-3"
            >
              <ActionLoader v-if="loadingReset" />

              <div v-else class="font-medium">Request</div>
            </button>
          </div>
          <div
            v-if="
              currentUserData.nll_user_email_address_verified &&
              currentUserData.phone_verified &&
              !currentUserData.bank_name_ng_default
            "
            class="mt-4 text-xs md:text-base py-2 space-y-2"
          >
            <p class="">
              Click the below button to update your KYC and procees settlement
              account details
            </p>
            <router-link
              to="/kyc"
              class="bg-blue-500 text-white md:text-base text-xs rounded mt-1 py-2 px-3"
            >
              Continue
            </router-link>
          </div>

          <div class="flex justify-between items-center py-2">
            <div class="flex flex-col space-y-2">
              <div class="font-bold flex space-x-2">
                <div>Deactivate Account</div>
              </div>
              <div class="text-gray-500">
                Do you wish to
                <span class="text-red-500 font-bold">close</span> your account?
              </div>
            </div>
            <router-link
              to="/deactivate-account"
              class="bg-red-500 text-white md:text-base text-xs rounded py-2 px-3"
            >
              <div class="font-medium">Deactivate</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL MODAL MODAL -->
    <div>
      <div
        v-show="showPhoneOTP"
        @click="showPhoneOTP = !showPhoneOTP"
        :class="
          showPhoneOTP
            ? ' transform  translate-x-0'
            : ' transform  - translate-x-[1000px]'
        "
        class="px-10 flex justify-center cursor-pointer items-center overlay transform transition duration-300 bg-red-500"
      ></div>

      <div
        class="z-10 booknow transform transition duration-300"
        v-show="showPhoneOTP"
        :class="showPhoneOTP ? ' translate-x-0' : '- translate-x-[1000px]'"
      >
        <div class="rounded-md bg-white px-4 py-5">
          <div class="flex justify-end mb-b">
            <div @click="showPhoneOTP = !showPhoneOTP">
              <i class="fa-solid text-red-500 fa-close"></i>
            </div>
          </div>

          <label class="font-medium mb-2">Phone Number</label>
          <div class="my-2 rounded flex border items-center">
            <input
              type="number"
              maxlength="11"
              name="tel"
              v-model.trim="phone_number"
              @keypress.enter="updatePhoneAndVerify"
              class="bg-transparent border-none outline-none flex-1 p-3"
            />
          </div>
          <div>
            <small
              v-if="!$v.phone_number.required && $v.phone_number.$dirty"
              class="text-red-500"
            >
              Phone Number is required!
            </small>
          </div>

          <button
            @click="updatePhoneAndVerify"
            class="bg-blue-500 flex justify-center text-white md:text-base text-xs rounded py-2 px-3 w-full"
            :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <ActionLoader3 v-if="loading" />

            <div v-else class="font-medium">Verify</div>
          </button>
        </div>
      </div>
    </div>
    <!-- MODAL MODAL MODAL -->
  </div>
</template>
<!-- eslint-disable -->
<script>
import axiosInstance from "@/Utils/axios.config.js";
import PincodeInput from "vue-pincode-input";

import { validationMixin } from "vuelidate";
import { required, minLength, numeric } from "vuelidate/lib/validators";
import axios from "axios";
import { mapGetters } from "vuex";
import ActionLoader from "../../components/ActionLoader.vue";
import ActionLoader1 from "../../components/ActionLoader.vue";
import ActionLoader2 from "../../components/ActionLoader.vue";
import ActionLoader3 from "../../components/ActionLoader.vue";
export default {
  name: "Settings",
  mixins: [validationMixin],
  validations: {
    phone_number: {
      required,
      numeric,
      minLength: minLength(11),
    },
  },
  data() {
    return {
      loadingReset: false,
      loadingVerifyEmail: false,
      loadingVerifyPhone: false,
      loading: false,
      showPhoneOTP: false,
      phone_number: "",
      type: "password",
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
  },
  mounted() {
    this.phone_number = this.currentUserData.phone_number
      ? this.currentUserData.phone_number
      : "";
  },
  methods: {
    verifyUserEmail() {
      this.loadingVerifyEmail = true;

      axiosInstance
        .get(
          `/verify-email-address/?email_address=${this.currentUserData.user_email}&fire_email=true`
        )
        .then((response) => {
          console.log(response.data);
          this.$toast.success("Verification Email Sent");
          this.loadingVerifyEmail = false;

          this.$router.push(
            `/verify_email?verification_email=${this.currentUserData.user_email}`
          );
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error);

          this.loadingVerifyEmail = false;

          console.log(error);
        });
    },
    verifyPhoneNumber() {
      this.loadingVerifyPhone = true;

      let payload = {
        phone: parseInt(this.phone_number),
      };
      axios
        .post("https://middey.baremind.co.za/api/phone", payload)
        .then((response) => {
          console.log(response.data);
          this.$toast.success("OTP sent successfully");
          this.loadingVerifyPhone = false;

          this.$router.push(`/verify_phone?phone_number=${this.phone_number}`);
        })
        .catch((error) => {
          this.$toast.error(error.response.data.error);
          this.loadingVerifyPhone = false;

          console.log(error);
        });
    },
    async verifyUserPhone() {
      this.showPhoneOTP = !this.showPhoneOTP;
    },
    updatePhoneAndVerify() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.verifyPhoneNumber(this.phone_number);
      }
    },
    requestChangePasswordToken() {
      this.loadingReset = true;

      localStorage.setItem(
        "verification_email",
        this.currentUserData.user_email
      );

      axiosInstance
        .get(
          `/change-password/?email_address=${this.currentUserData.user_email}&fire_email=true`
        )
        .then((response) => {
          console.log(response.data);
          this.$toast.success("Request token sent to email");
          this.loadingReset = false;
          this.$router.push("/changepassword");
        })
        .catch((error) => {
          if (error.response.data) {
            this.$toast.error(error.response.data.message);
          }
          this.loadingReset = false;

          console.log(error);
        });
    },
    async updatePhone() {
      let payload = {
        Phone: this.currentUserData.phone_number,
      };
      await axios
        .post("https://middey.baremind.co.za/api/phone", payload)
        .then((res) => {})
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    showPassword() {
      this.showPasswordtoggle = !this.showPasswordtoggle;
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.signIn();
      }
    },
  },
  components: {
    PincodeInput,
    ActionLoader,
    ActionLoader1,
    ActionLoader2,
    ActionLoader3,
  },
};
</script>

<style scoped>
.otp-input {
  width: 10px;
  height: 10px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input.error {
  border: 1px solid red !important;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.verified {
  @apply bg-green-200 text-green-700 font-bold text-[10px] py-[4px] px-2 rounded-3xl;
}
.not-verified {
  @apply bg-pink-200 text-pink-700 font-bold text-[10px] py-[4px] px-2 rounded-3xl;
}

.overlay {
  position: fixed;
  z-index: 10;
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
</style>
