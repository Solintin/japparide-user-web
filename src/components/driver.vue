<!-- eslint-disable -->
<template>
  <div class="h-screen flex flex-col justify-center items-center max-w-xl p-4">
    <div
      class="mx-auto border-4 border-yellow-600 rounded-2xl py-10 px-2 text-center"
    >
      <div v-if="!incomingRequest">
        <p>
          Kindly stay on this page, you will be notify of any nearby ride
          request.
        </p>

        <img
          src="@/assets/awaitingride.gif"
          class="rounded-md border w-8/12 h-52 mt-10 mx-auto"
          alt=""
        />
        <audio controls ref="incoming">
          <source src="@/assets/incoming.wav" type="audio/mpeg" />
        </audio>
      </div>
      <div v-else>
        <h1 class="font-bold mb-4">Incoming Request</h1>
        <div class="border divide-y-2 rounded-md text-left">
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Full Name</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ data.name }}</h1>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Location</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ data.origin }}</h1>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Destination</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ data.destination }}</h1>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Ride Fair</h1></div>
            <div>
              <h1 class="font-medium text-sm">₦{{ data.rideFair }}</h1>
            </div>
          </div>

          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Distance</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ data.distance }}</h1>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Estimated Time</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ data.duration }}</h1>
            </div>
          </div>

          <button @click="acceptRide" class="button mt-4 mb-2 w-full">
            Accept
          </button>
          <button class="cancel_button w-full" @click="cancelRide">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import { getRequest, sendAccept } from "@/Utils/socket";
export default {
  name: "Driver",

  data() {
    return {
      incomingRequest: false,
      data: null,
      passenger: null
    };
  },
  async created() {
    getRequest(this.checkRequest, (requestData) => {
      const { data } = requestData;
      this.data = data;
      this.passenger = requestData.user;
    });
  },
  mounted() {
    // const getAudio = this.$refs["incoming"];
    // console.log(getAudio);
    // getAudio.play();
  },
  methods: {
    acceptRide() {

        const passenger =  this.passenger
        const message =  "Ride acccepted, I'm on my way."

      sendAccept(message, passenger)
    },
    cancelRide() {

    },
    checkRequest() {
      this.incomingRequest = true;

      // const getAudio = this.$refs["incoming"];
      // getAudio.play();

      // x.pause();
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped>
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

.cancel_button {
  height: auto;
  padding: 10px 20px;
  background-color: red;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
}
</style>
