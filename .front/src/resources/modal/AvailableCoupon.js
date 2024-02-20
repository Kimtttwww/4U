import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { loadUserCouponAPI } from '../page/order/OrderAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function AvailableCoupon({ show, closeCoupon, loginUser, userCoupon }) {
    /* coupon Modal - */

    const navi = useNavigate();
    const [applyCoupon, setApplyCoupon] = useState();


    const checkCouponHadler = (couponNo) => {
        setApplyCoupon(couponNo);
    }


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
                                JSON.stringify(userCoupon) === '{}' ?
                                    (
                                        ""
                                    ) : (
                                        userCoupon?.map((item, index) => (
                                            <div  >
                                                <input type='radio' key={index} name={"checkedCoupon"}
                                                    checked={applyCoupon === item.couponNo}
                                                    onChange={() => checkCouponHadler(item.couponNo)}
                                                    value={item.couponNo} />
                                                <span>
                                                    {item.couponName + " | "}
                                                    {item.discount == 0 ? item.discountRate + "%" : item.discount + "원"}
                                                    {"만료일 : " + item.validityDate}
                                                </span>
                                            </div>
                                        ))
                                    )
                            }
                        </div>

                    </div>
                    <div class="modal-footer">
                        <Button type="button" class="btn btn-primary" variant="info">사용하기</Button>
                        <Button type="button" class="btn btn-secondary" variant="info"
                            onClick={closeCoupon}>취소</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}