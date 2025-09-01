import axios from "axios";

const API = axios.create({
    baseURL: "https://smartstock-75j6.onrender.com/",
});

// Agar token hai to har request me bhej do
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
