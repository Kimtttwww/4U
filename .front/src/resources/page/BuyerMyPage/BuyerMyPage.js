import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import '../../css/buyerMyPage/UserInfo.css';
import '../../css/buyerMyPage/Activity.css';
import '../../css/buyerMyPage/ShoppingBasket.css';
import '../../css/buyerMyPage/Benefits.css';
import '../../css/buyerMyPage/Chat.css';

export default function BuyerMyPage() {

	const [modalOpened, setModalOpened] = useState(false);
	const [orders, setOrders] = useState([]);
	const [recentlyViewed, setRecentlyViewed] = useState([]);
	const [listQna, setListQna] = useState([]);

	// 세션 저장소에서 로그인 정보 가져오기
	const [loginMember, setLoginMember] = useState(Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null);


	useEffect(() => {
		// 구매내역 및 최근 본 상품 로드
		// loadOrders();
		loadRecentlyViewed();

	}, []);

	// 구매 내역 로드
	const loadOrders = () => {
		axios.get("http://localhost:3000/order/history")
		.then(response => setOrders(response.data))
		.catch(err => console.log(err));
	};

  async function getRecentProducts(recentProductIds) {
    try {
      const idString = recentProductIds.join(','); // 배열을 콤마로 구분된 문자열로 변환
      const response = await axios.get(`http://localhost:3000/product/recent?prodNo=${idString}`);
      
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('요청이 성공적으로 완료되지 않았습니다:', response);
      }
    } catch (error) {
      console.error('서버로부터 데이터를 가져오는 도중 오류가 발생했습니다:', error);
    }
    
    return null;
  }
  
  
// 최근 본 상품 로드
const loadRecentlyViewed = async () => {
  const viewedFromCookie = Cookies.get('recentProduct');
  
  if (viewedFromCookie) {
    const decodedCookieValue = decodeURIComponent(viewedFromCookie); // URL 디코딩
    const recentProductIds = JSON.parse(decodedCookieValue); // JSON 문자열을 객체로 파싱
    const recentProducts = await getRecentProducts(recentProductIds);
    setRecentlyViewed(recentProducts);
  }
};

const uniqueRecentlyViewed = recentlyViewed.reduce((acc, current) => {
  const isDuplicated = acc.find(product => product.prodNo === current.prodNo);
  if (!isDuplicated) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, []);

useEffect(() => {
  loadRecentlyViewed(); // 컴포넌트가 마운트될 때 최근 본 상품 로드
}, []);

useEffect(() => {
  fetchQnaList();
}, []);

	const fetchQnaList = async () => {
	try {
		const response = await axios.get(`/qna/listqna?memberNo=${loginMember.memberNo}`);
		setListQna(response.data);
	} catch (error) {
		console.error('Error fetching Q&A list:', error);
	}
	};
 
    return (
      <>
        <div className="buyerContainer">
            <div className="userInfo">
                <div className="userName">
                  <h2>{loginMember.memberId}</h2>
                </div>
                <div className="userRating">
                    <span>{loginMember.grade}</span>
                </div>
                <div className="userIntro">
                    <span>안녕하세요 {loginMember.memberName}님</span>
                </div>
                <div className="userUpdate">
                    <button onClick={() => setModalOpened(true)}>
                        정보 수정
                    </button>
                    {/* Modal을 사용할 때 show prop을 사용하여 Modal을 열고 닫습니다. */}
                    <Modal show={modalOpened} onHide={() => setModalOpened(false)} className='passwordModal'>
                        {/* Modal의 내용은 Modal.Body 내부에 위치시킵니다. */}
                            <h1>비밀번호 확인</h1>
                        <Modal.Body>
                            비밀번호 : <br/> <input type='password' placeholder='비밀번호를 입력하세요.'/>
                            <br/>
                            비밀번호 확인 : <br/> <input type='password' placeholder='비밀번호를 입력하세요.'/>
                        </Modal.Body>
                        {/* Modal 하단에 닫기 버튼을 추가합니다. */}
                        <Modal.Footer>
                            <Button>확인</Button>
                            <Button variant="secondary" onClick={() => setModalOpened(false)}>닫기</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>

            <div className="activity">
              <div className="leftContainer">
                  <div className="activityDetail">
                      <h2>나의 활동</h2>
                      <span>구매 내역</span>
                      <Link to="/order/history">
                          <button>이동</button>
                      </Link>
                  </div>
              </div>
              <div className="rightContainer">
                  {/* 최대 세 개의 구매 내역을 매핑하여 화면에 표시 */}
                  {orders.slice(0, 3).map((order) => (
                      <div className="activityItem" key={order.orderNo}>
                          <Link to={`/order/orderdetail/${order.orderNo}`}>
                              <div className="atem">
                                  <div className="atemImg">
                                      <img src={order.imgName} alt={order.imgName} />
                                  </div>
                                  <div className="atemIntro">
                                      <span>{order.prodName}</span>
                                  </div>
                              </div>
                          </Link>
                      </div>
                  ))}
              </div>
          </div>


            <div className="activity">
        <div className="leftContainer">
          <div className="activityDetail">
            <h2>나의 활동</h2>
            <span>최근 본 상품</span>
            {/* <span>데이터 : {JSON.stringify(recentlyViewed)}</span> */}
          </div>
        </div>
        <div className="rightContainer">
          {/* 최근 본 상품 목록을 화면에 표시 */}
          {uniqueRecentlyViewed.slice(0,3).map(product => (
            <div className="activityItem" key={product.prodNo}>
              <div className="atem">
                <div className="atemImg">
                  {/* 상품 이미지 */}
                  <img src={product.imgName} alt={product.prodName} />
                </div>
                <div className="atemIntro">
                  {/* 상품 이름 */}
                  <span>{product.prodName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        <div className="shoppingBasket">
      <h2>장바구니</h2>
      <Link to={"/cart/CartList/"}>
        <button className="bMv">장바구니 이동</button>  
      </Link>
    </div>

      <div className="benefits">
        <div className="rightContainer">
          <h2>회원 혜택</h2>
        </div>
        <div className="leftContainer">
          <div className="pointContainer">
            <div className="pointImg">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoJo0ob3QTQE50ix6fzNnvnc-Lg9xYlk7Dg&usqp=CAU"/>
            </div>
            <div className="pointInfo">
              <h3>포인트</h3>
              <span>{loginMember.point}p</span>
            </div>
          </div>

          <div className="couponContainer">
            <div className="couponImg">
              <img src="https://cdn-icons-png.flaticon.com/128/5370/5370348.png"/>
            </div>
            <div className="couponInfo">
              <h3>쿠폰</h3>
              <span>현재 가지고있는 쿠폰 개수 : 0</span>
            </div>
          </div>

        </div>
      </div>

      <div className="chat">
        <div className="leftContainer">
          <h2>고객 센터</h2>
        </div>
        <div className="rightContainer">
          <div className="proposal">
          <div className="chatImg">
              <img src="https://cdn-icons-png.flaticon.com/512/6369/6369389.png"/>
            </div>
            <div className="chatInfo">
              <h3>제품 건의</h3>
              <span>
                {listQna.length > 0 && listQna.reduce((latestDate, qna) => {
                  const qnaDate = new Date(qna.createDate);
                  const currentDate = new Date();
                  // 날짜의 시분초를 모두 0으로 설정합니다.
                  qnaDate.setHours(0, 0, 0, 0);
                  currentDate.setHours(0, 0, 0, 0);
                  // 날짜의 차이를 계산합니다.
                  const timeDiff = currentDate.getTime() - qnaDate.getTime();
                  // 일(day)로 변환합니다.
                  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                  // "n 일 전" 형식으로 반환합니다.
                  return diffDays > 0 ? `${diffDays}일 전` : '오늘';
                }, listQna[0].createDate)}
              </span>
              <Link to={"/qna/listqna/"}>건의 사항 보기</Link>
            </div>
          </div>
        </div>
      </div>

    </div>

    prodDetail
    </>
  );
}  
