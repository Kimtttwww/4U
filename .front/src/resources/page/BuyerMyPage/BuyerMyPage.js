import '../../css/buyerMyPage/UserInfo.css';
import '../../css/buyerMyPage/Activity.css';
import '../../css/buyerMyPage/ShoppingBasket.css';
import '../../css/buyerMyPage/Benefits.css';
import '../../css/buyerMyPage/Chat.css';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function BuyerMyPage() {

  // 비밀번호 확인 모달
    const [modalOpened, setModalOpened] = useState(false);

    // 장바구니
    const [cartItems, setCartItems] = useState([
      { id: 1, name: '[울50%] (기획특가♥/하객룩/데일리룩) 비비안 부클 트위드 세미크롭 자켓', price: 20, image: 'https://atimg.sonyunara.com/files/attrangs/goods/151838/63edff01bdbda.jpg' },
      { id: 2, name: '[울50%] (기획특가♥/하객룩/데일리룩) 비비안 부클 트위드 세미크롭 자켓', price: 30, image: 'https://atimg.sonyunara.com/files/attrangs/goods/151838/63edff01bdbda.jpg' },
      { id: 3, name: '[울50%] (기획특가♥/하객룩/데일리룩) 비비안 부클 트위드 세미크롭 자켓', price: 50, image: 'https://atimg.sonyunara.com/files/attrangs/goods/151838/63edff01bdbda.jpg' }
    ]);

    const handleDeleteItem = (id) => {
      const updatedCartItems = cartItems.filter(item => item.id !== id);
      setCartItems(updatedCartItems);
    };

    // 구매내역
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
      axios
      .get( "http://localhost:3000/order/history")
      .then(
          (response) =>{
              console.log(response)
              setOrders(response.data); //채팅방 목록페이지 조회
          }
      )
      .catch((err)=>console.log(err))
  }, [])
  
    // 최근 본 상품

    const [recentlyViewed, setRecentlyViewed] = useState([]);

    useEffect(() => {
        // 쿠키에서 최근 본 상품 정보를 읽어옴
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('recentlyViewed='))
            ?.split('=')[1];

        if (cookieValue) {
            const productIds = cookieValue.split(',');
            // productIds를 서버에 보내서 최근 본 상품 정보를 가져올 수 있음
            // 가져온 상품 정보를 recentlyViewed 상태에 설정
            setRecentlyViewed(productIds);
        }
    }, []);




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
          {/* 각 구매 내역을 매핑하여 화면에 표시 */}
          {orders.map((order) => (
          <div className="activityItem" key={order.orderNo}>
            <Link to={`/order/orderdetail/${order.orderNo}`}>
                <div className="atem">
                    <div className="atemImg">
                        <img src={order.image} alt={order.productName} />
                    </div>
                    <div className="atemIntro">
                        <span>{order.orderName}</span>
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
                    <button>이동</button>
                </div>
            </div>
            <div className="rightContainer">
                {/* 최근 본 상품 목록을 화면에 표시 */}
                {recentlyViewed.map(productId => (
                    <div className="activityItem" key={productId}>
                        {/* productId를 서버에 보내서 해당 상품 정보를 가져올 수 있음 */}
                        {/* 가져온 상품 정보를 화면에 표시 */}
                    </div>
                ))}
            </div>
        </div>

      <div className="shoppingBasket">
      <h2>장바구니</h2>
      <div className="bitems">
        {cartItems.map(item => (
          <div className="bitem" key={item.id}>
            <span>{item.name}</span>
            <img src={item.image} alt={item.name}/>
            <button onClick={() => handleDeleteItem(item.id)}>삭제</button>
          </div>
        ))}
      </div>
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

