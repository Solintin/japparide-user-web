<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
/* eslint-disable */
import {startConnection} from "./Utils/socket"
// import { io } from "socket.io-client";

export default {
  name: "App",
  created() {
    startConnection()
    
  },
};
</script>
