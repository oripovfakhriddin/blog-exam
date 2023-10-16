import axios from "axios";
import { ENDPOINT } from "../constants";

const request = axios.create({
  baseURL: `${ENDPOINT}api/v1`,
  timeout: 10000,
})

export default request;