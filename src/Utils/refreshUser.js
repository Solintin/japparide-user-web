/* eslint-disable */
import axios from "@/Utils/axios.config.js";

export const refreshUser = async (user_id, access_token, store) => {
  store.dispatch("setLoading", true);

  await axios
    .get(`/users/?user_id=${user_id}`, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => {
      store.dispatch("setLoading", false);
      store.dispatch("setUserData", response.data.data);
    });
};
