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
          <div class="flex flex-col justify-center text-center">
            <p>
              Urrm, we are not happy to see go, but we can't hold you back. In
              order to finalize the process of deleting your account. We request
              when you email us at
              <span class="text-blue-500">
                <a href="mailto:support@middey.com"
                  >support@middey.com</a
                > </span
              >, stating the reasons for deactivating/deleting your account. We
              will miss you, note account Deletion/Deactivation are queued for
              14 days & if you login within this 14 days, you account will be
              reactivated .
            </p>
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
    proceed() {
      this.$router.push(`/resetpassword?recovery_email=${this.email}`);
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
