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
          <div>
            <h2 class="text-[#343a40] font-bold md:text-3xl text-xl">
              Reset Password
            </h2>
            <small>Enter your new password</small>

            <div class="mt-5">
              <div class="flex justify-between">
                <label
                  >Token
                  <p class="text-[10px]">(Token has been sent to your email)</p>
                </label>
                <button
                  class="text-blue-500 text-sm font-medium"
                  @click="requestChangePasswordToken"
                >
                  Re-send
                </button>
              </div>
              <div class="mb-4 rounded flex border items-center">
                <input
                  type="text"
                  name="token"
                  v-model.trim="token"
                  @keypress.enter="resetForgotPassword"
                  class="bg-transparent border-none outline-none flex-1 p-3"
                />
              </div>
              <small
                v-if="!$v.token.required && $v.token.$dirty"
                class="mb-2 text-red-500"
              >
                Password is required!
              </small>
              <label>New Password</label>
              <div class="mb-4 rounded flex border items-center">
                <input
                  :type="type"
                  name="password"
                  v-model.trim="password"
                  @keypress.enter="submitForm"
                  class="bg-transparent border-none outline-none flex-1 p-3"
                />
                <div
                  class="text-blue-500 px-2 text-xs font-medium icon cursor-pointer"
                  @click="showPassword"
                >
                  <span v-if="showPasswordtoggle">HIDE</span>
                  <span v-else>SHOW</span>
                </div>
              </div>
              <small
                v-if="!$v.password.required && $v.password.$dirty"
                class="me-auto text-red-500"
              >
                Password is required!
              </small>

              <label>Comfirm Password</label>
              <div class="mb-4 rounded flex border items-center">
                <input
                  :type="type"
                  name="password"
                  v-model.trim="confirm_password"
                  @keypress.enter="submitForm"
                  class="bg-transparent border-none outline-none flex-1 p-3"
                />
                <div
                  class="text-blue-500 px-2 text-xs font-medium icon cursor-pointer"
                  @click="showPassword"
                >
                  <span v-if="showPasswordtoggle">HIDE</span>
                  <span v-else>SHOW</span>
                </div>
              </div>
              <div class="flex flex-col">
                <small
                  v-if="
                    !$v.confirm_password.required && $v.confirm_password.$dirty
                  "
                  class="me-auto text-red-500"
                >
                  Password is required!
                </small>
                <small
                  v-if="!$v.confirm_password.sameAsPassword"
                  class="me-auto text-red-500"
                >
                  Password does not tally
                </small>
              </div>
            </div>

            <button
              @click="resetForgotPassword"
              class="flex justify-center items-center space-x-3 bg-[#0192ED] text-white px-8 py-3 rounded w-full mt-6"
              :class="loading ? 'cursor-not-allowed' : ''"
              :disabled="loading"
            >
              <div
                v-if="loading"
                class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
              ></div>

              <div v-else class="font-medium">Reset Password</div>
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
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Forgotpassword",
  props: [],
  mixins: [validationMixin],

  data() {
    return {
      token: "",
      password: "",
      confirm_password: "",
      email: "",
      type: "password",
      showPasswordtoggle: false,
      isTokenSent: false,
      loading: false,
    };
  },

  methods: {
    showPassword() {
      this.showPasswordtoggle = !this.showPasswordtoggle;

      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    resetForgotPassword() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;
        const email = this.$route.query.recovery_email;

        axiosInstance
          .post(
            `/reset-password/?new_password=${this.password}&confirm_new_password=${this.confirm_password}&token_to_reset_password=${this.token}&email_address=${email}`
          )
          .then((response) => {
            console.log(response.data);
            this.$toast.success("Password Reset Succesfully");
            this.loading = false;
            this.$router.push("/");
            localStorage.removeItem("recovery_email", this.email);
          })
          .catch((error) => {
            if (error.response.data) {
              this.$toast.error(error.response.data.message);
            }
            this.loading = false;
            console.log(error);
          });
      }
    },
    requestChangePasswordToken() {
      const email = this.$route.query.recovery_email;
      axiosInstance
        .get(`/reset-password/?email_address=${email}&fire_email=true`)
        .then((response) => {
          this.$toast.success("Recovery token sent");
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
          if (error?.response.data) {
            this.$toast.error(error.response.data.message);
          }
        });
    },
  },
  validations: {
    password: { required },
    token: { required },
    confirm_password: { required, sameAsPassword: sameAs("password") },
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
