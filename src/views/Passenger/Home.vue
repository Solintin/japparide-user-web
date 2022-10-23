<!-- eslint-disable -->
<template>
  <div class="">
    <div ref="map" id="map" class="absolute inset-0"></div>
    <div
      class="fixed z-[1] bottom-0 bg-white inset-x-0 rounded-t-xl w-full p-4 flex justify-center items-center h-auto overflow-y-auto"
    >
      <div class="max-w-xl w-full mt-6 p-2" v-if="bookingState === 'booking'">
        <input
          type="text"
          name="pickup"
          ref="pickup"
          placeholder="Pickup"
          v-model.trim="pickup"
          class="bg-transparent w-full rounded-md mb-4 border outline-none flex-1 p-3"
        />
        <div class="text-red-500 w-full text-xs md:text-base">
          <p v-if="!$v.pickup.required && $v.pickup.$dirty" class="">
            Pickup Location is required!
          </p>
        </div>

        <input
          ref="destination"
          placeholder="destination"
          type="destination"
          name="destination"
          v-model.trim="destination"
          class="bg-transparent w-full rounded-md mb-4 border outline-none flex-1 p-3"
        />

        <div class="text-red-500 w-full text-xs md:text-base">
          <p v-if="!$v.destination.required && $v.destination.$dirty" class="">
            destination is required!
          </p>
        </div>

        <div class="flex justify-between items-center py-2">
          <button
            @click="calculateDistance"
            class="flex justify-center items-center space-x-3 button w-full"
            :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <div
              v-if="loading"
              class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed3237] border-l-[#ed3237] animate-spin"
            ></div>

            <div v-else class="font-medium text-sm">Book ride</div>
          </button>
        </div>
      </div>

      <div class="p-4 w-full h-full" v-if="bookingState === 'ride_detail'">
        <h1 class="text-center font-bold capitalize text-xl mb-4">
          Confirm ride detail
        </h1>
        <div class="border bg-gray-100 rounded-md px-2 py-4 mb-2">
          <h1 class="font-medium px-2">Pickup Addreess</h1>
          <div class="mt-1 bg-white rounded-md p-2 mb-4">{{ pickup }}</div>

          <h1 class="font-medium px-2">Destination Addreess</h1>
          <div class="mt-1 bg-white rounded-md p-2">{{ destination }}</div>
        </div>

        <div class="border divide-y-2 rounded-md">
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Ride Fair</h1></div>
            <div>
              <h1 class="font-medium text-sm">₦{{ rideFair }}</h1>
            </div>
          </div>

          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Distance</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ distance }}</h1>
            </div>
          </div>
          <div class="grid grid-cols-2 items-center py-3 px-4">
            <div><h1 class="font-medium text-sm">Estimated Time</h1></div>
            <div>
              <h1 class="font-medium text-sm">{{ duration }}</h1>
            </div>
          </div>
        </div>

        <div class="border rounded-md p-4 my-4">
          <h1 class="font-medium">Preffered payment method</h1>
          <div class="flex items-center mb-2">
            <input
              type="radio"
              id="cash"
              value="cash"
              v-model="payment"
              class="mr-2"
            />
            <label for="cash">Cash</label>
          </div>
          <div class="flex items-center">
            <input
              type="radio"
              id="transfer"
              value="transfer"
              v-model="payment"
              class="mr-2"
            />
            <label for="transfer">Transfer</label>
          </div>
        </div>
        <button
          @click="bookingState = 'searching_driver'"
          class="button mt-4 mb-2 w-full"
        >
          Continue
        </button>
        <button class="cancel_button w-full" @click="handleBooking">
          Cancel
        </button>
      </div>

      <div
        class="md:w-6/12 p-4 w-full flex flex-col justify-center items-center space-y-4"
        v-if="bookingState == 'searching_driver'"
      >
        <div class="info">Driver will be assigned to you shortly...</div>
        <img src="@/assets/searching.gif" alt="" class="h-40 w-40" />
        <button class="cancel_button w-full" @click="handleBooking">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
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
      pickup: "",
      destination: "",
      rideFair: 0,
      distance: "",
      duration: "",
      payment: "cash",
    };
  },
  mounted() {
    this.showMap();
    const pickupLocation = new google.maps.places.Autocomplete(
      this.$refs["pickup"]
    );

    pickupLocation.addListener("place_changed", () => {
      console.log("Pickup", pickupLocation.getPlace());
      this.pickup = pickupLocation.getPlace().formatted_address;
    });

    const destinationLocation = new google.maps.places.Autocomplete(
      this.$refs["destination"]
    );

    destinationLocation.addListener("place_changed", () => {
      console.log("destination", destinationLocation.getPlace());

      this.destination = destinationLocation.getPlace().formatted_address;
    });
  },
  methods: {
    handleBooking() {
      if (this.bookingState == "booking" || this.bookingState == "searching_driver") {
        this.bookingState = "ride_detail";
      } else {
        this.bookingState = "booking";
      }
    },
    showMap() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
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
.info {
  border-left: 5px solid #ffaa00;
  padding: 10px;
  align-self: flex-start;
  text-align: left;
  color: #333;
  background-color: #fff;
  box-shadow: 0 5px 15px 5px #ccc;
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
