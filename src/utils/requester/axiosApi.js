import axios from "axios";
import {BASE_URL} from "../lib/variables.js";
export const axiosApi = axios.create({
    baseURL: BASE_URL,
});
axiosApi.interceptors.request.use(
    (config) => {
        const userLanguage = localStorage.getItem("i18nextLng");
        if (userLanguage) {
            config.headers["Accept-Language"] = userLanguage;
        }
        return config;
    }
);
export const requester = async (url) => {
    try {
        const response = await axiosApi.get(url);
        const data = response.data;

        if (!data) {
            throw new Error("Not Found");
        }
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


