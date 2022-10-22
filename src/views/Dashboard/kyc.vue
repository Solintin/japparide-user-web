<!-- eslint-disable -->
<template>
  <div>
    <Loader v-if="false" />
    <div class="w-full py-16 px-4">
      <div class="mt-5 font-medium">
        Hello {{ currentUserData.first_name }} {{ currentUserData.last_name }},
      </div>
      <div
        v-if="currentUserData.user_kyc_level == '1'"
        class="flex space-x-2 items-center"
      >
        <span>You are fully verified</span>
        <div
          class="grid place-content-center uppercase text-white bg-green-600 h-5 w-5 rounded-full"
        >
          <i class="fa fa-check text-xs text-white"></i>
        </div>
      </div>
      <div v-else>You are not fully verified</div>

      <div class="flex mt-10 text-black ">
        <button
          @click="handleStage('1')"
          class="px-10 py-2 font-medium rounded-tl-lg"
          :class="stage1 ? 'bg-[#0192ED] text-white' : 'bg-white text-black'"
        >
          Stage 1
        </button>
        <button
          @click="handleStage('2')"
          class="px-10 py-2 font-medium rounded-tr-lg"
          :class="stage2 ? 'bg-[#0192ED] text-white' : 'bg-white text-black'"
        >
          Stage 2
        </button>
      </div>
      <div class="border-4 border-white" v-if="stage1">
        <div class="bg-white rounded-md p-4">
          <div class="font-bold my-2">KYC Info <small> </small></div>

          <div class="md:text-sm text-xs space-x-2 items-center flex">
            <div>Status:</div>
            <div
              v-if="currentUserData.user_kyc_level == '1'"
              class="bg-green-500 h-3 w-3 rounded-full"
            ></div>
            <div
              v-else-if="currentUserData.user_kyc_level == '0'"
              class="bg-red-500 h-3 w-3 rounded-full"
            ></div>
            <div v-else class="bg-yellow-200 h-3 w-3 rounded-full"></div>
          </div>
          <div class="md:text-sm text-xs space-x-2 items-center flex">
            <div>Message:</div>
            <div
              v-if="currentUserData.user_kyc_level == '1'"
              class="font-medium"
            >
              {{ currentUserData.user_kyc_info_msg }}
            </div>
            <div
              v-else-if="currentUserData.user_kyc_level == '0'"
              class="font-medium"
            >
              {{ currentUserData.user_kyc_info_msg }}
            </div>
            <div v-else class="bg-yellow-200 h-3 w-3 rounded-full font-medium">
              {{ currentUserData.user_kyc_info_msg }}
            </div>
          </div>
          <div class="md:text-sm text-xs space-x-2 items-center flex">
            <div>Last Updated:</div>
            <div class="font-medium">
              {{
                new Date(
                  +currentUserData.user_kyc_verification_created_at
                ).toDateString()
              }}
            </div>
          </div>
        </div>
        <div class="bg-white rounded-md p-4 mt-10">
          <form @submit.prevent="verifyName = !verifyName">
            <div class="flex flex-col space-y-2 divide-y">
              <div>
                <div class="font-bold">
                  SETTLEMENT ACCOUNT DETAILS
                  <span
                    class="text-green-500"
                    v-if="currentUserData.account_no_ng_default"
                  >
                    - Completed
                  </span>
                </div>
                <div class="my-2 md:11/12">
                  <small
                    >This is the default Account we will send payments to once
                    you receive money through Middey, for your verification to
                    be successful ensure the Account is linked to the BVN
                    provided &amp; also bears the Name you used when registering
                    on Middey. Once we verify your settlement account, we will
                    provide you with Middey Account to receive payments through
                    Middey.</small
                  >
                </div>
                <div class="mb-5">
                  <label class="font-medium mb-2">Bank Name </label>

                  <div>
                    <lv-dropdown
                      v-model="selectedBank"
                      :options="banks"
                      optionLabel="name"
                      placeholder="Select Bank"
                      editable
                      clearable
                    />
                  </div>
                </div>

                <div>
                  <label class="font-medium mb-2">Account Number </label>
                  <div class="border py-3 px-4 flex items-center space-x-2">
                    <input
                      type="number"
                      required
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      maxlength="10"
                      @keyup="getAccountOwner($event)"
                      placeholder="Acct number"
                      class="truncate outline-none w-full bg-transparent"
                      v-model="acctNumber"
                    />

                    <div
                      v-if="isAcctAvail"
                      class="h-6 w-6 rounded-full border-4 border-t-[#0192ED] border-r-[#0192ED] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
                    ></div>
                  </div>
                  <div class="font-bold">{{ accountDetails.account_name }}</div>
                </div>
              </div>

              <div class="space-y-2 py-2">
                <p class="font-medium">BVN</p>
                <div class="border py-3 px-4">
                  <input
                    type="number"
                    required
                    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                    maxlength="11"
                    placeholder="xxxxxxxxxxx"
                    class="truncate outline-none w-full bg-transparent"
                    v-model="bvn"
                  />
                </div>
                <p class="font-medium text-sm md:text-base">
                  <span class="text-red-500">Note:</span> You can dial
                  <a href="tel:*565*0#" class="text-blue-500">*565*0# </a> on
                  your phone to retrieve your BVN
                </p>
              </div>
            </div>

            <button
              v-if="currentUserData.user_kyc_level != '1'"
              class="flex justify-center items-center space-x-3 bg-[#0192ED] text-white px-8 py-3 rounded w-auto mx-auto mt-1"
              :class="loading ? 'cursor-not-allowed' : ''"
              :disabled="loading"
            >
              <div
                v-if="loading"
                class="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
              ></div>

              <div v-else class="font-medium">Submit settlement account</div>
            </button>
          </form>
        </div>
      </div>
      <div class="border-4 border-white p-4 bg-white" v-if="stage2">
       <Kyc_stage2 />
      </div>
    </div>

    <!-- Name Verification Modal -->
    <div>
      <div
        v-show="verifyName"
        @click="verifyName = !verifyName"
        :class="
          verifyName
            ? ' transform  translate-x-0'
            : ' transform  - translate-x-[1000px]'
        "
        class="px-10 flex justify-center cursor-pointer items-center overlay transform transition duration-300 bg-red-500"
      ></div>

      <div
        class="z-10 booknow transform transition duration-300"
        v-show="verifyName"
        :class="verifyName ? ' translate-x-0' : '- translate-x-[1000px]'"
      >
        <div class="rounded-md bg-white px-4 py-5">
          <div class="flex justify-end mb-b">
            <div @click="verifyName = !verifyName">
              <i class="fa-solid text-red-500 fa-close"></i>
            </div>
          </div>

          <div class="font-bold md:text-base text-xs mb-3 text-center">
            Ensure this name match the one on your account number
          </div>

          <label class="font-medium mb-2">First Name</label>
          <div class="my-2 rounded flex border items-center">
            <input
              type="text"
              name="text"
              v-model.trim="first_name"
              class="bg-transparent border-none outline-none flex-1 p-3"
            />
          </div>
          <div>
            <small
              v-if="!$v.first_name.required && $v.first_name.$dirty"
              class="text-red-500"
            >
              First Name is required!
            </small>
          </div>

          <label class="font-medium mb-2">Last Name</label>
          <div class="my-2 rounded flex border items-center">
            <input
              type="text"
              name="text"
              v-model.trim="last_name"
              @keypress.enter="updatePhoneAndVerify"
              class="bg-transparent border-none outline-none flex-1 p-3"
            />
          </div>
          <div>
            <small
              v-if="!$v.first_name.required && $v.first_name.$dirty"
              class="text-red-500"
            >
              Last Name is required!
            </small>
          </div>

          <button
            @click="submitForm"
            class="bg-blue-500 flex justify-center text-white md:text-base text-xs rounded py-2 px-3 w-full"
            :class="loading ? 'cursor-not-allowed' : ''"
            :disabled="loading"
          >
            <ActionLoader v-if="loading" />

            <div v-else class="font-medium">Confirm</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import LvDropdown from "lightvue/dropdown";
import PincodeInput from "vue-pincode-input";
import { validationMixin } from "vuelidate";
import { required, minLength, numeric } from "vuelidate/lib/validators";
import axios from "axios";
import { mapGetters } from "vuex";
import Loader from "../../components/Loader.vue";
import ActionLoader from "../../components/ActionLoader.vue";
import Kyc_stage2 from "../../components/kyc_stage2.vue";
export default {
  mixins: [validationMixin],
  validations: {
    first_name: {
      required,
    },
    last_name: {
      required,
    }
  },

  data() {
    return {
      verifyName: false,
      loading: false,
      loadingPageData: false,
      isAcctAvail: false,
      phone_number: "",
      bvn: "",
      type: "password",
      showPasswordtoggle: false,
      bankListIsOpen: false,
      acctNumber: "",
      accountDetails: {
        account_name: " ",
        account_number: "",
      },
      bankSelectedName: "",
      bankSelectedAcctNumber: "",
      selectedBank: null,
      banks: [],
      first_name: "",
      last_name: "",
      stage1: true,
      stage2: false,
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
  },
  mounted() {
    // if (
    //   this.currentUserData.nll_user_email_address_verified == "yes" &&
    //   this.currentUserData.phone_verified
    // ) {
    // } else {
    //   this.$toast.error("Email, phone number and BVN must be verified");

    //   this.$router.push("/settings");
    // }
    this.getBanks();
    (this.first_name = this.currentUserData.first_name),
      (this.last_name = this.currentUserData.last_name),
      (this.bankSelectedName =
        this.currentUserData.account_details_for_settlement_default?.account_bank);
    this.bankSelectedAcctNumber =
      this.currentUserData.account_details_for_settlement_default?.account_number;
  },
  methods: {
    showPassword() {
      this.showPasswordtoggle = !this.showPasswordtoggle;
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    submitForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.verifyName = false;
        this.loading = true;
        axios
          .post(
            "https://middey-francis1-staging.herokuapp.com/api/kyc/nigeria/user-settlement-account",
            {
              user_id: this.currentUserData.id,
              first_name: this.first_name,
              last_name: this.last_name,
              bvn: this.bvn.toString(),
              bank_code: this.selectedBank.code.toString(),
              account_bank: this.selectedBank.name.toString(),
              account_number: this.accountDetails.account_number.toString(),
              account_name: this.accountDetails.account_name.toString(),
            }
          )
          .then((response) => {
            this.loading = false;
            this.$toast.success(response.data.message);
            this.$router.push("/");
          })
          .catch((err) => {
            this.loading = false;
            if (err.response.status === 503) {
              this.$toast.error("An error occured. Please try again");
              location.reload();
            }
          });
      }
    },
    getBanks() {
      this.loadingPageData = true;
      axios
        .get("https://middey.baremind.co.za/api/banks/ng")
        .then((response) => {
          this.banks = response.data;
          this.loadingPageData = false;
        })
        .catch((err) => {
          this.loadingPageData = false;
        });
    },
    handleBankSelection() {
      if (this.bankSelected !== "") {
        this.selectedBank = this.banks.find(
          (bank) => bank.name.toLowerCase() == this.bankSelected.toLowerCase()
        );
      }
    },
    getAccountOwner(e) {
      if (e.target.value.length > 9) {
        this.isAcctAvail = true;
        axios
          .post(
            "https://middey.baremind.co.za/api/resolve-account-details/ng",
            {
              account_number: this.acctNumber,
              account_bank: this.selectedBank.code,
            }
          )
          .then((response) => {
            this.isAcctAvail = false;
            if (response.data.status == "error") {
              this.$toast.error("Sorry, reciepient account not found");
              this.accountDetails.account_name = "";
            } else {
              this.isAcctAvail = false;

              this.accountDetails.account_name =
                response.data.data.account_name;
              this.accountDetails.account_number =
                response.data.data.account_number;
            }
          })
          .catch((err) => {
            this.isAcctAvail = false;
          });
      } else {
        this.accountDetails.account_name = "";
      }
    },
    handleStage(stage) {
      if (stage == "1") {
        this.stage1 = true;
        this.stage2 = false;
      }
      if (stage == "2") {
        this.stage2 = true;
        this.stage1 = false;
      }
    },
  },
  components: { PincodeInput, Loader, LvDropdown, ActionLoader, Kyc_stage2 },
};
</script>

<style scoped>
.otp-input {
  width: 10px;
  height: 10px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input.error {
  border: 1px solid red !important;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.verified {
  @apply bg-green-200 text-green-700 font-bold text-[10px] py-[4px] px-2 rounded-3xl;
}
.not-verified {
  @apply bg-pink-200 text-pink-700 font-bold text-[10px] py-[4px] px-2 rounded-3xl;
}

.overlay {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
.booknow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
}
.el-select,
.el-input {
  width: 100%;
}
</style>
