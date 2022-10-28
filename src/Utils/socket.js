/* eslint-disable  */

import { io } from "socket.io-client";
const socket = io("https://japparide.herokuapp.com", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
})

export const startConnection = () => {
  socket.on("connect", () => {
    console.log(`Connected with id:${socket.id}`);
  });
};
export const sendRequest = (data) => {
  const options = {
    user: socket.id,
    data: data,
  };
  socket.emit("send-request", options);
};
export const getRequest = (checkRequest, getData) => {
  socket.on("get-request", (request) => {
    console.log(request);
    checkRequest();
    getData(request);
  });
};
export const sendAccept = (message, passenger) => {
  socket.emit("send-accept", message, passenger);
};
export const getAccept = (checkAccept) => {
  socket.on("get-accept", () => {
    checkAccept();
  });
};
export const sendPassengerCancelRequest = () => {
  socket.emit("passenger-cancel-request");
};
export const getPassengerCancelRequest = (listener) => {
  socket.on("get-passenger-cancel-request", () => {
    listener();
  });
};
export const sendDriverCancelRequest = (user) => {
  socket.emit("driver-cancel-request", user);
};
export const getDriverCancelRequest = (listener) => {
  socket.on("get-driver-cancel-request", () => {
    listener();
  });
};

export const passengerCancelRequest = () => {
  socket.emit("passenger-cancel-request");
};

export const rideCompleted = (user) => {
  socket.emit("ride-completed", user);
};
export const rideCompletedNotification = (listener) => {
  socket.on("get-ride-completed", () => {
    listener();
  });
};
