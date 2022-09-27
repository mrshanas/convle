import { createApp } from "vue";
import axios, { AxiosRequestConfig } from "axios";
import VueAxios from "vue-axios";

import "./style.css";
import App from "./App.vue";
import router from "./routes";

const baseURL: string = "http://localhost:8000/api";

const api = axios.create({ baseURL });

api.interceptors.request.use((req: AxiosRequestConfig) => {
  //@ts-ignore
  const token: string = JSON.parse(localStorage.getItem("convle_access_token"));

  if (token) {
    //@ts-ignore
    req.headers.authorization = `Bearer ${token}`;
  }

  // temporarily
  //@ts-ignore
  req.headers.authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY0MzU3NzczLCJpYXQiOjE2NjQyNzEzNzMsImp0aSI6IjhiNGFlNzU2NTFlYjQ2OGI4ZGNhYzM2MDYzYmM2ZGU3IiwidXNlcl9pZCI6MX0._4kCDA_WY6O3y_HQuf06UTeRyAUNaDGnFCQbZ-Fhoko";
  return req;
});

createApp(App).use(router).use(VueAxios, api).mount("#app");
