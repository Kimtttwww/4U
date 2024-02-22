import "../../css/sellerMyPage/SellerReview.css";

export default function SellerReview (){

    return(
        <div className="SellerReview">
            <div>
                <h2>리뷰 관리 (알림)</h2>
            </div>
            <article>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>내용</th>
                            <th>날짜</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3</td>
                            <td>[000012-찢어진 양말]에 리뷰가 달렸습니다.</td>
                            <td>24-01-28 16:15</td>
                            <td>삭제</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>[(상품번호)-(상품명)]에 리뷰가 달렸습니다.</td>
                            <td>24-01-28 16:15</td>
                            <td>삭제</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>[000019-구멍난 양말]에 리뷰가 달렸습니다.</td>
                            <td>24-01-28 16:15</td>
                            <td>삭제</td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </div>
    )
}