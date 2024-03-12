import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { loadUserCouponAPI } from '../page/order/OrderAPI';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function AvailableCoupon({ show, closeModal, loginUser, userCoupon, sendCoupon }) {
    /* coupon Modal - */

    const navi = useNavigate();
    const [checkCoupon, setCheckCoupon] = useState();

    const checkCouponHadler = (couponNo) => {
        setCheckCoupon(couponNo);
    };

    const getUseCoupon = () => {
        sendCoupon(checkCoupon);
        closeModal(false);
    };

    return (
        <Modal show={show} className='coupon-modal'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title fs-5" id="staticBackdropLabel">사용가능한 쿠폰</h3>
                    </div>
                    <div className="modal-body">
                        <div>
                            {
                                JSON.stringify(userCoupon) === '{}' ?
                                    <div>사용가능한 쿠폰이 없습니다.</div> :
                                    (
                                        userCoupon?.filter(item => item.status === 'Y' || new Date(item.validityDate) < new Date()).map((item, index) => (
                                            <div key={index} className='coupon-no'>
                                                <div>
                                                    <input type='radio' name={"checkedCoupon"}
                                                        checked={checkCoupon === item.couponNo}
                                                        onChange={() => checkCouponHadler(item.couponNo)}
                                                        value={item.couponNo} />
                                                    <span>
                                                        {item.couponName}
                                                        <span className='coupon-no-between'>{" | "}</span>
                                                        {item.discount == 0 ? item.discountRate + "%" : item.discount + "원"}
                                                    </span>
                                                </div>
                                                <div className='coupon-validityDate'>
                                                    {"만료일 : " + item.validityDate}
                                                </div>
                                            </div>
                                        ))
                                    )
                            }
                        </div>
                    </div>
                    <div className="modal-footer coupon-modal-footer">
                        <Button type="button" className="btn btn-primary change-option-submit"
                            onClick={getUseCoupon}>적용</Button>
                        <Button type="button" className="btn btn-secondary change-option-cancel"
                            onClick={closeModal}>취소</Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}