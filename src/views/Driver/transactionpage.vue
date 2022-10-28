<!-- eslint-disable -->
<template>
  <div class="py-16 px-4">
    <div
      class="p-2 mb-1 bg-gray-100 rounded hidden md:grid grid-cols-2 items-center"
    >
      <div class="font-bold text-lg"> Transaction History</div>
      <div class="rounded flex border">
        <input
          type="search"
          name="sarch"
          placeholder="Search by Narration"
          v-model.trim="searchQuery"
          class="bg-white w-3/4 border-none outline-none flex-1 p-3"
        />
      </div>
    </div>
    <div class="md:hidden flex font-bold text-base md:mt-10 mb-2">
       Transaction History
    </div>

    <div v-if="loading" class="bg-white flex justify-center items-center py-28">
      <Spinner />
    </div>
    <div
      v-else
      class="md:block hidden table-wrapper mb-5 w-full rounded-xl shadow-xl border overflow-x-auto pb-6"
    >
      <table class="w-full items-center table-auto">
        <thead>
          <tr class="font-bold bg-[#DBEBFF]">
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">ID</th>
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
              Amount
            </th>
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
              Tnx Type
            </th>
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
              Narration
            </th>
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
              Date
            </th>
          </tr>
        </thead>
        <tbody
          v-if="filteredTransaction && filteredTransaction.length > 0"
          class="overflow-x-auto"
        >
          <tr
            v-for="(item, idx) in filteredTransaction"
            :class="` text-base font-medium hover:bg-gray-200 border-b`"
            :key="idx"
          >
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
              #{{ item.ID }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
              <div
                :class="
                  item.txn_type == 'CREDIT' ? 'text-green-600' : 'text-red-600'
                "
              >
                <span v-if="item.txn_type == 'CREDIT'">+</span
                ><span v-else>-</span> ₦ {{ digitFormatter(item.amount) }}
              </div>
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
              <span
                :class="
                  item.txn_type == 'CREDIT' ? 'text-green-600' : 'text-red-600'
                "
                >{{ item.txn_type }}</span
              >
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
              {{ item.note }}
            </td>

            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
              {{ getDate("LLL", item.post_date) }}
            </td>
          </tr>
        </tbody>
        <tbody v-else class="flex justify-center">
          <h1 class="text-center py-4 text-lg font-medium text-red-500">
            No result found
          </h1>
        </tbody>
      </table>
    </div>

    <div
      v-for="(value, propertyName, idx) in transactionMobileData"
      :key="idx"
      class="md:hidden block bg-gray-300 shadow border rounded mb-4"
    >
      <div class="bg-blue-400 text-white text-sm font-semibold p-2 rounded-sm">
        {{ getDate("LL", propertyName) }}
      </div>
      <div
        v-for="(item, idx) in value"
        :key="idx"
        class="font-medium mb-[1px] p-2 text-xs bg-white text-gray-700"
        :class="idx > value.length - 2 ? 'rounded-b' : null"
      >
        <div class="grid grid-cols-2 mb-2">
          <div
            :class="
              item.txn_type == 'CREDIT' ? 'text-green-600' : 'text-red-600'
            "
          >
            <span v-if="item.txn_type == 'CREDIT'">+</span
            ><span v-else>-</span> ₦ {{ digitFormatter(item.amount) }}
          </div>
          <div class="text-right">{{ getDate("LT", item.post_date) }}</div>
        </div>
        <div>{{ item.note }}</div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import moment from "moment";

import { mapGetters } from "vuex";
import * as util from "@/Utils/helper_function";

import axios from "axios";
import Spinner from "../../components/Spinner.vue";
export default {
  name: "Transaction",
  components: {
    Spinner,
  },
  data() {
    return {
      searchQuery: "",
      loading: false,
      TransactionDetails: [],
      transactionMobileData: {},
    };
  },
  computed: {
    ...mapGetters(["currentUserData", "currentUser"]),
    filteredTransaction() {
      if (typeof this.TransactionDetails == "object") {
        return this.TransactionDetails.filter((item) =>
          item.note.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.getTransactionHistory();
  },
  methods: {
    digitFormatter(balance) {
      return util.digitFormatter(balance);
    },
    getTransactionHistory() {
      this.loading = true;
      axios
        .get(
          `https://backend.middey.com/wp-json/rimplenet/v1/transactions?user_id=${this.currentUserData.id}`
        )
        .then((response) => {
          this.loading = false;
          this.TransactionDetails = response.data.data;
          this.TransactionDetails.forEach((item) => {
            const date = item.post_date.split(" ")[0];
            if (this.transactionMobileData[date]) {
              this.transactionMobileData[date].push(item);
            } else {
              this.transactionMobileData[date] = [item];
            }
          });
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    getDate(Format, date) {
      return moment(date).format(Format);
    },
  },
};
</script>

<style scoped>
.progress-spinner-demo-wrapper {
  display: flex;
  flex-flow: row wrap;
  /* height: 150px; */
  align-items: center;
  width: 80%;
}

@media (max-width: 450px) {
  .progress-spinner-demo-wrapper {
    height: max-content;
  }
}
</style>
