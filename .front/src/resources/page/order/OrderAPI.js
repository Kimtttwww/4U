import axios from "axios";

// const baseURL = "http://localhost:3000/order";
const instance = axios.create({ baseURL: "http://localhost:3000/order" });

export const loadInfoAPI = async (data) => {
    try {
        const response = await instance.post("/loadOrdererInfo", data);
        return response.data;
    } catch (error) {
        return "Orderer?? data없어요...";
    }
}

export const loadOrderAPI = async (data) => {
    try {
        const response = await instance.post("/loadOrder", data);
        return response.data;
    } catch (error) {
        return "Order data없어요...";
    }
}