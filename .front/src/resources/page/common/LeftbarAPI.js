import axios from "axios";

// const baseURL = "http://localhost:3000/order";
const instance = axios.create({ baseURL: "http://localhost:3000/order" });

export const mainCateAPI = async () => {
    try {
        const response = await instance.post("/mainCate");
        return response.data;
    } catch (error) {
        return "mainCate data없어요...";
    }
}

export const subCateAPI = async (data) => {
    try {
        const response = await instance.post("/subCate", data);
        // console.log(data);
        return response.data;
    } catch (error) {
        return "subCate data없어요...";
    }
}