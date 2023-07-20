import axios from "axios";


const api = axios.create({
  baseURL: "User_API_BASE_URL",
  headers: {
    Authorization: "Basic " + btoa("ADMIN@gmail.com:admin"),
    "Content-Type": "application/json",
  },
});




export default api;
