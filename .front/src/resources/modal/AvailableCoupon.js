export default function AvailableCoupon() {
    /* coupon Modal - */




    return (
        <div class="modal fade" id="couponModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title fs-5" id="staticBackdropLabel">사용가능한 쿠폰</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            쿠폰번호 12345 |
                            5천원 할인쿠폰 |
                            만료기간 2024-05-23
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">저장</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        >취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}