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
        class="col-span-7 h-screen overflow-y-auto bg-[#fff] flex flex-col justify-center items-center"
      >
        <div class="mx-auto block md:hidden">
          <img
            src="@/assets/middey-logowhitebg.png"
            alt=""
            class="h-[200px] w-[200px] object-contain"
          />
        </div>
        <div class="login_box">
          <h2 class="text-[#343a40] font-bold md:text-3xl text-xl">
            Biometric verification
          </h2>
          <small>Enable your one-time Biometric Login</small>
          <div class="mt-4">
            <div class="">
              <label>Email</label>
            </div>

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

            <label>Password</label>
            <div class="mb-4 rounded flex border items-center">
              <input
                :type="type"
                name="password"
                v-model.trim="password"
                @keypress.enter="submitForm"
                class="bg-transparent border-none outline-none flex-1 p-3"
              />
              <div
                class="text-blue-500 px-2 text-xs md:text-xl font-medium icon cursor-pointer"
                @click="showPassword"
              >
                <span v-if="showPasswordtoggle"
                  ><i class="fas fa-eye-slash"></i
                ></span>
                <span v-else><i class="fas fa-eye"></i></span>
              </div>
            </div>

            <div class="text-red-500 w-full text-xs md:text-base">
              <p v-if="!$v.password.required && $v.password.$dirty" class="">
                Password is required!
              </p>
              <p v-if="!$v.password.minLength" class="">
                Password must be between 6 characters and above
              </p>
            </div>

            <div class="w-full mt-6 flex gap-4 items-center">
              <button
                @click="submitForm"
                class="flex justify-center w-full items-center space-x-3 bg-[#0192ED] text-white px-8 py-3 rounded"
                :class="{ 'cursor-not-allowed': loading }"
                :disabled="loading"
              >
                <ActionLoader v-if="loading" />

                <div v-else class="font-medium">Verify</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import Cookies from "js-cookie";
import { validationMixin } from "vuelidate";
import { required, minLength, email } from "vuelidate/lib/validators";
import axios from "@/Utils/axios.config.js";
import ActionLoader from "./ActionLoader.vue";
import { uuid } from "uuidv4";

export default {
  props: [],
  mixins: [validationMixin],
  data() {
    return {
      password: "",
      email: "",
      savedEmail: null,
      displayedEmail: "",
      type: "password",
      showPasswordtoggle: false,
      loading: false,
      uniqueId: "",
      rememberMe: false,
      apiKey: "Middey22:public:e215e51825264ed8a8c5e0bd572d29c5",
      backendUrl: "https://fingerprint-middey.herokuapp.com",
    };
  },

  watch: {
    rememberMe() {
      if (!this.rememberMe) {
        localStorage.removeItem("user_email");
        this.savedEmail = null;
        this.email = "";
      }
    },
    // email() {
    //   if (this.rememberMe) {
    //     //if rememberMe is checked then store user email input at very click
    //     Cookies.set("user_email", this.email);
    //   }
    // },
  },
  mounted() {
    // this.rememberMyDetails();
  },
  methods: {
    async RegisterWithPasswordLess(alias) {
      const apiKey = this.apiKey;
      const p = new Passwordless.Client({ apiKey });
      const myToken = await fetch(
        this.backendUrl + "/create-token?alias=" + alias
      ).then((r) => r.text());
      await p.register(myToken);
      this.$router.push("/loginwithbiometric");
      console.log("Register succeded");
    },
    // async LoginWithPasswordLess() {
    //   const apiKey = this.apiKey;
    //   const p = new Passwordless.Client({ apiKey });
    //   const token = await p.signinWithAlias(this.login);
    //   const user = await fetch(
    //     this.backendUrl + "/verify-signin?token=" + token
    //   ).then((r) => r.json());
    //   console.log("User details", user);
    //   return user;
    // },

    // rememberMyDetails() {
    //   const isBiometricLogin = Cookies.get("isBiometricLogin");
    //   if (isBiometricLogin == "true") {
    //     const getUserEmail = Cookies.get("user_email");
    //     const getUserPassword = Cookies.get("user_password");
    //     const getUniqueId = Cookies.get("uniqueId");
    //     this.email = getUserEmail;
    //     this.password = getUserPassword;
    //     this.uniqueId = getUniqueId;

    //     const credentials = {
    //       user_email: this.savedEmail || this.email,
    //       user_password: this.password,
    //       token_expiration: "persistent",
    //     };
    //     useLogin(
    //       credentials,
    //       this.$store,
    //       this.$router,
    //       this,
    //       this.handleLoading
    //     );
    //   }
    // },

    saveMyDetails(id) {
      localStorage.setItem("user_email", this.email);
      localStorage.setItem("user_password", this.password);
      localStorage.setItem("uniqueId", id);
      localStorage.setItem("isBiometricLogin", true);
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
        //Login Logic
        const credentials = {
          user_email: this.email,
          user_password: this.password,
          token_expiration: "persistent",
        };
        this.loading = true;
        axios
          .post("/users/login/", credentials)
          .then((response) => {
            this.loading = false;
            const generateUniqueId = uuid();
            this.saveMyDetails(generateUniqueId);
            this.RegisterWithPasswordLess(generateUniqueId);
          })
          .catch((error) => {
            this.loading = false;
            this.$toast.error(error.response.data.error[0]);
            console.log(error);
          });
      }
    },
  },
  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  components: { ActionLoader },
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
