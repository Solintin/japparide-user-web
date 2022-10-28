<!-- eslint-disable -->
<template>
  <div>
    <DashboardComp />
  </div>
</template>
<!-- eslint-disable -->
<script>
import DashboardComp from "../../components/DashboardComp.vue";

export default {
  name: "Dashboard",
  components: { DashboardComp },
  watch: {
    checkActivity() {
      if (this.checkActivity) {
        this.logout();
        this.$swal("Timeout, Your session has expired.");
      }
    },
  },
  computed: {
    checkActivity() {
      return this.$store.state.idleVue.isIdle;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
      localStorage.clear();
    },
  },
};
</script>

<style></style>
