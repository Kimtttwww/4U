import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:3000/order" });

export const mainCateListAPI = async () => {
    try {
        const response = await instance.post("/mainCate");
        return response.data;
    } catch (error) {
        return "mainCate data없어요...";
    }
}

export const subCateListAPI = async (data) => {
    try {
        const response = await instance.post("/subCate", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return "subCate data없어요...";
    }
}