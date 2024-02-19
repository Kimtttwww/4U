import axios from "axios";

// const baseURL = "http://localhost:3000/order";
const instance = axios.create({ baseURL: "http://localhost:3000/order" });

export const loadInfoAPI = async (data) => {
    try {
        const response = await instance.post("/loadOrdererInfo", null, {
            params: data
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        return "Orderer?? data없어요...";
    }
}


