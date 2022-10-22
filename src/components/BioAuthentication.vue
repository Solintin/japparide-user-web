<!-- eslint-disable -->
<template>
  <div
    class="h-screen grid place-content-center text-center text-black font-bold"
  >
    <p>Authenticating...</p>
    <!-- <button @click="reset" class="p-2 border">Reset</button> -->
  </div>
</template>
<!-- eslint-disable -->

<script>
import Cookies from "js-cookie";
import { useLogin } from "@/Utils/useAuth";

export default {
  name: "BioAuthLogin",
  data() {
    return {
      apiKey: "Middey22:public:e215e51825264ed8a8c5e0bd572d29c5",
      backendUrl: "https://fingerprint-middey.herokuapp.com",
    };
  },
  mounted() {
    const isBiometricLogin = localStorage.getItem("isBiometricLogin");
    if (isBiometricLogin == "true") {
      const getUniqueId = localStorage.getItem("uniqueId");
      console.log(getUniqueId);
      this.LoginWithPasswordLess(getUniqueId);
    }
  },
    methods: {
    // reset() {
    //   localStorage.removeItem("user_email");
    //   localStorage.removeItem("user_password");
    //   localStorage.removeItem("uniqueId");
    //   localStorage.removeItem("isBiometricLogin");
    // },
    handleLoading(state) {
      this.loading = state;
    },
    fireLogin() {
      const getUserPassword = localStorage.getItem("user_password");
      const getUserEmail = localStorage.getItem("user_email");
      const credentials = {
        user_email: getUserEmail,
        user_password: getUserPassword,
        token_expiration: "persistent",
      };
      useLogin(
        credentials,
        this.$store,
        this.$router,
        this,
        this.handleLoading
      );
    },

    async LoginWithPasswordLess(id) {
      const apiKey = this.apiKey;
      const p = new Passwordless.Client({ apiKey });
      const token = await p.signinWithAlias(id);
      const user = await fetch(
        this.backendUrl + "/verify-signin?token=" + token
      ).then((r) => r.json());
      this.fireLogin();
      console.log("User details", user);
      return user;
    },
  },
};
</script>

<style></style>
