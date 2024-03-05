import axios from "axios";

const prod = axios.create({ baseURL: "/product" });

// cateMain No에 해당하는 상품들
export const loadMainProdAPI = async (data) => {
    const response = await prod.get(`/listMainNo?cateMain=${data}`);
    // console.log("loadMainProdAPI : ", response.data);
    return response.data;
}

// cateMain No+cateSub No에 해당하는 상품들
export const loadSubProdAPI = async (data) => {
    // console.log(data.cateMain + "........" + data.cateSub);
    const response = await prod.get(`/listSubNo?cateMain=${data.cateMain}&cateSub=${data.cateSub}`);
    return response.data;
}