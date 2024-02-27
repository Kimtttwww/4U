import "../../css/sellerMyPage/SellerOrderList.css";

export default function SellerOrderList (){

    

    return (
            <div className="SellerOrderList">
                <div>
                    <h2>최근 주문 내역</h2>
                </div>
                <article>
                    <table>
                        <thead>
                            <tr>
                                <th>주문번호</th>
                                <th>주문일</th>
                                <th>상품명</th>
                                <th>옵션</th>
                                <th>주문수량</th>
                                <th>구매자명</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>000006</td>
                                <td>24-01-03 21:45</td>
                                <td>껌붙은 청바지</td>
                                <td>레드/L</td>
                                <td>1</td>
                                <td>장현진</td>
                            </tr>
                            <tr>
                                <td>000005</td>
                                <td>24-01-03 20:55</td>
                                <td>뜯겨진 패딩</td>
                                <td>와인/M</td>
                                <td>1</td>
                                <td>강민구</td>
                            </tr>
                            <tr>
                                <td>000004</td>
                                <td>24-01-03 19:12</td>
                                <td>찢어진 티셔츠</td>
                                <td>블랙/M</td>
                                <td>3</td>
                                <td>김태완</td>
                            </tr>
                            <tr>
                                <td>000003</td>
                                <td>24-01-03 14:01</td>
                                <td>구멍난 양말</td>
                                <td>화이트/L</td>
                                <td>2</td>
                                <td>송다연</td>
                            </tr>
                            <tr>
                                <td>000002</td>
                                <td>24-01-03 13:55</td>
                                <td>찢어진 양말</td>
                                <td>화이트/M</td>
                                <td>1</td>
                                <td>송다연</td>
                            </tr>
                            <tr>
                                <td>000001</td>
                                <td>24-01-03 13:41</td>
                                <td>구멍난 양말</td>
                                <td>블랙/L</td>
                                <td>5</td>
                                <td>김태완</td>
                            </tr>
                            <tr>
                                <td colSpan={5}></td>
                            </tr>
                            <tr className="order-total">
                                <td>주문 총 수량</td>
                                <td colSpan={2}>7개</td>
                                <td>주문 총 금액</td>
                                <td colSpan={2}>\262,000</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </div>
    )
}