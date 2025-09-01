import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/",
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
