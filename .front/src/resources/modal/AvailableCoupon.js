import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { loadUserCouponAPI } from '../page/order/OrderAPI';
import { useEffect, useState } from 'react';

export default function AvailableCoupon({ show, closeCoupon, loginUser }) {
    /* coupon Modal - */



    return (
        <Modal show={show} >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title fs-5" id="staticBackdropLabel">사용가능한 쿠폰</h3>
                    </div>
                    <div class="modal-body">
                        <div>
                            {
                                // userCoupon?.map((item, index) => (
                                //     <div>
                                //         <input type='checkbox' id="" name='' />
                                //         <span>{item.couponName}</span>
                                //     </div>
                                // ));
                            }
                            {/* 쿠폰번호 12345 |
                            5천원 할인쿠폰 |
                            만료기간 2024-05-23 */}
                        </div>

                    </div>
                    <div class="modal-footer">
                        <Button type="button" class="btn btn-primary" variant="info">저장</Button>
                        <Button type="button" class="btn btn-secondary" variant="info"
                            onClick={closeCoupon}>취소</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}