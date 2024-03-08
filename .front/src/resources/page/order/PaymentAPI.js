import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { insertOrderAPI } from "./OrderAPI";
import Cookies from "js-cookie";

export default function PaymentAPI({ userInfo, dataByPayment, changeInfo, orderProd, prodImgs }) {

    const navi = useNavigate();
    const { memberNo, memberName, email, phone, zipCode, gradeNo, pointRate } = userInfo;
    const { receiverName, phone1, phone2, phone3, address, addressDetail } = changeInfo;
    const { applyCoupon, applyPoint, delMsg, discountPrice, totalPrice } = dataByPayment;


    useEffect(() => {
        const script1 = document.createElement("script");
        script1.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        document.head.appendChild(script1);

        const script2 = document.createElement("script");
        script2.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
        document.head.appendChild(script2);

        // OrderNo Setting
        // setOrderNo(getOrderNo());

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
    const buyerName = receiverName == "" ? memberName : receiverName;
    const buyerTel = (phone1 || phone2 || phone3) ? phone1 + phone2 + phone3 : phone;
    const addr = (changeInfo.address == "") ? address : changeInfo.address;
    const addrDetail = (changeInfo.addressDetail == "") ? addressDetail : changeInfo.addressDetail;
    const zip = (changeInfo.zipCode == "") ? zipCode : changeInfo.zipCode;
    const couponNo = Object.keys(applyCoupon).length > 0 ? applyCoupon.couponNo : 0;
    const payPrice = totalPrice - discountPrice - applyPoint;


    const insertToDb = async (insertData) => {
        return await insertOrderAPI(insertData);
    };

    // const getOrderNo = async () => {
    //     return await selectOrderNoAPI();
    // };

    const getObjData = (arr, key) => {
        let responseArr = [];
        arr?.forEach((item) => {
            if (item[key] != null) {
                responseArr.push(item[key]);
            };
        });
        return responseArr;
    };

    getObjData(Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [], 'index');
    // console.log(`${new Date().getFullYear()}${(new Date().getMonth() + 1 < 10 ? '0' : '')}${new Date().getMonth() + 1}${(new Date().getDate() < 10 ? '0' : '')}${new Date().getDate()}`);
    // `${new Date().getFullYear()}${(new Date().getMonth() + 1 < 10 ? '0' : '')}${new Date().getMonth() + 1}${(new Date().getDate() < 10 ? '0' : '')}${new Date().getDate()}` 
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
                amount: 100,
                // payPrice,                                 // 결제금액
                name: prodName,                             // 주문명
                buyer_name: userInfo.memberName,                // 구매자 이름
                buyer_tel: buyerTel,                     // 구매자 전화번호
                buyer_email: userInfo.email,               // 구매자 이메일
                buyer_addr: addr + " " + addrDetail,          // 구매자 주소
                buyer_postcode: zip                    // 구매자 우편번호
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
                // 
                const insertData = {
                    memberNo: memberNo,
                    orderName: memberName,
                    receiver: buyerName,
                    receivePhone: buyerTel,
                    address: addr,
                    addressDetail: addrDetail,
                    zipCode: zip,
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
                console.log("orderData ?", orderData);
                console.log("insertData ?", insertData);
                Cookies.remove("cart");
                navi('/order/payment', {
                    state: {
                        payData: orderData, userInfo: userInfo, changeInfo: changeInfo, orderProd: orderProd,
                        totalPrice: totalPrice, paymentPrice: payPrice, message: delMsg, prodImgs: prodImgs
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
            address &&
            addrDetail) {
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