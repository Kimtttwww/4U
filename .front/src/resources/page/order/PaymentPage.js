
export default function PaymentPage() {


    return (
        <div class="payment-container">
            <p>주문 완료</p>
            <p>주문과 결제가 정상적으로 완료되었습니다.</p>

            <div>
                <p>주문하신 상품</p>
                <span>주문번호 000000</span>

                <table class="">
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

                <div>
                    <p>배송정보</p>
                    <div>
                        <span>주문하시는 분</span>
                        <span>받으시는 분</span>
                        <span>배송지주소</span>
                        <span>연락처</span>
                    </div>
                    <div>
                        <span>홍길동</span>
                        <span>둘리</span>
                        <span>요리보고 조리봐도</span>
                        <span>010-2222-3333</span>
                    </div>
                    <button onclick="openModal()">배송지변경</button>
                </div>


                {/* <!-- Button trigger modal --> */}
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    onclick={openModal()}>
                    배송지변경
                </button>

                {/* <!-- Modal --> */}
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">배송지변경</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <span>수령자명</span>
                                    <span>배송지주소</span>
                                    <span>연락처</span>
                                </div>
                                <div>
                                    <input type="text" id="" name="" />
                                    <input type="text" id="" name="" />
                                    <input type="text" id="" name="" />
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <p>할인정보</p>
                        <div>
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
                                <div>
                                    <span>59,000원</span>
                                    <span>10000원 절약</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <p>결제정보</p>

                        </div>
                        <div>
                            <p>적립예정액</p>
                            <span>500포인트</span>
                        </div>

                    </div>
                </div>
            </div>
            <button>메인</button>
            <button>주문내역</button>
        </div>
    )
}