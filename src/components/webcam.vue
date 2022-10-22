<!-- eslint-disable -->
<template>
  <div class="container">
    <!-- <code v-if="device">{{ device.label }}</code> -->
    <div class="w-full">
      <figure class="figure" :class="passport ? 'block' : 'hidden'">
        <img :src="passport" class="object-contain w-full h-full" />
      </figure>
      <div :class="passport ? 'hidden' : 'block'">
        <web-cam
          ref="webcam"
          :device-id="deviceId"
          width="100%"
          @started="onStarted"
          @stopped="onStopped"
          @error="onError"
          @cameras="onCameras"
          @camera-change="onCameraChange"
        />
      </div>
    </div>
    <div class="w-full gap-4 mt-4">
      <select
        v-model="camera"
        class="overflow-ellipsis border-2 outline-none border-gray-300 w-full rounded-md p-3.5 focus:border-blue-400"
      >
        <option>-- Select Device --</option>
        <option
          v-for="device in devices"
          :key="device.deviceId"
          :value="device.deviceId"
        >
          {{ device.label }}
        </option>
      </select>
    </div>
    <div class="grid grid-cols-2 w-full gap-4 mt-4">
      <button
        type="button"
        class="px-2 py-3 rounded border border-blue-600 hover:bg-blue-500 transform duration-300 ease-linear hover:text-white"
        @click="onStart"
      >
        <!-- Start Camera -->
        Take Again
      </button>
      <!-- <button
        type="button"
        class="px-2 py-3 rounded border border-red-600"
        @click="onStop"
      >
        Stop Camera
      </button> -->
      <button
        type="button"
        class="flex justify-center items-center space-x-3 px-2 py-3 rounded border border-green-600 hover:bg-green-500 transform duration-300 ease-linear hover:text-white"
        @click="onCapture"
        :disabled="loading"
      >
        <ActionLoader v-if="loading" />

        <div v-else class="font-medium">Capture</div>
      </button>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import { WebCam } from "vue-web-cam";
import { find, head } from "lodash";
import * as filestack from "filestack-js";
import ActionLoader from "./ActionLoader.vue";

export default {
  name: "HelloWorld",
  components: {
    WebCam,
    ActionLoader,
  },
  props: ["passport", "handlePassport", ],
  data() {
    return {
      capturedImg: null,
      camera: null,
      deviceId: null,
      devices: [],
      loading: false,
      filestackApiKey: "Awx4a6SdRNetnUtuawgS7z",
    };
  },
  computed: {
    device() {
      return find(this.devices, (n) => n.deviceId == this.deviceId);
    },
  },
  watch: {
    camera: function (id) {
      this.deviceId = id;
    },
    devices: function () {
      // Once we have a list select the first one
      let first = head(this.devices);
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    },
  },
  methods: {
   async onCapture() {
      this.capturedImg = this.$refs.webcam.capture();
      console.log("Captured");
      console.log(this.capturedImg);
      this.loading = true;
      await fetch(this.capturedImg)
        .then((res) => res.blob())
        .then(async (blob) => {
          console.log(blob);

          let fileObject = new File([blob], "image.png", {
            type: "timage/jpeg",
          });
          console.log(fileObject);
          const client = filestack.init(this.filestackApiKey);
          await client.upload(fileObject).then((data) => {
            console.log(data.url);
            this.loading = false;
            this.$toast.success("Passport Taken successfully");
            this.handlePassport(data.url);
          });
        });

      //Stop Camera after capture
      console.log("stop");
      this.onStop();
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
      this.capturedImg = null;
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.$refs.webcam.stop();
    },
    onStart() {
      this.$refs.webcam.start();
      this.handlePassport(null);
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    },
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
