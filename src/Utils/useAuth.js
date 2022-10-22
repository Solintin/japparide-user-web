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
    .post("/users/", credentials, {
      headers: {
        authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJpYXQiOjE2NjMyMzI0ODIsImV4cCI6MTY3OTAxMjQ4MiwidXNlciI6eyJpZCI6NCwidXNlcm5hbWUiOiJGbGFzaCIsInJvbGVzIjpbImFkbWluaXN0cmF0b3IiXX19.86Dt3jlrDtMSO_tBbGEq6u76AQfDrprdBb7yGochV3Y",
      },
    })
    .then((response) => {
      handleLoading(false);
      dis.$toast.success("Registration Successful");
      axios
        .get(
          `/verify-email-address/?email_address=${credentials.user_email}&fire_email=true`
        )
        .then((response) => {
          dis.$router.push(
            `/verify_email?verification_email=${credentials.user_email}`
          );
        })
        .catch((error) => {
          errorLogger(dis, error.response.data.error);
        });
    })
    .catch((error) => {
      handleLoading(false);
      errorLogger(error.response.data.error, dis);
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
    .post("/users/login/", credentials)
    .then((response) => {
      console.log(response);
      store.dispatch("setUser", response.data.data);
      const { user_id } = response.data.data;
      const { access_token } = response.data.data;
      getUsers(user_id, access_token, store, router, dis, handleLoading);
    })
    .catch((error) => {
      handleLoading(false);
      dis.$toast.error(error.response.data.error[0]);
      console.log(error);
    });
};
