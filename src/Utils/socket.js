/* eslint-disable  */

import { io } from "socket.io-client";

const socket = io("https://japparide.hrokuapp.com");

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
