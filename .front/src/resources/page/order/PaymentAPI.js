import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { insertOrderAPI } from "./OrderAPI";
import Cookies from "js-cookie";

export default function PaymentAPI({ userInfo, dataByPayment, changeInfo, orderProd, prodImgs }) {

    const navi = useNavigate();
    const { memberNo, memberName, phone, gradeNo } = userInfo;
    const { receiverName, phone1, phone2, phone3, address, addressDetail, zipCode } = changeInfo;
    const { applyCoupon, applyPoint, delMsg, discountCoupon, totalPrice, discountProd } = dataByPayment;


    useEffect(() => {
        const script1 = document.createElement("script");
        script1.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        document.head.appendChild(script1);

        const script2 = document.createElement("script");
        script2.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        document.head.appendChild(script2);

        return () => {
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        };
    }, []);


    let prodName = "";
    if (orderProd.length > 0) {
        prodName = Object.keys(orderProd).length > 0 ? `${orderProd[0].prodName} 외 ` : orderProd[0].prodName;
    };
    const count = orderProd.length;
    const couponNo = Object.keys(applyCoupon).length > 0 ? applyCoupon.couponNo : 0;
    const payPrice = totalPrice - discountCoupon - applyPoint;


    const insertToDb = async (insertData) => {
        return await insertOrderAPI(insertData);
    };

    const getObjData = (arr, key) => {
        let responseArr = [];
        arr?.forEach((item) => {
            if (item[key] != null) {
                responseArr.push(item[key]);
            };
        });
        return responseArr;
    };

    const updateCookies = () => {
        const cartItems = JSON.parse(Cookies.get('cart'));

        const newCookieItem = [];
        for (let cartitem of cartItems) {
            const sameProd = orderProd.filter((order) => (order.prodNo == cartitem.prodNo));
            if (sameProd?.length == 0) {
                newCookieItem.push(cartitem);
            };
        };
        console.log("newCookieItem", newCookieItem);
        Cookies.set('cart', JSON.stringify(newCookieItem));
    };


    getObjData(Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [], 'index');
    let orderData = {};

    const requestPay = () => {
        if (window.IMP) {
            console.log("연결중..");
            const { IMP } = window;
            IMP.init('imp05612074');

            orderData = {
                pg: 'html5_inicis',                           // PG사
                pay_method: 'card',                           // 결제수단 //가상계좌 vbank
                merchant_uid: new Date().getTime(),   // 주문번호
                amount: payPrice,
                // payPrice,                                 // 결제금액
                name: prodName,                             // 주문명
                buyer_name: userInfo.memberName,                // 구매자 이름
                buyer_tel: userInfo.phone,                     // 구매자 전화번호
                buyer_email: userInfo.email,               // 구매자 이메일
                buyer_addr: address + " " + addressDetail,          // 구매자 주소
                buyer_postcode: zipCode                    // 구매자 우편번호
            };
            console.log(orderData);
            /* 4. 결제 창 호출하기 */
            IMP.request_pay(orderData, callback);
        };


        function callback(response) {
            const {
                success,
                error_msg
            } = response;

            if (success) {
                alert('결제 성공');

                const insertData = {
                    memberNo: memberNo,
                    orderName: memberName,
                    receiver: receiverName,
                    receivePhone: phone1 + phone2 + phone3,
                    address: address,
                    addressDetail: addressDetail,
                    zipCode: zipCode,
                    couponNo: couponNo,
                    point: applyPoint,
                    message: delMsg,
                    totalPrice: totalPrice,
                    paymentPrice: payPrice,
                    totalCount: count,
                    index: getObjData(orderProd, 'index'),
                    prodNo: getObjData(orderProd, 'prodNo'),
                    count: getObjData(orderProd, 'count'),
                    price: getObjData(orderProd, 'price'),
                    gradeNo: gradeNo,

                };
                insertToDb(insertData);
                updateCookies();

                navi('/order/payment', {
                    state: {
                        payData: orderData, userInfo: userInfo, changeInfo: changeInfo, orderProd: orderProd,
                        totalPrice: totalPrice, paymentPrice: payPrice, message: delMsg, prodImgs: prodImgs,
                        discountProd: discountProd
                    }
                });
            } else {
                alert(`결제 실패 : ${error_msg}`);
            }
        };
    };

    // 결제하기 버튼 클릭시 
    const paymentReq = (data, e) => {

        if (receiverName &&
            phone1 && phone2 && phone3 &&
            address && addressDetail) {
            console.log(data);
            console.log(orderData);

            requestPay();

        } else {
            alert("배송정보가 모두 입력되지 않았습니다");
        };
    };


    return (
        <button onClick={paymentReq}>결제하기</button>
    );
}