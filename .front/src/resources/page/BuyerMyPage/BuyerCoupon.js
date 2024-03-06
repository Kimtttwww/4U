import { useState , useEffect } from 'react';
import '../../css/buyerMyPage/BuyerCoupon.css';
import axios from 'axios';
import Cookies from 'js-cookie';


export default function BuyerCoupon() {

    const [loginMember, setLoginMember] = useState(Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null);
    const [couponInfo , setCouponInfo] = useState([]);
    const [userType, setUserType] = useState('O');


    const handleSwitchToUseCoupon = () => {
        setUserType('O');
    };

    const handleSwitchToUsedCoupon = () => {
        setUserType('X');
    };

    const loadUserCoupon = async () => {
        try {
          const response = await axios.post(`http://localhost:3000/order/loadUserCoupon`, loginMember.memberNo , {
            headers: {
              'Content-Type' : 'application/json'
            }});
            setCouponInfo(response.data);
        } catch (error) {
            console.error('쿠폰 로드 오류', error)
        }
    };

    useEffect(() => {
        loadUserCoupon();
    }, []);
    
    const couponCount = couponInfo.filter(info => info.status === 'Y').length;

    return (
        <div className="BuyerCoupon">
            <div className='coupon-title'>
                <h3>쿠폰</h3>
            </div>
            <div className='BuyerCoupon-1'>
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/128/5370/5370348.png" />
                </div>
                <h4>사용가능쿠폰 {couponCount}</h4>
            </div>
            <div>
                <h3>쿠폰 내역</h3>
            </div>
            <div className='BuyerCoupon-2'>
                <div>
                    <button type="button" className='use-btn' onClick={handleSwitchToUseCoupon} >사용가능 쿠폰</button>
                    <button type="button" className='used-btn' onClick={handleSwitchToUsedCoupon} >사용완료 쿠폰</button>
                </div>
                <div>
                    {userType === 'O' && (
                        <article className='useCoupon'>
                            <table>
                                <thead>

                                        <tr>
                                            <th>쿠폰명</th>
                                            <th>할인금액</th>
                                            <th>할인율</th>
                                            <th>사용기간</th>
                                            <th>적용대상</th>
                                        </tr>
                                </thead>
                                <tbody>
                                {couponInfo.map((coupon, index) => 
                                    coupon.status === 'Y' && (
                                        <tr key={index}>
                                        <td>{coupon.couponName}</td>
                                        <td>{coupon.discount}</td>
                                        <td>{coupon.discountRate}%</td>
                                        <td>{coupon.validityDate}</td>
                                        <td>전체상품 적용</td>
                                        </tr>
                                    )
                                )}
                                </tbody>
                            </table>
                        </article>
                    )}
                    {userType === 'X' && (
                        <article className='usedCoupon'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>쿠폰명</th>
                                        <th>할인금액</th>
                                        <th>할인율</th>
                                        <th>사용기간</th>
                                        <th>적용대상</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {couponInfo.map((coupon, index) => {
                                    const validityDate = new Date(coupon.validityDate);
                                    const currentDate = new Date();

                                    return coupon.status === 'N' && validityDate >= currentDate && (
                                        <tr key={index}>
                                        <td>{coupon.couponName}</td>
                                        <td>{coupon.discount}</td>
                                        <td>{coupon.discountRate}%</td>
                                        <td>{coupon.validityDate}</td>
                                        <td>전체상품 적용</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </article>
                    )}
                </div>
            </div>
        </div>
    )
}