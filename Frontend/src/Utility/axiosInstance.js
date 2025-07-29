import axios from "axios";
import { BASE_URL } from "./apiPath";

// Axios Instance
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

// Axios Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token"); // 🔁 FIXED: token key should be in quotes
        if (accessToken) { // 🔁 FIXED: checking `accessToken` instead of undefined `token`
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // 🔁 FIXED: return missing
    }
);

// Axios Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/"; // Unauthorized
            } else if (error.response.status === 500) { // 🔁 FIXED: typo `ressponse` → `response`
                console.error("Server error. Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error);
    }
);
