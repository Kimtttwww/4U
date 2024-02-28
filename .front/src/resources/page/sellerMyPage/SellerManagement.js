import { Link } from "react-router-dom";
import "../../css/sellerMyPage/SellerManagement.css";

export default function SellerManagement() {



    return (
        <div className="SellerManagement">
            <div>
                <h2>전체 상품관리</h2>
            </div>
            <div className="seller-search">
                <div>
                    <input type="text" className="seller-search-input" placeholder="상품을 검색하세요." />
                    <button type="submit">검색</button>
                </div>
                <Link to={"/sellerMypage/management/registration"}>
                    <button>상품 등록</button>  
                </Link>
            </div>
            <article>
                <table>
                    <thead>
                        <tr>
                            <th>대분류</th>
                            <th>소분류</th>
                            <th>상품 등록일</th>
                            <th>상품명</th>
                            <th>정상가</th>
                            <th>할인가</th>
                            <th>총 주문 수량</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>24-01-03 21:45</td>
                            <td>껌붙은 청바지</td>
                            <td>126,000</td>
                            <td>90,000</td>
                            <td>23</td>
                            <td>Y</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2</td>
                            <td>24-01-03 20:55</td>
                            <td>뜯겨진 패딩</td>
                            <td>50,000</td>
                            <td>x</td>
                            <td>5</td>
                            <td>Y</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>3</td>
                            <td>24-01-03 19:12</td>
                            <td>찢어진 티셔츠</td>
                            <td>65,200</td>
                            <td>51,000</td>
                            <td>26</td>
                            <td>N</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>4</td>
                            <td>24-01-03 14:01</td>
                            <td>구멍난 양말</td>
                            <td>3,000</td>
                            <td>x</td>
                            <td>25</td>
                            <td>Y</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>4</td>
                            <td>24-01-03 13:55</td>
                            <td>찢어진 양말</td>
                            <td>3,000</td>
                            <td>x</td>
                            <td>2</td>
                            <td>Y</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>4</td>
                            <td>24-01-03 13:41</td>
                            <td>얼룩진 티셔츠</td>
                            <td>3,000</td>
                            <td>x</td>
                            <td>4</td>
                            <td>Y</td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </div>
    )
}