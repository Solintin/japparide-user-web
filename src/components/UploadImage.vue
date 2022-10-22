<!-- eslint-disable -->
<template>
  <div>
    <div class="rounded-md border-2 border-dashed p-4 w-full">
      <img
        v-if="picture !== null"
        :src="picture"
        class="h-[300px] w-full"
        alt=""
      />
      <div v-else class="flex flex-col justify-center items-center space-y-5">
        <div>
          <img src="@/assets/Svg/camera.svg" alt="" />
        </div>
        <h4 class="font-medium text-xs text-[#201E1E80]">Passport</h4>
        <input
          @change="handleImageUpload($event)"
          id="uploadImage"
          type="file"
          accept="image/*"
          hidden
        />

        <label
          for="uploadImage"
          class="border border-blue-500 rounded cursor-pointer py-2 px-4"
        >
          Take a shot
        </label>
      </div>
    </div>
    <button
      v-if="picture"
      type="button"
      class="w-full mt-4 px-2 py-3 rounded border border-red-500 hover:bg-red-500 transform duration-300 ease-linear hover:text-white"
      @click="picture = null"
    >
      Re-take
    </button>

    <!-- <button
      @click="updateStatus"
      :disabled="update"
      :class="update ? 'cursor-not-allowed' : null"
      class="text-white bg-[#ed3236] rounded-3xl w-full py-2 mt-4"
    >
      <span v-if="update">Updating</span>
      <span v-else> Update status</span>
    </button> -->
  </div>
</template>
<!-- eslint-disable -->

<script>
/*eslint-disable*/
export default {
  name: "UploadInmage",
  data() {
    return {
      imageUpdate: null,
      picture: null,
    };
  },

  methods: {
    handleImageUpload(event) {
      this.imageUpdate = event.target.files[0];
      this.picture = URL.createObjectURL(this.imageUpdate);
      formData.append("image", this.imageUpdate);
    },
  },
};
</script>

<style></style>
