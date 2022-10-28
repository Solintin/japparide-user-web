<!-- eslint-disable -->
<template>
  <div class="">
    <div ref="map" id="map" class="absolute inset-0"></div>
    <div
      class="fixed z-[1] bottom-0 bg-white inset-x-0 rounded-t-3xl w-full p-4 flex justify-center items-center h-auto overflow-y-auto"
    >
      <div class="max-w-xl w-full mt-6 p-2" v-if="bookingState === 'booking'">
        <div class="border divide-y-2 rounded-md text-left">
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Full Name</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ rideInfo.name }}</h1>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Location</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ rideInfo.origin }}</h1>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Destination</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ rideInfo.destination }}</h1>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center py-2">
          <button
            @click="startTrip('started')"
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
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "axios";
import confirm_action from "@/Utils/confirm_action";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "Passengers",
  mixins: [validationMixin],
  validations: {
    pickup: { required },
    destination: { required },
  },
  data() {
    return {
      bookingState: "booking",
      loading: false,
      incomingAccept: false,
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

    const pickupLocation = new google.maps.places.Autocomplete(
      this.$refs["pickup"]
    );

    pickupLocation.addListener("place_changed", () => {
      console.log("Pickup", pickupLocation.getPlace());
      this.pickuplatlon = {
        lat: pickupLocation.getPlace().geometry.location.lat(),
        lon: pickupLocation.getPlace().geometry.location.lng(),
      };

      this.pickup = pickupLocation.getPlace().formatted_address;
    });

    const destinationLocation = new google.maps.places.Autocomplete(
      this.$refs["destination"]
    );

    destinationLocation.addListener("place_changed", () => {
      console.log("destination", destinationLocation.getPlace());

      this.destination = destinationLocation.getPlace().formatted_address;
      this.destinationlatlon = {
        lat: pickupLocation.getPlace().geometry.location.lat(),
        lon: pickupLocation.getPlace().geometry.location.lng(),
      };
    });
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

    startTrip(ride_status) {
      const data = {
        driver: this.currentUserData.user.id,
        passenger: this.rideInfo.passengerId,
        passenger_pickup_add: this.rideInfo.origin,
        passenger_dropoff_add: this.rideInfo.destination,
        ride_price: this.rideInfo.rideFair,
        ride_time: this.rideInfo.ride_time,
        driver_latlon: {
          lat: "",
          lon: "",
        },
        passenger_pickup_latlon: this.rideInfo.passengerPickupLatLon,
        passenger_dropoff_latlon: this.rideInfo.passengerDestinationLatLon,
        payment_method: this.rideInfo.paymentMode,
        ride_status: ride_status,
      };
      axios
        .post("https://backend.japparide.com/api/ride-informations", {
          data: data,
        })
        .then((res) => {
          console.log(res);
          this.$toast.success("Ride Started");
        })
        .catch((err) => {
          console.log(err);
        });
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
    calculateDistance() {
      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer();
      // Create route from existing points used for markers
      const route = {
        origin: this.pickup,
        destination: this.destination,
        travelMode: "DRIVING",
      };

      const disInstance = this;
      directionsService.route(route, function (response, status) {
        // anonymous function to capture directions
        if (status !== "OK") {
          window.alert("Directions request failed due to " + status);
          return;
        } else {
          directionsRenderer.setDirections(response); // Add route to the map
          var directionsData = response.routes[0].legs[0]; // Get data about the mapped route
          if (!directionsData) {
            window.alert("Directions request failed");
            return;
          } else {
            disInstance.bookingState = "ride_detail";
            disInstance.rideFair = parseInt(directionsData.distance.text) * 200;
            disInstance.distance = directionsData.distance.text;
            disInstance.duration = directionsData.duration.text;
            // console.log(directionsData.distance.text);
            // console.log(directionsData.duration.text);
          }
        }
      });
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
