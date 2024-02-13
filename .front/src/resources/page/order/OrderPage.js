import { useState } from "react";
import ChangeOption from "../../modal/ChangeOption";
import '../../css/OrderPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
// import ReactModal from "react-modal";

export default function OrderPage() {

    const [isOptionChange, setisOptionChange] = useState(false);
    const openModal = () => setisOptionChange(true);
    const closeModal = () => setisOptionChange(false);


    return (

        <div className="order-container">
            <p className="order-write">주문서 작성</p>
            <span className="order-prod-title">주문상품(총수량)</span>
            <table className="order-prod-table">
                <thead>
                    <tr>
                        <td>이미지</td>
                        <td>상품명</td>
                        <td>옵션</td>
                        <td>상품금액</td>
                        <td>주문금액</td>
                        <td>수량</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>[이미지]</td>
                        <td>샤랄라 원피스</td>
                        <td>L/블랙
                            {/* <!-- Button trigger modal --> */}
                            <Button className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop" onClick={openModal}>
                                옵션변경
                            </Button>

                            <ChangeOption isOpen={isOptionChange} closeModal={closeModal} />
                        </td>
                        <td>39000</td>
                        <td>29000</td>
                        <td>1</td>
                        <td><button>삭제</button></td>
                    </tr>
                </tbody>
            </table>
            <span className="totalPrice">총 주문금액 99,900원</span>


            <span className="order-delivery-title">배송정보</span>
            <div className="delivery-info">
                <div className="ordererInfo">
                    <input type="checkbox" id="" name="ordererInfo" />
                    <span>주문자정보 불러오기</span>
                </div>
                <div className="order-delivery-content">
                    <div className="receiver-text">
                        <span className="margin">수령자명</span>
                        <span className="margin">연락처</span>
                        <span className="margin">배송지주소</span>
                        <span className="memo">배송메모</span>
                    </div>
                    <div className="receiver-input">
                        <input type="text" id="" name="receiverName" style={{ width: "100px" }} className="margin" />
                        <div className="margin">
                            <select>
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="019">019</option>
                            </select>-
                            <input type="number" id="" name="miPhone" style={{ width: "60px" }} />-
                            <input type="number" id="" name="laPhone" style={{ width: "60px" }} />
                        </div>
                        <div className="margin">
                            <div>
                                <input type="number" id="" name="zipCode1" style={{ width: "50px" }} />-
                                <input type="number" id="" name="zipCode2" style={{ width: "50px" }} />
                                <button>우편번호 찾기</button>
                            </div>
                            <div>
                                <input type="text" id="" name="address" />
                                <input type="text" id="" name="addressDetail" />
                            </div>
                        </div>
                        <input type="text" id="" name="message" className="margin" />
                    </div>
                </div>
            </div>

            <span className="order-paymentInfo-title">결제정보</span>
            <div className="paymnet-area">
                <div className="payment-left">
                    <div className="order-paymentInfo-content">
                        <div className="payment-info">
                            <div>
                                <div>결제예정금액</div>
                                <div>쿠폰할인</div>
                                <div>포인트할인</div>
                                <div>사용가능한 포인트</div>
                            </div>
                            <div className="payment-discount">
                                <div>99,900원</div>
                                <div>
                                    <span>0원</span>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop" >
                                        사용가능한 쿠폰보기
                                    </button>
                                </div>
                                <span>0원</span>
                                <div>
                                    <span>0원</span>
                                    <span>전체사용하기</span>
                                    <input type="checkbox" />
                                </div>
                            </div>
                        </div>
                        <div className="payPrice">
                            <span>결제하실 금액</span>
                            <span>99,000원</span>
                            <span>900원 절약</span>
                        </div>
                    </div>

                    <span className="order-payment-title">결제하기</span>
                    <div className="payment-method">
                        <button>카드결제</button>
                        <button>무통장입금</button>
                        <button>페이결제</button>
                    </div>
                </div>


                <div className="payment-right">
                    <p>최종 결제금액</p>
                    <div className="payment-right-content">
                        <div>
                            <div>상품금액</div>
                            <div>할인금액</div>
                            <div>(총 900원 할인)</div>
                        </div>
                        <div>
                            <div>99,900원</div>
                            <div>900원</div>
                            <div>90,000원</div>
                        </div>
                    </div>
                    <div className="payBtn">
                        <button>결제하기</button>
                    </div>
                </div>
            </div>
        </div>







    )
}