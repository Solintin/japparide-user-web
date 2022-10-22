<!-- eslint-disable -->
<template>
  <div class="h-screen">
    <div class="grid md:grid-cols-12">
      <div
        class="col-span-5 hidden h-screen bg-[#0192ED] md:grid place-content-center"
      >
        <div class="flex flex-col items-center">
          <img
            src="@/assets/middey-logo.png"
            alt=""
            class="h-[170px] w-[170px] object-contain"
          />
          <h5 class="text-white -mt-4">Explore banking with Middey</h5>
          <div class="w-[100px] h-[3px] bg-white my-1"></div>
          <div class="text-center text-white px-10 font-medium mt-4">
            Welcome to the future of banking with Middey.
            <div>Middey offers world class-banking services,</div>
            <div>made just for you.</div>
          </div>
        </div>
      </div>
      <div
        class="col-span-7 h-screen bg-[#fff] flex flex-col justify-center items-center"
      >
        <div class="mx-auto block md:hidden">
          <img
            src="@/assets/middey-logowhitebg.png"
            alt=""
            class="h-[200px] w-[200px] object-contain"
          />
        </div>
        <div
          class="login_box py-40 flex flex-col justify-center items-center space-y-4"
        >
          <div
            class="grid place-content-center animate animate-pulse w-20 h-20 text-white bg-[#0192ED] p-4 rounded-full"
          >
            <i class="fa fa-paper-plane text-3xl" aria-hidden="true"></i>
          </div>
          <p class="mb-2">
            Please Insert the six digit OTP code sent to your phone number.
          </p>
          <CodeInput
            v-on:change="onChange"
            v-model="pin"
            :type="'text'"
            :loading="false"
            class="input"
            :fieldWidth="40"
            :fieldHeight="40"
          />

          <p v-if="!$v.pin.minLength" class="text-red-500">
            Pin must be 6 characters
          </p>
          <p v-if="!$v.pin.required && $v.pin.$dirty" class="text-red-500">
            Pin is required!
          </p>

          <button
            @click="submitToken"
            class="bg-[#0192ED] flex justify-center md:w-8/12 w-full rounded my-4 py-3 px-4 text-[12px] md:text-xl font-medium text-white"
            :class="loadingState ? 'cursor-not-allowed' : ''"
            :disabled="loadingState"
          >
            <ActionLoader v-if="loadingState" />

            <div v-else class="font-medium text-sm">Verify Phone</div>
          </button>
          <div class="text-sm font-medium mt-4 text-center">
            Already Verified?
            <span
              ><router-link to="/" class="text-[#0192ED] font-semibold"
                >Sign in
              </router-link></span
            >
            |
            <span
              ><router-link to="/register" class="text-[#0192ED] font-semibold"
                >Register
              </router-link></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import CodeInput from "vue-verification-code-input";
import { getUsers } from "@/Utils/getUser.js";

import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import PincodeInput from "vue-pincode-input";
import axios from "axios";
import ActionLoader from "../../components/ActionLoader.vue";
export default {
  name: "VerifyPhone",
  props: [],
  mixins: [validationMixin],
  components: { PincodeInput, CodeInput, ActionLoader },

  data() {
    return {
      pin: "",
      loadingState: false,
    };
  },

  computed: {
    ...mapState(["loading", "currentUserData", "currentUser"]),
  },

  mounted() {
    console.log(this.$route.query.phone_number);
  },
  methods: {
    onChange(v) {
      console.log("onChange ", v);
      this.pin = v;
    },

    submitToken() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const phone_number = parseInt(this.$route.query.phone_number);
        this.loadingState = true;
        axios
          .get(
            `https://middey.baremind.co.za/api/phone/${this.currentUserData.id}?otp=${this.pin}&phone=${phone_number}`
          )
          .then((response) => {
            console.log(response.data);
            this.loadingState = false;

            this.$toast.success("Phone Verification Successful");

            const { user_id, access_token } = this.currentUser;
           
            getUsers(user_id, access_token, this.$store, this.$router, this);
          })
          .catch((error) => {
            this.loadingState = false;
            // if (!error.response.data.status) {
            //   this.$toast.error("Invalid token");
            // }
            this.$toast.error(error.response.data.error);
            console.log(error.response.data.error);
          });
      }
    },
  },
  validations: {
    pin: {
      required,
      minLength: minLength(6),
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped>
label {
  font-weight: 500;
  font-size: 14px;
}
.login_box {
  background-color: #fff;
  width: 80%;
  border-radius: 5px;
  padding: 2rem;
  box-shadow: 0 5px 10px rgb(0 0 0 / 9%);
}
</style>
