<!-- eslint-disable -->
<template>
  <div>
    <div
      :class="isOpen ? ' translate-x-0' : ' -translate-x-[10000px]'"
      class="overlay px-10 flex justify-center cursor-pointer items-center transform"
    >
      <div class="z-[12]">
        <div
          class="w-screen h-screen sm:h-auto sm:w-[500px] rounded-md bg-white px-4 pt-12 pb-8"
        >
          <div class="flex justify-center items-center space-x-4 mb-6">
            <div
              class="animate animate-pulse grid place-content-center w-10 h-10 text-white bg-[#0192ED] p-4 rounded-full"
            >
              <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </div>
            <h1 class="text-center font-bold">Send Fund</h1>
          </div>

          <form @submit.prevent="confirmSendMoneyAction">
            <label class="font-medium mb-2">Amount</label>
            <div class="mb-1 rounded flex border">
              <input
                required
                type="number"
                name="amount"
                max="10000"
                min="100"
                step="0.01"
                autocomplete="off"
                placeholder="Amount"
                v-model.trim="amount_for_transfer"
                class="bg-transparent w-full border-none outline-none flex-1 p-3"
              />
            </div>
            <div class="text-red-500 w-full text-xs md:text-base">
              <p v-if="!$v.amount_for_transfer.maxValue" class="">
                Level 1 users can only transfer NGN 10,000 or below.
              </p>
              <p v-if="!$v.amount_for_transfer.minValue" class="">
                Minimum transfer amount is NGN 100.
              </p>
            </div>
            <h5 class="text-right text-gray-500 text-sm font-medium mb-4">
              Fee:
              <span class="text-green-500" v-if="Charge == 'Free'">{{
                Charge
              }}</span>
              <span class="text-red-500" v-else>{{ Charge }}</span>
            </h5>

            <div class="mb-4">
              <label class="font-medium mb-2">Receipient's bank </label>

              <div class="">
                <lv-dropdown
                  v-model="selectedBank"
                  :options="banks"
                  optionLabel="name"
                  placeholder="Select Bank"
                  editable
                  clearable
                  required
                />
              </div>
            </div>

            <div>
              <label class="font-mediummb-2">Receipient's account number</label>
              <div class="border py-3 px-4 flex items-center space-x-2">
                <input
                  type="number"
                  required
                  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                  maxlength="10"
                  @keyup="getAccountOwner($event)"
                  placeholder="Receipient's account number"
                  class="truncate outline-none w-full bg-transparent"
                  v-model="acctNumber"
                />

                <div
                  v-if="isAcctAvail"
                  class="h-6 w-6 rounded-full border-4 border-t-[#0192ED] border-r-[#0192ED] border-b-[#ed323730] border-l-[#ed323730] animate-spin"
                ></div>
              </div>
              <div class="font-bold text-sm mt-3">
                {{ accountDetails.account_name }}
              </div>
            </div>

            <div>
              <label class="font-medium mb-2">Narration</label>
              <div class="border py-3 px-4 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Narration"
                  class="truncate outline-none w-full bg-transparent"
                  v-model="narration"
                />
              </div>
            </div>

            <h6
              v-if="!currentUserData.no_of_debits_for_this_month"
              class="text-xs font-medium tex-center text-green-600 my-2"
            >
              🎉Congratulations! You now have access to 3 free debit transfers
              monthly.
            </h6>
            <h6
              v-else-if="currentUserData.no_of_debits_for_this_month == '2'"
              class="text-xs font-medium tex-center text-green-600 my-2"
            >
              You now have access to 1 free debit transfers left.
            </h6>
            <h6
              v-else-if="currentUserData.no_of_debits_for_this_month == '1'"
              class="text-xs font-medium tex-center text-green-600 my-2"
            >
              You now have access to 2 free debit transfer left.
            </h6>

            <div class="mt-4 flex justify-between items-center">
              <div
                @click="close"
                class="border border-red-500 rounded py-3 px-4 text-[12px] font-medium text-red-500"
              >
                Cancel
              </div>
              <button
                class="flex justify-center items-center space-x-3 bg-[#0192ED] text-white px-8 py-3 rounded w-auto"
                :class="loading ? 'cursor-not-allowed' : ''"
                :disabled="loading"
              >
                <action-loader v-if="loading" />

                <div v-else class="font-medium">Send</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import { validationMixin } from "vuelidate";
import { required, maxValue, minValue } from "vuelidate/lib/validators";
import LvDropdown from "lightvue/dropdown";
import { mapGetters } from "vuex";
import PincodeInput from "vue-pincode-input";
import axios from "axios";
import ActionLoader from "./ActionLoader.vue";
import { refreshUser } from "@/Utils/refreshUser";
export default {
  props: ["isOpen", "close"],
  mixins: [validationMixin],
  validations: {
    amount_for_transfer: {
      required,
      minValue: minValue(100),
      maxValue: maxValue(10000),
    },
  },
  components: {
    PincodeInput,
  },

  data() {
    return {
      loading: false,
      amount_for_transfer: "",
      accountDetails: {
        account_name: " ",
        account_number: "",
      },
      loadingPageData: false,
      isAcctAvail: false,
      acctNumber: "",
      narration: "",
      bankSelectedName: "",
      bankSelectedAcctNumber: "",
      selectedBank: null,
      banks: [],
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
    Charge() {
      if (+this.currentUserData.no_of_debits_for_this_month >= 3) {
        if (
          this.amount_for_transfer >= 100 &&
          this.amount_for_transfer <= 999.99
        ) {
          return "NGN 20.00";
        }
        if (
          this.amount_for_transfer >= 1000 &&
          this.amount_for_transfer <= 49999.99
        ) {
          return "NGN 35.00";
        }
        if (this.amount_for_transfer > 50000) {
          return "NGN 65.00";
        }
      } else return "Free";
    },
  },
  mounted() {
    //get new user changes at every page load
    refreshUser(
      this.currentUserData.id,
      this.currentUser.access_token,
      this.$store
    );
    this.getBanks();
    this.transferChargeChecker(
      this.currentUserData.no_of_debits_for_this_month
    );
  },
  methods: {
    confirmSendMoneyAction() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if (this.accountDetails.account_name) {
          this.$swal({
            title: "Are you sure?",
            text: "Confirm you want to continue this transaction",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.isConfirmed) {
             
              this.sendMoney();
            }
          });
        } else {
          this.$toast.error("Provide a valid recipient account");
        }
      }
    },
    sendMoney() {
      this.loading = true;
      axios
        .post("https://middey-francis2-staging.herokuapp.com/api/create-transfer", {
          user_id: this.currentUserData.id,
          request_id: `bank_transfer_${Date.now()}`,
          amount_for_transfer: +this.amount_for_transfer,
          bank_code: this.selectedBank.code.toString(),
          account_bank_code: this.selectedBank.code.toString(),
          account_bank_name: this.selectedBank.name.toString(),
          account_number: this.accountDetails.account_number.toString(),
          account_name: this.accountDetails.account_name.toString(),
          note: `${this.narration}/FRM ${this.currentUserData.account_name_ng_default}`,
        })
        .then((response) => {
          this.loading = false;
          location.reload();
          refreshUser(
            this.currentUserData.id,
            this.currentUser.access_token,
            this.$store
          );
          if (response.data.message.toLowerCase().includes("progress")) {
            this.$swal("Successful", `${response.data.message}`, "success");
            this.close();
          } else {
            this.$toast.error(response.data.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.$toast.error("An error occured.");
        });
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
      if (e.target.value.length > 9 || e.target.value.length == 10) {
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
    digitFormatter(balance) {
      return util.digitFormatter(balance);
    },
    transferChargeChecker(count) {
      if (!count) {
        return 0;
      } else if (count == "1") {
        return 1;
      } else if (count == "2") {
        return 2;
      } else if (count == "3") {
        return 3;
      }
    },
  },
  components: { PincodeInput, LvDropdown, ActionLoader },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.3s linear;
}
.booknow {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
}
</style>
