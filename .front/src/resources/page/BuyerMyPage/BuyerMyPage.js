import '../../css/userInfo.css';
import '../../css/activity.css';
import '../../css/shoppingBasket.css';
import '../../css/benefits.css';
import '../../css/chat.css';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    const purchaseHistory = [
      { id: 1, productName: '데이린 하트넥 퍼프 골지 긴팔 티셔츠', image: 'https://atimg.sonyunara.com/files/attrangs/goods/62515/63d223cd55470.jpg' },
      { id: 2, productName: '데이린 하트넥 퍼프 골지 긴팔 티셔츠', image: 'https://atimg.sonyunara.com/files/attrangs/goods/62515/63d223cd55470.jpg' },
      { id: 3, productName: '데이린 하트넥 퍼프 골지 긴팔 티셔츠', image: 'https://atimg.sonyunara.com/files/attrangs/goods/62515/63d223cd55470.jpg' }
    ];
  
    // 최근 본 상품

      // 최근 본 상품 목록을 저장하는 상태
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // 상품을 최근 본 상품 목록에 추가하는 함수
  const addToRecentlyViewed = (product) => {
    // 최근 본 상품 목록에 중복된 상품이 있는지 확인
    if (!recentlyViewed.some((item) => item.id === product.id)) {
      // 중복되지 않은 상품이라면 최근 본 상품 목록에 추가
      setRecentlyViewed([...recentlyViewed, product]);
    }
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
            <button>이동</button>
          </div>
        </div>
        <div className="rightContainer">
          {/* 각 구매 내역을 매핑하여 화면에 표시 */}
          {purchaseHistory.map((item) => (
            <div className="activityItem" key={item.id}>
              <div className="atem">
                <div className="atemImg">
                  <img src={item.image} alt={item.productName} />
                </div>
                <div className="atemIntro">
                  <span>{item.productName}</span>
                </div>
              </div>
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
        {recentlyViewed.map((product) => (
          <div className="activityItem" key={product.id}>
            <div className="atem">
              <div className="atemImg">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="atemIntro">
                <span>{product.name}</span>
              </div>
            </div>
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
        <button>장바구니 이동</button>  
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

