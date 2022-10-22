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
        class="col-span-7 h-screen bg-[#fff] flex justify-center items-center"
      >
        <div class="login_box">
          <div
            v-if="isTokenSent"
            class="py-10 flex flex-col justify-center items-center space-y-8"
          >
            <div
              class="grid place-content-center animate animate-pulse w-20 h-20 text-white bg-[#0192ED] p-4 rounded-full"
            >
              <i class="fa fa-paper-plane text-3xl" aria-hidden="true"></i>
            </div>

            <div
              class="p-4 rounded-sm border border-green-500 bg-green-100 text-green-500"
            >
              Recovery password token sent successfully. Head to your email,
              copy the recovery token and follow the next step.
             
                <button @click="proceed" class="w-full bg-green-500 text-white font-bold py-2 my-3 roounded text-center">Continue</button>
            </div>
          </div>

          <div class="" v-else>
            <h2 class="text-[#343a40] font-bold md:text-3xl text-xl">
              Forgot Password
            </h2>
            <small>Enter your recovery email address</small>

            <div class="mt-5">
              <label>Email</label>
              <div class="mb-4 rounded flex border">
                <input
                  type="email"
                  name="email"
                  v-model.trim="email"
                  class="bg-transparent w-full border-none outline-none flex-1 p-3"
                />
              </div>
              <div class="text-red-500 w-full text-xs md:text-base">
                <p v-if="!$v.email.required && $v.email.$dirty" class="">
                  Email is required!
                </p>
                <p v-if="!$v.email.email" class="">Invalid email address</p>
              </div>
            </div>

            <button
              @click="requestForgotPasswordToken"
              class="flex justify-center items-center space-x-3 bg-[#0192ED] text-white px-8 py-3 rounded w-full mt-6"
              :class="loading ? 'cursor-not-allowed' : ''"
              :disabled="loading"
            >
              <div
                v-if="loading"
                class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
              ></div>

              <div v-else class="font-medium">Submit</div>
            </button>
          </div>

          <div
            class="text-sm font-medium mt-5 flex flex-col items-center space-x-1"
          >
            <div>
              Do not have an account ?
              <span
                ><router-link
                  to="/register"
                  class="text-[#0192ED] font-semibold"
                  >Register
                </router-link></span
              >
              |
              <span
                ><router-link to="/" class="text-[#0192ED] font-semibold"
                  >Login
                </router-link></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import axiosInstance from "@/Utils/axios.config.js";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Forgotpassword",
  props: [],
  mixins: [validationMixin],

  data() {
    return {
      password: "",
      email: "",
      type: "password",
      showPasswordtoggle: false,
      isTokenSent: false,
      loading: false,
    };
  },

  methods: {
    proceed(){
      this.$router.push(`/resetpassword?recovery_email=${this.email}`)
    },
    requestForgotPasswordToken() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;

        axiosInstance
          .get(`/reset-password/?email_address=${this.email}&fire_email=true`)
          .then((response) => {
            this.$toast.success("Recovery token sent");
            this.loading = false;
            this.isTokenSent = true;
          })
          .catch((error) => {
            this.loading = false;
              console.log(error);
            if (error?.response.data) {
              this.$toast.error(error.response.data.message);
            }

          });
      }
    },
  },
  validations: {
    email: { required, email },
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
@media screen and (max-width: 768px) {
  .login_box {
    background-color: #fff;
    width: 100%;
    border-radius: 5px;
    padding: 2rem;
    box-shadow: 0 5px 10px rgb(0 0 0 / 9%);
  }
}
</style>
