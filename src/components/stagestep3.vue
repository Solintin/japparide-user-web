<!-- eslint-disable -->
<template>
  <div>
    <div class="mt-6 space-y-8">
      <!-- Front View -->

      <h3 class="font-medium">
        1. Front View
        <i
          v-if="fileUrlFront"
          class="ml-2 fa fa-check text-base text-green-500"
        ></i>
      </h3>

      <div class="rounded-md border-2 border-dashed p-4 w-full">
        <img
          v-if="fileUrlFront !== null"
          :src="fileUrlFront"
          class="h-[300px] w-full"
          alt=""
        />
        <div v-else class="flex flex-col justify-center items-center space-y-5">
          <div>
            <img src="@/assets/Svg/camera.svg" alt="" />
          </div>
          <h4 class="font-medium text-xs text-[#201E1E80]">Front view</h4>

          <button
            @click="uploadFile(1)"
            class="border border-blue-500 rounded cursor-pointer py-2 px-4"
          >
            Take a shot
          </button>
        </div>
      </div>
      <button
        v-if="fileUrlFront"
        type="button"
        class="w-full mt-4 px-2 py-3 rounded border border-red-500 hover:bg-red-500 transform duration-300 ease-linear hover:text-white"
        @click="fileUrlFront = null"
      >
        Pick new file
      </button>

      <!-- Back View -->
      <h3 class="font-medium">
        2. Back View
        <i
          v-if="fileUrlBack"
          class="ml-2 fa fa-check text-base text-green-500"
        ></i>
      </h3>
      <div class="rounded-md border-2 border-dashed p-4 w-full">
        <img
          v-if="fileUrlBack !== null"
          :src="fileUrlBack"
          class="h-[300px] w-full"
          alt=""
        />
        <div v-else class="flex flex-col justify-center items-center space-y-5">
          <div>
            <img src="@/assets/Svg/camera.svg" alt="" />
          </div>
          <h4 class="font-medium text-xs text-[#201E1E80]">Back view</h4>

          <button
            @click="uploadFile(2)"
            class="border border-blue-500 rounded cursor-pointer py-2 px-4"
          >
            Take a shot
          </button>
        </div>
      </div>
      <button
        v-if="fileUrlBack"
        type="button"
        class="w-full mt-4 px-2 py-3 rounded border border-red-500 hover:bg-red-500 transform duration-300 ease-linear hover:text-white"
        @click="fileUrlBack = null"
      >
        Pick new file
      </button>

      <!-- Date of identity issue -->

      <div>
        <h3 class="mb-2 font-medium">
          3. Date identity document was issued
          <i
            v-if="dateIssued"
            class="ml-2 fa fa-check text-base text-green-500"
          ></i>
        </h3>
        <input
          type="date"
          name="Dirth_of_Expiry"
          required
          placeholder="Dirth of issued"
          class="focus:border-blue-400 border w-full rounded outline-none flex-1 p-3"
          @change="getDateValue('dateIssued', $event)"
          :value="dateIssued"
        />
      </div>
      <!-- Date of identity docuemnt Expired -->

      <div>
        <h3 class="mb-2 font-medium">
          4. Date identity document will expire
          <i
            v-if="dateOfExpiration"
            class="ml-2 fa fa-check text-base text-green-500"
          ></i>
        </h3>
        <input
          type="date"
          name="Dirth_of_Expiry"
          required
          placeholder="Dirth of Expiry"
          class="focus:border-blue-400 border w-full rounded outline-none flex-1 p-3"
          @change="getDateValue('dateOfExpiration', $event)"
          :value="dateOfExpiration"
        />
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
/* eslint-disable */
import * as filestack from "filestack-js";
export default {
  props: [
    "handleDocumentState",
    "fileUrlFront",
    "fileUrlBack",
    "dateIssued",
    "dateOfExpiration",
  ],
  name: "stage2Step3",
  data() {
    return {
      filestackApiKey: "Awx4a6SdRNetnUtuawgS7z",
    };
  },

  methods: {
    uploadFile(storage) {
      const options = {
        accept: "image/*",
        maxFiles: 1,
        onOpen: () => console.log("opened!"),
        onUploadDone: (res) => {
          if (storage == 1) {
            this.fileUrlFront = res.filesUploaded[0].url;
            this.handleDocumentState("fileUrlFront", this.fileUrlFront);
          } else {
            this.fileUrlBack = res.filesUploaded[0].url;
            this.handleDocumentState("fileUrlBack", this.fileUrlBack);
          }
        },
      };
      filestack.init(this.filestackApiKey).picker(options).open();
    },
    getDateValue(state, e) {
      this.handleDocumentState(state, e.target.value);
    },
  },
};
</script>

<style></style>
