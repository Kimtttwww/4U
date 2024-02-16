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
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    // 구매내역 및 최근 본 상품 로드
    loadOrders();
    loadRecentlyViewed();
  }, []);

  // 구매 내역 로드
  const loadOrders = () => {
    axios.get("http://localhost:3000/order/history")
      .then(response => setOrders(response.data))
      .catch(err => console.log(err));
  };

  // 최근 본 상품 로드
  const loadRecentlyViewed = () => {
    const viewedFromCookie = Cookies.get('recentlyViewed');
    if (viewedFromCookie) {
      const recentlyViewedItems = JSON.parse(viewedFromCookie);
      setRecentlyViewed(recentlyViewedItems);
    }
  };

  // 장바구니에 상품 추가
  const addToCart = (item, ea) => {
    fetch('/addToCart', {
      method: 'POST',
      body: JSON.stringify({ item, ea }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));

    setCartItems([...cartItems, { id: cartItems.length + 1, name: item, image: '상품 이미지 URL' }]);
  };

  // 장바구니에서 상품 삭제
  const handleDeleteItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

    return (
      <>
        <div className="buyerContainer">
            <div className="userInfo">
                <div className="userName">
                    <h2>John doe</h2>
                </div>
                <div className="userRating">
                    <span>Bronze</span>
                </div>
                <div className="userIntro">
                    <span>안녕하세요 John doe입니다.</span>
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
          </div>
        </div>
        <div className="rightContainer">
          {/* 최근 본 상품 목록을 화면에 표시 */}
          {recentlyViewed.map(productId => (
            <div className="activityItem" key={productId}>
              {/* productId를 서버에 보내서 해당 상품 정보를 가져올 수 있음 */}
              {/* 가져온 상품 정보를 화면에 표시 */}
              <div className="atem">
                <div className="atemImg">
                  {/* 상품 이미지 */}
                  <img src={productId.imgName} alt={productId.imgName} />
                </div>
                <div className="atemIntro">
                  {/* 상품 이름 */}
                  <span>{productId.prodName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        <div className="shoppingBasket">
      <h2>장바구니</h2>
      <div className="bitems">
        {/* 장바구니에 추가된 상품 목록을 표시 */}
        {cartItems.map(item => (
          <div className="bitem" key={item.id}>
            <span>{item.name}</span>
            <img src={item.image} alt={item.name}/>
            <button onClick={() => handleDeleteItem(item.id)}>삭제</button>
          </div>
        ))}
      </div>
      {/* <button onClick={() => addToCart("추가할 상품 이름", 1)}>장바구니에 추가</button> */}
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
              <img src="logo.svg"/>
            </div>
            <div className="pointInfo">
              <h3>포인트</h3>
              <span>5000p</span>
            </div>
          </div>

          <div className="couponContainer">
            <div className="couponImg">
              <img src="logo.svg"/>
            </div>
            <div className="couponInfo">
              <h3>쿠폰</h3>
              <span>현재 가지고있는 쿠폰 개수 : 0</span>
            </div>
          </div>

          <div className="ratingContainer">
            <div className="ratingImg">
              <img src="logo.svg"/>
            </div>
            <div className="ratingInfo">
              <h3>회원등급</h3>
              <span>실버</span>
            </div>
          </div>

        </div>
      </div>

      <div className="chat">
        <div className="leftContainer">
          <h2>채팅 내역</h2>
        </div>
        <div className="rightContainer">
          <div className="customerService">
            <div className="chatImg">
              <img src="logo.svg"/>
            </div>
            <div className="chatInfo">
              <h3>고객센터와 채팅</h3>
              <span>어제</span>
              <a>대화 보기</a>
            </div>
          </div>
          <div className="proposal">
          <div className="chatImg">
              <img src="logo.svg"/>
            </div>
            <div className="chatInfo">
              <h3>제품 건의</h3>
              <span>2일 전</span>
              <a>건의 사항 보기</a>
            </div>
          </div>
        </div>
      </div>

    </div>
    </>
  );
}  
