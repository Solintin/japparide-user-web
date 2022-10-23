<!-- eslint-disable -->
<template>
  <div
    class="md:w-6/12 w-full container mx-auto flex flex-col justify-center items-center p-4"
  >
    <router-link to="/"
      ><img src="@/assets/Svg/logo.svg" class="w-16 h-16" alt=""
    /></router-link>
    <h1 class="text-center text-black font-bold mt-5">Welcome</h1>
    <p class="text-sm text-center">
      Please provide the following details for your account
    </p>
    <div class="w-full mt-16">
      <div
        class="my-4 bg-[#ECECEC] rounded-md flex border border-gray-300 shadow-md"
      >
        <div
          class="icon w-12 max-h-full rounded-l-md grid place-content-center"
        >
          <i class="fa-solid fa-user text-black text-xl"></i>
        </div>
        <input
          placeholder="Full Name"
          type="text"
          name="full name"
          v-model.trim="name"
          class="bg-transparent w-full border-none outline-none flex-1 p-3 mr-1"
        />
      </div>
      <div class="text-red-500 w-full text-xs md:text-base">
        <p v-if="!$v.email.required && $v.email.$dirty" class="">
          Email is required!
        </p>
      </div>
      <!-- email -->
      <div
        class="my-4 bg-[#ECECEC] rounded-md flex border border-gray-300 shadow-md"
      >
        <div
          class="icon w-12 max-h-full rounded-l-md grid place-content-center"
        >
          <i class="fa-solid fa-envelope text-black text-xl"></i>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          v-model.trim="email"
          class="bg-transparent w-full border-none outline-none flex-1 p-3 mr-1"
        />
      </div>
      <div class="text-red-500 w-full text-xs md:text-base">
        <p v-if="!$v.email.required && $v.email.$dirty" class="">
          Email is required!
        </p>
        <p v-if="!$v.email.email" class="">Invalid email address</p>
      </div>

      <div
        class="my-4 bg-[#ECECEC] rounded-md flex border border-gray-300 shadow-md"
      >
        <div
          class="icon w-12 max-h-full rounded-l-md grid place-content-center"
        >
          <i class="fa-solid fa-phone text-black text-xl"></i>
        </div>
        <input
          placeholder="Phone Number"
          type="text"
          name="full name"
          v-model.trim="phone"
          class="bg-transparent w-full border-none outline-none flex-1 p-3 mr-1"
        />
      </div>
      <div class="text-red-500 w-full text-xs md:text-base">
        <p v-if="!$v.email.required && $v.email.$dirty" class="">
          Email is required!
        </p>
      </div>

      <div
        class="my-4 bg-[#ECECEC] rounded-md flex border border-gray-300 shadow-md"
      >
        <div
          class="icon w-12 max-h-full rounded-l-md grid place-content-center"
        >
          <i class="fa-solid fa-lock text-black text-xl"></i>
        </div>
        <input
          placeholder="Password"
          type="password"
          name="password"
          v-model.trim="password"
          @keypress.enter="submitForm"
          class="bg-transparent w-full border-none outline-none flex-1 p-3 mr-1"
        />
      </div>
      <div class="text-red-500 w-full text-xs md:text-base">
        <p v-if="!$v.password.required && $v.password.$dirty" class="">
          Password is required!
        </p>
        <p v-if="!$v.password.minLength" class="">
          Password must be between 6 characters and above
        </p>
      </div>
      <div
        class="my-4 bg-[#ECECEC] rounded-md flex border border-gray-300 shadow-md"
      >
        <div
          class="icon w-12 max-h-full rounded-l-md grid place-content-center"
        >
          <i class="fa-solid fa-lock text-black text-xl"></i>
        </div>
        <input
          placeholder="Confirm Password"
          type="password"
          name="password"
          v-model.trim="confirm_password"
          @keypress.enter="submitForm"
          class="bg-transparent w-full border-none outline-none flex-1 p-3 mr-1"
        />
      </div>
      <div class="text-red-500 w-full text-xs md:text-base">
        <p
          v-if="!$v.confirm_password.required && $v.confirm_password.$dirty"
          class=""
        >
          Password is required!
        </p>
        <p
          v-if="!$v.confirm_password.sameAsPassword"
          class="me-auto text-j2g-core"
        >
          Passwords does not tally
        </p>
      </div>

      <button
        @click="submitForm"
        class="flex justify-center items-center space-x-3 button w-full mt-10"
        :class="loading ? 'cursor-not-allowed' : ''"
        :disabled="loading"
      >
        <div
          v-if="loading"
          class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed3237] border-l-[#ed3237] animate-spin"
        ></div>

        <div v-else class="font-medium text-sm">Create account</div>
      </button>
      <div
        class="text-base font-medium mt-5 flex justify-center items-start space-x-5"
      >
        <h1>Already a user?</h1>
        <router-link to="/passengers/login" class="text-[#4207ce] font-semibold"
          >Sign in</router-link
        >
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { useRegister } from "@/Utils/useAuth";
export default {
  props: [],
  mixins: [validationMixin],

  data() {
    return {
      password: "",
      email: "",
      name: "",
      phone: "",
      confirm_password: "",
      loading: false,
    };
  },

  methods: {
    handleLoading(state) {
      this.loading = state;
    },
    async submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        //Login Logic
        const credentials = {
          username: this.name,
          email: this.email,
          phone_number: this.phone,
          password: this.password,
          current_city: "",
          current_country: "NG",
          country_of_origin: "NG",
        };
        await useRegister(
          credentials,
          this.$store,
          this.$router,
          this,
          this.handleLoading
        );
      } else {
      }
    },
  },
  validations: {
    email: { required, email },
    password: {
      required,
      minLength: minLength(6),
    },
    confirm_password: {
      required,
      minLength: minLength(6),
      sameAsPassword: sameAs("password"),
    },
    phone: {
      required,
    },
    name: {
      required,
    },
  },
};
</script>

<style scoped>
.page_wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
}
.main_page {
  max-width: 600px;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  padding: 20px;
}

.button {
  height: auto;
  padding: 10px 20px;
  background-color: #3f51b5;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
}
</style>
