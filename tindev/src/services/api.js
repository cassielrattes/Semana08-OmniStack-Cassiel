import axios from "axios";

const api = axios.create({
  baseURL: "http://<PC-IPV4>:5000" // if you're using expo-cli
});

export default api;
