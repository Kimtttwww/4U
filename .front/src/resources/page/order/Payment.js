import { useState } from "react"
import PaymentPage from "../../css/PaymentPage.css";
import ChangeAddress from "../../modal/ChangeAddress";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Payment() {

    const [address, setAddress] = useState(false);
    const openModal = () => setAddress(true);
    const closeModal = () => setAddress(false);

    return (
        <div className="payment-container">
            <p className="payment-complate">주문 완료</p>
            <p className="payment-complate-msg">주문과 결제가 정상적으로 완료되었습니다.</p>

            <div className="payment-complate-prod">
                <div className="payment-prod-title">
                    <p>주문하신 상품</p>
                    <span>주문번호 000000</span>
                </div>

                <table className="payment-prod-table">
                    <thead>
                        <tr>
                            <td>이미지</td>
                            <td>상품명</td>
                            <td>옵션</td>
                            <td>수량</td>
                            <td>상품금액</td>
                            <td>주문금액</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>[이미지]</td>
                            <td>샤랄라 원피스</td>
                            <td>L/블랙
                            </td>
                            <td>39000</td>
                            <td>29000</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>

                <p className="payment-delivery-title">배송정보</p>
                <div className="payment-delivery-area">
                    <div className="payment-delivery-text">
                        <span>주문하시는 분</span>
                        <span>받으시는 분</span>
                        <span>배송지주소</span>
                        <span>연락처</span>
                    </div>
                    <div className="payment-delivery-receiver">
                        <span>홍길동</span>
                        <span>둘리</span>
                        <span>요리보고 조리봐도</span>
                        <span>010-2222-3333</span>
                    </div>
                    <Button type="button" style={{ height: '30px', display: 'flex' }}
                        onClick={openModal}>배송정보 변경</Button>
                    <ChangeAddress show={address} closeModal={closeModal} />
                </div>

                <div className="payment-discount-area">
                    <div>
                        <p className="payment-content-title">할인정보</p>
                        <div className="payment-discount-content1">
                            <div>
                                <span>총 상품금액</span>
                                <span>69,000원</span>
                            </div>
                            <div>
                                <span>할인혜택</span>
                                <span>10,000원</span>
                            </div>
                            <div>
                                <span>최종 결제금액</span>
                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <span>59,000원</span>
                                    <span>10000원 절약</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <p className="payment-content-title">결제정보</p>

                        </div>
                        <div className="payment-discount-content2">
                            <span>적립예정액</span>
                            <span>500포인트</span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="payment-bottom-divbtn">
                <Link to={'/'} className="payment-bottom-btn1">메인</Link>
                <Link to={'/'} className="payment-bottom-btn2">주문내역</Link>
            </div>
        </div>
    )
}