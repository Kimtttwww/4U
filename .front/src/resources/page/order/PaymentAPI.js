import axios from "axios";
import { useEffect } from "react";

export default function PaymentAPI() {
    // const newWindow = window.open('', '_blank');

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


    const requestPay = () => {
        if (window.IMP) {
            console.log("연결중..");
            const { IMP } = window;
            IMP.init('imp05612074');

            const data = {
                pg: 'html5_inicis',                           // PG사
                pay_method: 'card',                           // 결제수단
                merchant_uid: `mid_${new Date().getTime()}`,  // 주문번호
                amount: 100,                                 // 결제금액
                name: '아임포트 결제 데이터 분석',                  // 주문명
                buyer_name: '홍길동',                           // 구매자 이름
                buyer_tel: '01012341234',                     // 구매자 전화번호
                buyer_email: 'example@example',               // 구매자 이메일
                buyer_addr: '신사동 661-16',                    // 구매자 주소
                buyer_postcode: '06018'                   // 구매자 우편번호
            };

            /* 4. 결제 창 호출하기 */
            IMP.request_pay(data, callback);
        }

        function callback(response) {
            const {
                success,
                merchant_uid,
                error_msg
            } = response;

            if (success) {
                alert('결제 성공');
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
            <button onClick={(e) => { paymentReq(e) }}>결제하기</button>
        </div >
    );
}