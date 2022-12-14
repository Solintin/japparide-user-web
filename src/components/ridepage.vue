<!-- eslint-disable -->
<template>
  <div class="">
    <div ref="map" id="map" class="absolute inset-0"></div>
    <div
      class="fixed z-[1] bottom-0 bg-white inset-x-0 rounded-t-3xl w-full p-4 flex justify-center items-center h-auto overflow-y-auto"
    >
      <div class="max-w-xl w-full mt-6 p-2">
        <div class="border divide-y-2 rounded-md text-left">
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Full Name</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ rideInfo.data.name }}</h1>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Pickup</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ rideInfo.data.origin }}</h1>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Destination</h1></div>
            <div>
              <h1 class="font-medium text-sm">
                {{ rideInfo.data.destination }}
              </h1>
            </div>
          </div>
        </div>

        <div class="w-full space-y-4 mt-4">
          <button
            v-if="!tripStarted"
            @click="rideStatusHandler('started')"
            class="flex justify-center items-center space-x-3 button w-full"
            :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <div
              v-if="loading"
              class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed3237] border-l-[#ed3237] animate-spin"
            ></div>

            <div v-else class="font-medium text-sm">Start Trip</div>
          </button>
          <button
            v-else
            @click="rideStatusHandler('completed')"
            class="flex justify-center items-center space-x-3 button-endtrip w-full"
            :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <div
              v-if="loading"
              class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed3237] border-l-[#ed3237] animate-spin"
            ></div>

            <div v-else class="font-medium text-sm">End Trip</div>
          </button>
          <button
            @click="cancelBookedRide('cancelled')"
            class="flex justify-center items-center space-x-3 cancel_button w-full"
            :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <div
              v-if="loading"
              class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed3237] border-l-[#ed3237] animate-spin"
            ></div>

            <div v-else class="font-medium text-sm">Cancel Trip</div>
          </button>
        </div>

        <div
          v-if="paymentModal"
          class="fixed inset-0 flex flex-col justify-center items-center bg-[#00000050] z-10"
        >
          <div class="rounded-2xl bg-white text-black text-center p-20">
            <h1 class="text-xl">Ride Fair</h1>
            <h1 class="text-xl font-bold">N {{ rideInfo.data.rideFair }}</h1>
            <button class="payment_button mt-4" @click="paymentHandler">Paid</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "axios";
import confirm_action from "@/Utils/confirm_action";
import {mapGetters} from 'vuex'
import { sendDriverCancelRequest, rideCompleted } from "../Utils/socket";
export default {
  name: "Ridepage",
 
  data() {
    return {
      tripStarted: false,
      loading: false,
      incomingAccept: false,
      paymentModal: false,
      pickup: "",
      destination: "",
      rideFair: 0,
      distance: "",
      duration: "",
      payment: "cash",
      pickuplatlon: null,
      destinationlatlon: null,
    };
  },
  created() {},
  computed: {
    ...mapGetters(["currentUserData", "rideInfo"]),
  },
  mounted() {
    this.showMap();
    this.getCurrentLocation();
  },
  methods: {
    checkAccept() {
      this.$swal("Success", `Ride Accepted`, "success");
      this.incomingAccept = true;
    },
    cancelBookedRide() {
      //confirm_action accepts two arg;
      // 1- this instance
      // 2-  An action
      confirm_action(this, this.rideStatusHandler, "cancelled");
    },
    numberConverter(value) {
      return value.toString();
    },

    rideStatusHandler(ride_status) {
      const data = {
        driver: this.currentUserData.user.id,
        passenger: this.rideInfo.data.passengerId,
        passenger_pickup_add: this.rideInfo.data.origin,
        passenger_dropoff_add: this.rideInfo.data.destination,
        ride_price: this.rideInfo.data.rideFair,
        ride_time: this.rideInfo.data.ride_time,
        driver_latlon: {
          lat: "",
          lon: "",
        },
        passenger_pickup_latlon: this.rideInfo.data.passengerPickupLatLon,
        passenger_dropoff_latlon: this.rideInfo.data.passengerDestinationLatLon,
        payment_method: this.rideInfo.data.paymentMode,
        ride_status: ride_status,
      };
      axios
        .post("https://backend.japparide.com/api/ride-informations", {
          data: data,
        })
        .then((res) => {
          console.log(res);
          if (ride_status == "cancelled") {
            this.$toast.success("Ride cancelled successfully");
            sendDriverCancelRequest(this.rideInfo.user);
            this.$store.dispatch("setRideInfo", null);
            this.$router.push("/driver/dashboard");
          } else if (ride_status == "completed") {
            this.$toast.success("Ride Completed");
            this.paymentModal = true;
          } else {
            this.$toast.success("Ride Started");
            this.tripStarted = true;
            this.gotoMap();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    paymentHandler() {
    confirm_action(this, rideCompleted, this.rideInfo.user)
      this.$store.dispatch("setRideInfo", null);
      this.$router.push("/driver/dashboard");
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
    gotoMap() {
      const modifiedDriverLocation = this.rideInfo.data["origin"].replace(
        / /g,
        "+"
      );
      const modifiedPassengerLocation = this.rideInfo.data.destination.replace(
        / /g,
        "+"
      );
      window.open(
        `https://www.google.com/maps/dir/${modifiedDriverLocation}/${modifiedPassengerLocation}/`,
        "_blank"
      );
    },
    showMap() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          this.initMap(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    initMap(lat, lng) {
      var myLatLng = {
        lat,
        lng,
      };

      const pageMap = this.$refs["map"];
      let map = new google.maps.Map(pageMap, {
        zoom: 15,
        center: new google.maps.LatLng(lat, lng),
      });

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
      });
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped>
.button,
.button-endtrip,
.payment_button {
  height: auto;
  padding: 10px 20px;
  background-color: #3f51b5;
  color: #fff;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
}
.payment_button {
  background-color: red;
}
.button-endtrip {
  background-color: rgb(17, 225, 86);
}
.info,
.info_success {
  border-left: 5px solid #ffaa00;
  padding: 10px;
  align-self: flex-start;
  text-align: left;
  color: #333;
  background-color: #fff;
  box-shadow: 0 5px 15px 5px #ccc;
}
.info_success {
  border-left: 5px solid green;
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
