import { useState } from 'react';
import '../../css/buyerMyPage/BuyerCoupon.css';


export default function BuyerCoupon() {
    const [userType, setUserType] = useState('O');

    const handleSwitchToUseCoupon = () => {
        setUserType('O');
    };

    const handleSwitchToUsedCoupon = () => {
        setUserType('X');
    };


    return (
        <div className="BuyerCoupon">
            <div className='coupon-title'>
                <h3>쿠폰</h3>
            </div>
            <div className='BuyerCoupon-1'>
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/128/5370/5370348.png" />
                </div>
                <h4>사용가능쿠폰 1</h4>
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
                                    <tr>
                                        <td>[가입축하쿠폰]5,000원 이상 구입시 사용가능 쿠폰</td>
                                        <td>2,000원</td>
                                        <td>/</td>
                                        <td>2022.02.07 ~ 2022.02.13</td>
                                        <td>전체상품 적용</td>
                                    </tr>
                                    <tr>
                                        <td>[누적금액10만원달성쿠폰]최대 10만원 한도 사용가능 쿠폰</td>
                                        <td>/</td>
                                        <td>10%</td>
                                        <td>2022.02.01 ~ 2022.02.30</td>
                                        <td>전체상품 적용</td>
                                    </tr>
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
                                    <tr>
                                        <td>[엄청 좋은 쿠폰] 사용 안해서 찢어졌다.</td>
                                        <td>20,000,000원</td>
                                        <td>/</td>
                                        <td>2020.01.01 ~ 2021.01.01</td>
                                        <td>전체상품 적용</td>
                                    </tr>
                                    <tr>
                                        <td>[전에거보다 더 좋은 쿠폰]바코드가 손상돼서 사용할수 없다.</td>
                                        <td>/</td>
                                        <td>99%</td>
                                        <td>2020.01.02 ~ 2021.02.02</td>
                                        <td>전체상품 적용</td>
                                    </tr>
                                </tbody>
                            </table>
                        </article>
                    )}
                </div>
            </div>
        </div>
    )
}