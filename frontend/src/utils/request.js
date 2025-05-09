import axios from "axios"

const request = axios.create({
    baseURL: "https://event-booking-system-rhka.onrender.com/api",
    // baseURL: "http://localhost:8000/api",
});

export default request;