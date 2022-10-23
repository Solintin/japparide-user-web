/* eslint-disable  */
import axios from "@/Utils/axios.config.js";
import { getUsers } from "@/Utils/getUser.js";

//error Logger Function
const errorLogger = (error, dis) => {
  console.log(error);
  error.map((err) => {
    for (const [_, value] of Object.entries(err)) {
      dis.$toast.error(value[0]);
    }
  });
};
export const useRegister = async (
  credentials,
  store,
  router,
  dis,
  handleLoading
) => {
  handleLoading(true);
  await axios
    .post("/auth/local/register", credentials)
    .then((response) => {
      console.log(response);

      const { is_user_also_a_driver } = response.data.user;
      store.dispatch("setUserData", response.data);
      if (is_user_also_a_driver) {
        router.push("/driver/dashboard");
        dis.$swal("Welcome", `Registration Succesful`, "success");
      } else {
        router.push("/passenger/dashboard");
        dis.$swal("Welcome", `Registration Succesful`, "success");
      }
    })
    .catch((error) => {
      handleLoading(false);
      dis.$toast.error(error.response.data.error.message);
      console.log(error);
    });
};

export const useLogin = async (
  credentials,
  store,
  router,
  dis,
  handleLoading
) => {
  handleLoading(true);
  await axios
    .post("/auth/local/", credentials)
    .then((response) => {
      console.log(response);

      const { is_user_also_a_driver } = response.data.user;
      store.dispatch("setUserData", response.data);
      if (is_user_also_a_driver) {
        router.push("/driver/dashboard");
        dis.$swal("Welcome back", `Login Succesful`, "success");
      } else {
        router.push("/passenger/dashboard");
        dis.$swal("Welcome back", `Login Succesful`, "success");
      }
    })
    .catch((error) => {
      handleLoading(false);
      dis.$toast.error(error.response.data.error.message);
      console.log(error);
    });
};
