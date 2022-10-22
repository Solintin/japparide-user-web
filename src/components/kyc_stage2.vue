<!-- eslint-disable -->
<template>
  <div>
    <section class="mx-auto max-w-xl">
      <h1 class="text-blue-500 font-medium text-xl mb-4 text-center">
        Step {{ step }}
      </h1>
      <div class="space-y-6" v-if="step == 1">
        <div>
          <h3 class="mb-2 font-medium">
            1. Upload passport photograph
            <span>
              <i
                v-if="passport"
                class="ml-2 fa fa-check text-base text-green-500"
              ></i>
            </span>
          </h3>
          <Webcam
            :passport="passport"
            :handlePassport="handlePassport"
            v-if="!isMobile"
          />
          <UploadImage
            v-if="isMobile"
            :passport="passport"
            :handlePassport="handlePassport"
          />
        </div>
        <div>
          <h3 class="mb-2 font-medium">
            2. Gender
            <span>
              <i
                v-if="gender"
                class="ml-2 fa fa-check text-base text-green-500"
              ></i>
            </span>
          </h3>
          <select
            class="overflow-ellipsis border-2 outline-none border-gray-300 w-full rounded-lg p-3.5 focus:border-blue-400"
            name="staff_gender"
            v-model="gender"
          >
            <option disabled value="">--Select Gender--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <h3 class="mb-2 font-medium">
            3. Date of birth
            <span>
              <i
                v-if="dob"
                class="ml-2 fa fa-check text-base text-green-500"
              ></i>
            </span>
          </h3>
          <input
            type="date"
            name="staff_first_name"
            required
            placeholder="Dirth of birth"
            v-model.trim="dob"
            class="focus:border-blue-400 border w-full rounded outline-none flex-1 p-3"
          />
        </div>

        <div>
          <h3 class="mb-2 font-medium">
            4. Country of origin
            <span>
              <i
                v-if="selectedCountry"
                class="ml-2 fa fa-check text-base text-green-500"
              ></i>
            </span>
          </h3>
          <vue-country-dropdown
            @onSelect="onSelect"
            :preferredCountries="['NG']"
            :disabledFetchingCountry="true"
            :defaultCountryByAreaCode="+selectedCountryCode"
            :immediateCallSelectEvent="true"
            :enabledFlags="true"
            :enabledCountryCode="false"
            :showNameInput="true"
            :showNotSelectedOption="true"
            :notSelectedOptionText="'Not Selected'"
          >
          </vue-country-dropdown>
        </div>
      </div>

      <Stage2step2
        v-if="step === 2"
        :next="next"
        :handleDocumentType="handleDocumentType"
        :documentType="documentType"
      />
      <Stagestep3
        v-if="step === 3"
        :handleDocumentState="handleDocumentState"
        :fileUrlFront="fileUrlFront"
        :fileUrlBack="fileUrlBack"
        :dateIssued="dateIssued"
        :dateOfExpiration="dateOfExpiration"
      />
      <Stage2final v-if="step === 4" />
      <div class="flex justify-between items-center">
        <button
          v-if="step != 4"
          @click="prev"
          :class="step > 1 ? 'opacity-100' : 'opacity-0'"
          class="rounded items-center my-4 p-3 bg-[#0192ED] space-x-3 text-white"
        >
          <i class="fas fa-arrow-left"> </i><span>Prev</span>
        </button>
        <button
          v-if="step != 2 || step != 3"
          @click="next"
          :class="step < 3 ? 'opacity-100' : 'opacity-0'"
          class="rounded items-center my-4 p-3 bg-[#0192ED] space-x-3 text-white"
        >
          <span>Next</span> <i class="fas fa-arrow-right"> </i>
        </button>
        <button
          v-if="step == 3"
          @click="submitHandler"
          :disabled="loading"
          class="rounded items-center my-4 p-3 bg-[#0192ED] space-x-3 text-white"
        >
          <ActionLoader v-if="loading" />

          <div v-else class="font-medium">Finish</div>
        </button>
      </div>
    </section>
  </div>
</template>
<!-- eslint-disable -->

<script>
/*eslint-enable*/
import VueCountryDropdown from "vue-country-dropdown";
import Webcam from "./webcam.vue";
import UploadImage from "./UploadImage.vue";
import Stage2step2 from "./stage2step2.vue";
import Stagestep3 from "./stagestep3.vue";
import Stage2final from "./stage2final.vue";
import axios from "axios";
import { mapGetters } from "vuex";
import ActionLoader from "./ActionLoader.vue";

export default {
  name: "Kyc_Level_2",
  components: {
    VueCountryDropdown,
    Webcam,
    UploadImage,
    Stage2step2,
    Stagestep3,
    Stage2final,
    ActionLoader,
  },

  data() {
    return {
      gender: "",
      nationality: "",
      dob: "",
      selectedCountry: "",
      selectedCountryCode: 234,
      webview: false,
      isMobile: false,
      passport: null,
      documentType: "",
      fileUrlFront: null,
      fileUrlBack: null,
      dateIssued: "",
      dateOfExpiration: "",
      step: 1,
      loading: false,
    };
  },
  mounted() {
    let userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes("wv")) {
      this.webview = true;
    }
    var isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobileDevice || this.webview) {
      this.isMobile = true;
    }
    console.log(userAgent.includes("wv"));
    console.log(isMobileDevice);
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
  },
  methods: {
    handlePassport(value) {
      //Store image gotten from webcam or camera into passport state
      this.passport = value;
    },
    handleDocumentType(value) {
      //Store image gotten from webcam or camera into passport state
      this.documentType = value;
    },
    handleDocumentState(state, value) {
      //e.g this.fileUrlFront = value
      this[state] = value;
    },
    onSelect({ name, iso2, dialCode }) {
      console.log(name, iso2, dialCode);
      this.selectedCountry = name;
      this.selectedCountryCode = dialCode;
    },
    next() {
      if (this.step >= 1 && this.step < 5) {
        this.step++;
      }
    },
    prev() {
      if (this.step > 1 && this.step < 4) {
        this.step--;
      }
    },

    async submitHandler() {
      this.loading = true;
      await axios
        .post(
          "https://middey-francis1-staging.herokuapp.com/api/user-kyc-level2-file-uploads",
          {
            user_id: this.currentUserData.id,
            user_profile_photo_url: this.passport,
            gender: this.gender,
            country_of_origin: this.selectedCountry,
            date_of_birth: this.selectedCountry,
            identity_document_date_of_issue: this.dateIssued,
            identity_document_date_of_expiry: this.dateOfExpiration,
            identity_document_file_url_front: this.fileUrlFront,
            identity_document_file_url_back: this.fileUrlBack,
            identity_document: this.documentType,
          }
          
        )
        .then((res) => {
          console.log(res);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
      this.next();
    },
  },
};
</script>

<style>
.vue-country-select {
  border-radius: 3px;
  display: inline-block;
  border: 1px solid #bbb;
  text-align: left;
  width: 100%;
  padding: 8px;
}
.vue-country-select .dropdown-list {
  width: calc(100% + 20px) !important;
  margin-left: -8px !important;
}
</style>
