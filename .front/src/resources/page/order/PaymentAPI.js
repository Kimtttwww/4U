import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PaymentAPI({ sendPayment, point }) {
    // const newWindow = window.open('', '_blank');

    const navi = useNavigate();

    // console.log(sendPayment.memberName);
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

    let orderData = {};
    const requestPay = () => {
        if (window.IMP) {
            console.log("연결중..");
            const { IMP } = window;
            IMP.init('imp05612074');

            orderData = {
                pg: 'html5_inicis',                           // PG사
                pay_method: 'card',                           // 결제수단 //가상계좌 vbank
                merchant_uid: `${new Date().getFullYear()}${(new Date().getMonth() + 1 < 10 ? '0' : '')}${new Date().getMonth() + 1}${(new Date().getDate() < 10 ? '0' : '')}${new Date().getDate()}`,  // 주문번호
                amount: point,                                 // 결제금액
                name: '샤랄라 원피스 외 1 ',                  // 주문명
                buyer_name: sendPayment.memberName,                           // 구매자 이름
                buyer_tel: sendPayment.phone,                     // 구매자 전화번호
                buyer_email: sendPayment.email,               // 구매자 이메일
                buyer_addr: sendPayment.address,                    // 구매자 주소
                buyer_postcode: sendPayment.zipCode                   // 구매자 우편번호
            };

            /* 4. 결제 창 호출하기 */
            IMP.request_pay(orderData, callback);
        }

        function callback(response) {
            const {
                success,
                merchant_uid,
                error_msg
            } = response;

            if (success) {
                alert('결제 성공');
                // navi("/order/payment");
                navi('/order/payment', { state: { orderData } });

            } else {
                alert(`결제 실패: ${error_msg}`);
            }
        };
    };

    // 결제하기 버튼 클릭시 
    const paymentReq = (e) => {

        e.preventDefault();
        // if (!receiverName || !address || !addressDetail) {
        //     alert("배송정보가 모두 입력되지 않았습니다.");
        //     return;
        // }

        // const newWindew = window.open(
        //     "",
        //     "_blank",
        //     "width=500, height=500"
        // );

        requestPay();

    }



    return (
        <div>
            <button onClick={paymentReq}>결제하기</button>
        </div >
    );
}