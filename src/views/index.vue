<!-- eslint-disable -->
<template>
  <div class="page_wrapper">
    <div class="main_page">
      <div class="info text-xs md:text-base">
        Please take note: For you to enjoy our ride app you will need to allow
        location access on your device
      </div>
     <router-link to="/login-driver" class="proceed_button">
        Proceed as driver
     </router-link>
     <router-link to="/login" class="proceed_button">
        Book a ride
     </router-link>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
export default {
  name: "Homepage",
  data() {
    return {};
  },
  mounted() {
  },
  methods: {},
  components: {},
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
  background-image: url("../assets/Svg/bg_car.svg");
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
.info {
  max-width: 90vw;
  border-left: 5px solid #ffaa00;
  padding: 10px;
  align-self: flex-start;
  text-align: left;
  color: #333;
  background-color: #fff;
  box-shadow: 0 5px 15px 5px #ccc;
  margin: 15px 15px 100px;
}
.proceed_button{
    width: 80%;
    height: auto;
    padding: 10px 20px;
    margin: 30px;
    background-color: #4207ce;
    color: #fff;
    border-radius: 8px;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
}
</style>
