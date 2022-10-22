<!-- eslint-disable -->
<template>
  <div
    class="h-screen flex items-center justify-center flex-col text-center text-black font-bold"
  >
    <Spinner />
    <p class="mt-12">Logging in...</p>
  </div>
</template>
<!-- eslint-disable -->

<script>
import { decode as base64_decode } from "base-64";
import { getUsers } from "../Utils/getUser";
import Spinner from "../components/Spinner.vue";

export default {
  name: "BioAuthLogin",
  data() {
    return {};
  },
  mounted() {
    this.mobileAuth();
  },
  methods: {
    async mobileAuth() {
      let decoded = base64_decode(this.$route.query.token);
      const mobileLoginRespnose = JSON.parse(decoded);
      console.log(mobileLoginRespnose);
      const { data } = mobileLoginRespnose;
      if (data) {
        this.$store.dispatch("setUser", data);
        const { user_id } = data;
        const { access_token } = data;
        getUsers(user_id, access_token, this.$store, this.$router, this);
      }
    },
  },
  components: { Spinner },
};
</script>

<style></style>
