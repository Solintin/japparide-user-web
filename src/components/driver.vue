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
      </div>
      <div v-else>
        <!-- <audio class="absolute left-[999999px] z-[100]" autoplay>
          <source src="@/assets/incoming.wav" type="audio/mpeg" />
        </audio> -->
        <h1 class="font-bold mb-4">Incoming Request</h1>
        <div class="border divide-y-2 rounded-md text-left">
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Full Name</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ data.name }}</h1>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Pickup</h1></div>
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

          <div class="mt-4">
            <button @click="acceptRide" class="button mb-2 w-full">
              Accept
            </button>
            <button class="cancel_button w-full" @click="cancelRide">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import {
  getRequest,
  sendAccept,
  getPassengerCancelRequest,
  sendDriverCancelRequest,
} from "@/Utils/socket";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Driver",

  data() {
    return {
      incomingRequest: false,
      data: null,
      passenger: null,
      allRideInfo: null,
      driverLatLon: null,
      cancelledRequest: false,
    };
  },
  computed: {
    ...mapGetters(["currentUserData"]),
  },
  created() {
    getRequest(this.checkRequest, (requestData) => {
      const { data } = requestData;
      this.allRideInfo = requestData;
      console.log(data);
      this.data = data;
      this.passenger = requestData.user;
    });
    getPassengerCancelRequest(this.getCancelledRequest);
  },
  mounted() {
    this.getCurrentLocation();
  },
  methods: {
    getCancelledRequest() {
      this.cancelledRequest = true;
      this.$swal("Cancelled", `Ride request cancelled`, "error");
      this.incomingRequest = false;
    },
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.driverLatLon = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
        },
        (error) => {
          console.log(error);
        }
      );
    },
    rideStatusHandler() {
      const data = {
        driver: this.currentUserData.user.id,
        passenger: this.data.passengerId,
        passenger_pickup_add: this.data.origin,
        passenger_dropoff_add: this.data.destination,
        ride_price: this.data.rideFair,
        ride_time: this.data.duration,
        driver_latlon: this.driverLatLon,
        passenger_pickup_latlon: this.data.passengerPickupLatLon,
        passenger_dropoff_latlon: this.data.passengerDestinationLatLon,
        payment_method: this.data.paymentMode,
        ride_status: "assigned",
      };
      axios
        .post("https://backend.japparide.com/api/ride-informations", {
          data: data,
        })
        .then(async (res) => {
          console.log(res);
          await this.$swal("Success", `Ride Accepted`, "success");
          this.$store.dispatch("setRideInfo", this.allRideInfo);
          this.$router.push("/driver/ongoing-ride");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    acceptRide() {
      const passenger = this.passenger;
      const message = "Ride acccepted, I'm on my way.";
      this.rideStatusHandler();
      sendAccept(message, passenger);
    },
    cancelRide() {
      this.incomingRequest = false;
      sendDriverCancelRequest(this.passenger);
    },
    checkRequest() {
      this.incomingRequest = true;
      const audio = new Audio(
        "http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3"
      );
      audio.play();
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
