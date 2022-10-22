<!-- eslint-disable -->
<template>
  <div>
    <div class="mt-6 space-y-8">
      <div>
        <h1 class="font-medium text-xl text-center">Choose your document</h1>
        <p class="text-center text-xs italic">
          document to upload must be and official ID
        </p>
      </div>
      <div
        @click="proceed('nigeria drivers licence')"
        class="rounded bg-gray-50 cursor-pointer p-4 flex justify-between items-center hover:scale-105 hover:bg-gray-200 transform transition-transform duration-300"
      >
        <div class="flex items-center space-x-2">
          <img src="../assets/Svg/driving_lic.svg" alt="" />
          <div>
            <h1 class="font-bold">
              Driver’s license
              <span>
                <i
                  v-if="documentType == 'nigeria drivers licence'"
                  class="ml-2 fa fa-check text-base text-green-500"
                ></i>
              </span>
            </h1>
            <p class="text-xs">Front and back</p>
          </div>
        </div>
        <div>
          <img src="../assets/Svg/arrow-left.svg" alt="" />
        </div>
      </div>
      <div
        @click="proceed('nigeria nin')"
        class="rounded bg-gray-50 cursor-pointer p-4 flex justify-between items-center hover:scale-105 hover:bg-gray-200 transform transition-transform duration-300"
      >
        <div class="flex items-center space-x-2">
          <img src="../assets/Svg/Id.svg" alt="" />
          <div>
            <h1 class="font-bold">
              ID card/NIN
              <span>
                <i
                  v-if="documentType == 'nigeria nin'"
                  class="ml-2 fa fa-check text-base text-green-500"
                ></i>
              </span>
            </h1>
            <p class="text-xs">Front and back</p>
          </div>
        </div>
        <div>
          <img src="../assets/Svg/arrow-left.svg" alt="" />
        </div>
      </div>
      <div
        @click="proceed('nigeria inec voters card')"
        class="rounded bg-gray-50 cursor-pointer p-4 flex justify-between items-center hover:scale-105 hover:bg-gray-200 transform transition-transform duration-300"
      >
        <div class="flex items-center space-x-2">
          <img src="../assets/Svg/Id.svg" alt="" />
          <div>
            <h1 class="font-bold">
              Voters Card
              <span>
                <i
                  v-if="documentType == 'nigeria inec voters card'"
                  class="ml-2 fa fa-check text-base text-green-500"
                ></i>
              </span>
            </h1>
            <p class="text-xs">Front and back</p>
          </div>
        </div>
        <div>
          <img src="../assets/Svg/arrow-left.svg" alt="" />
        </div>
      </div>
      <div
        @click="proceed('international passport')"
        class="rounded bg-gray-50 cursor-pointer p-4 flex justify-between items-center hover:scale-105 hover:bg-gray-200 transform transition-transform duration-300"
      >
        <div class="flex items-center space-x-2">
          <img src="../assets/Svg/Id.svg" alt="" />
          <div>
            <h1 class="font-bold">
              International Passport
              <span>
                <i
                  v-if="documentType == 'international passport'"
                  class="ml-2 fa fa-check text-base text-green-500"
                ></i>
              </span>
            </h1>
            <p class="text-xs">Front and back</p>
          </div>
        </div>
        <div>
          <img src="../assets/Svg/arrow-left.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
/* eslint-disable */
export default {
  props: ["next", "handleDocumentType", "documentType"],
  name: "stage2Step2",
  data() {
    return {};
  },

  methods: {
    proceed(value) {
      this.handleDocumentType(value);
      this.next();
    },
  },
};
</script>

<style></style>
