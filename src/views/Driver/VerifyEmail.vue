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
            Please Insert the six digit code sent to your email.
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
            class="bg-[#0192ED] flex justify-center md:w-8/12 w-full font-bold rounded my-4 py-3 px-4 text-[12px] md:text-xl font-medium text-white"
            :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <ActionLoader v-if="loading" />

            <div v-else class="font-medium">Verify Email</div>
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
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import axios from "@/Utils/axios.config.js";
import ActionLoader from "../../components/ActionLoader.vue";
import { getUsers } from "@/Utils/getUser.js";

export default {
  name: "VerifyEmail",
  props: [],
  mixins: [validationMixin],
  components: { CodeInput, ActionLoader },

  data() {
    return {
      pin: "",
    };
  },

  computed: {
    ...mapState(["loading"]),
  },

  methods: {
    onChange(v) {
      this.pin = v;
    },
    submitToken() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("setLoading", true);
        const user_email = this.$route.query.verification_email;
        axios
          .post(
            `/verify-email-address/?email_address=${user_email}&token_to_verify_email_address=${this.pin}`
          )
          .then((response) => {
            console.log(response.data);
            this.$store.dispatch("setLoading", false);
            if (response.data.status) {
              this.$toast.success("Email Verification Successful");
              if (this.currentUserData) {
                const { id } = this.currentUserData;
                const { access_token } = this.currentUser;
                getUsers(id, access_token, this.$store, this.$router, this);
              } else {
                this.$router.push("/");
              }
            }
          })
          .catch((error) => {
            this.$store.dispatch("setLoading", false);
            if (!error.response.data.status) {
              this.$toast.error("Invalid token");
            } else {
              this.$toast.error("Verification unsuccessful");
              console.log(error);
            }
          });
      } else {
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
