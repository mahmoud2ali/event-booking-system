import axios from "axios"

const request = axios.create({
    baseURL: "https://event-booking-system-rhka.onrender.com/api",
});

export default request;