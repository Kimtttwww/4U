import axios from "axios";

// const baseURL = "http://localhost:3000/order";
const instance = axios.create({ baseURL: "http://localhost:3000/order" });

// member 정보 가져오기
export const loadInfoAPI = async (data) => {

    try {
        const response = await instance.post("/loadMemberInfo", data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
        console.log("API member data? ", response);
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

