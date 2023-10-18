import axios from "axios";
import { ENDPOINT, TOKEN } from "../constants";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1`,
  timeout: 10000,
  headers: { Authorization: `Bearer ${Cookies.get(TOKEN)}` },
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    toast.error(err.response.data);
    return Promise.reject(err);
  }
);

export default request;
