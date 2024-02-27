import axios from "axios";

// const baseURL = "http://localhost:3000/order";
const instance = axios.create({ baseURL: "http://localhost:3000/order" });
const instanceProd = axios.create({ baseURL: "http://localhost:3000/product" });

// member 정보 가져오기
export const loadInfoAPI = async (data) => {
    try {
        const response = await instance.post("/loadMemberInfo", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return "member?? data없어요...";
    }
}

// member의 coupon정보 가져오기
export const loadUserCouponAPI = async (data) => {
    try {
        const response = await instance.post("/loadUserCoupon", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return "쿠폰?? data없어요...";
    }
}

// 주문할 상품정보 가져오기
export const loadProdNameAPI = async (data) => {
    try {
        const response = await instanceProd.post("/loadProdName", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return "상품명?? data없어요...";
    }
}

// 주문할 상품정보(prodDetail-option) 가져오기
export const loadProdDetilAPI = async (data) => {
    try {
        const response = await instanceProd.post("/loadProdDetail", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return "상품detail?? data없어요...";
    }
}