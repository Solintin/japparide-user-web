<!-- eslint-disable -->
<template>
  <div class="h-screen max-w-xl mx-auto">
    <div
      class="bg-[#4207ce] px-4 py-3 text-white fixed top-0 max-w-xl w-full flex justify-between items-center"
    >
      <a href="/dashboard" class="font-bold text-[#0192ED]">
        <img src="@/assets/Svg/logo.svg" class="w-8 h-8" />
      </a>
      <div class="space-x-6 flex items-center">
        <button class=" ">
          <i class="fa-solid text-xl fa-bell"></i>
        </button>
      </div>
    </div>

    <router-view></router-view>
    <div
      class="bg-[#4207ce] px-4 py-3 rounded-t-2xl text-sm md:text-xl text-white fixed bottom-0 max-w-xl w-full flex justify-around items-center"
    >
      <a href="/dashboard/driver" class="font-bold">
        <i class="fa-solid fa-taxi"></i>
      </a>

      <a href="/dashboard" class="font-bold">
        <i class="fa-solid fa-clock-rotate-left"></i>      </a>

      <a href="/dashboard" class="font-bold">
        <i class="fa-solid fa-user-gear"></i>
      </a>

      <a href="/dashboard" class="font-bold">
        <i class="fa-solid fa-bell"></i>
      </a>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
// import { uuid } from "uuidv4";
export default {
  name: "index",

  data() {
    return {};
  },
  mounted() {},
};
</script>
<!-- eslint-disable -->

<style></style>
