import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import "../../css/order/PaymentPage.css"

export default function Payment() {

    const location = useLocation();
    const orderProd = location.state.orderProd;
    const totalPrice = location.state.totalPrice;
    const paymentPrice = location.state.paymentPrice;
    const message = location.state.message;
    const prodImgs = location.state.prodImgs;

    const { buyer_name, buyer_addr, merchant_uid } = location.state.payData;
    const { memberNo, memberName, phone, gradeNo, pointRate } = location.state.userInfo;
    const { receiverName, address, phone1, phone2, phone3 } = location.state.changeInfo;;
    const changePhone = phone1 + "-" + phone2 + "-" + phone3;
    const receiverPhone = changePhone != null ? changePhone : phone


    // const getPointRate = async () => {
    //     const response = await selectPointRateAPI(memberNo);
    //     location.state.userInfo.pointRate = response;
    // };
    const accumulate = paymentPrice * (pointRate / 100);

    // useEffect(() => {
    //     getPointRate();
    // }, []);

    useEffect(() => {
        console.log(accumulate);
    }, [accumulate]);


    return (
        <div className="payment-container">
            <p className="payment-complate">주문 완료</p>
            <p className="payment-complate-msg">주문과 결제가 정상적으로 완료되었습니다.</p>

            <div className="payment-complate-prod">
                <div className="payment-prod-title">
                    <p>주문하신 상품</p>
                    <span>주문번호 {merchant_uid}</span>
                </div>

                <table className="payment-prod-table">
                    <thead>
                        <tr>
                            <td style={{ width: "10%" }}>이미지</td>
                            <td style={{ width: "40%" }}>상품명</td>
                            <td style={{ width: "20%" }}>옵션</td>
                            <td style={{ width: "10%" }}>상품금액</td>
                            <td style={{ width: "10%" }}>수량</td>
                            <td style={{ width: "10%" }}>주문금액</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderProd?.map((item, index) => (
                                <tr key={index}>
                                    <img className="orderProdImg"
                                        src={prodImgs.filter((img) => item.prodNo == img.refNo)[1].imgName} />
                                    <td>{item.prodName}</td>
                                    <td>{item.colorName}/{item.size}</td>
                                    <td>{(item.price).toLocaleString()}원</td>
                                    <td>{item.count}</td>
                                    <td>{(item.price * item.count).toLocaleString()}원</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <p className="payment-delivery-title">배송정보</p>
                <div className="payment-delivery-area">
                    <div className="payment-delivery-text">
                        <span>주문하시는 분</span>
                        <span>받으시는 분</span>
                        <span>연락처</span>
                        <span>배송지주소</span>
                        <span>배송메모</span>
                    </div>
                    <div className="payment-delivery-receiver">
                        <span>{buyer_name}</span>
                        <span>{receiverName}</span>
                        <span>{receiverPhone}</span>
                        <span>{buyer_addr}</span>
                        <span>{message}</span>
                    </div>
                    {/* 배송주소 변경 버튼 없앰? */}
                    {/* <Button type="button" style={{ height: '30px', display: 'flex' }}
                        onClick={openModal}>배송정보 변경</Button> */}
                    {/* <ChangeAddress show={changeAddress} closeModal={closeModal} /> */}
                </div>

                <div className="payment-discount-area">
                    <div>
                        <p className="payment-content-title">할인정보</p>
                        <div className="payment-discount-content1">
                            <div>
                                <span>총 상품금액</span>
                                <span>{totalPrice.toLocaleString()}원</span>
                            </div>
                            <div>
                                <span>할인혜택</span>
                                <span>{(totalPrice - paymentPrice).toLocaleString()}원</span>
                            </div>
                            <div>
                                <span>최종 결제금액</span>
                                <span>{paymentPrice.toLocaleString()}원</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="payment-content-title">결제정보</p>
                        <div className="payment-discount-content2">
                            <div>
                                <div>적립예정액</div>
                                <div>{accumulate > 0 ? accumulate.toLocaleString() : "로딩중.."}원</div>
                            </div>
                            <ul>
                                <li>주문/결제페이지에 안내된 적립예정액과 실제 지급적립액은 다를 수 있습니다.</li>
                                <li>적립예정액은 배송완료 이후 자동으로 부여되며, 반품할 경우 차감됩니다</li>
                                <li>적립예정액은 최종 결제금액에 따라 계산됩니다(단, 쿠폰, 포인트 사용금액 제외)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="payment-bottom-divbtn">
                <Link to={'/'} className="payment-bottom-btn1">메인</Link>
                <Link to={'/order/history'} className="payment-bottom-btn2">주문내역</Link>
            </div>
        </div>
    )

}