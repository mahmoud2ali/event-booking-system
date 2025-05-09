import axios from "axios"

const request = axios.create({
    //Deployment URL
    // baseURL: "https://event-booking-system-rhka.onrender.com/api", 
    // Localhost URL
    baseURL: "http://localhost:8000/api",
});

export default request;