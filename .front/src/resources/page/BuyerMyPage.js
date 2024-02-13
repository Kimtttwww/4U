import '../css/userInfo.css';
import '../css/activity.css';
import '../css/shoppingBasket.css'
import '../css/benefits.css'
import '../css/chat.css'

export default function buyerMyPage() {
  return (
    <div className="container">

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
          <button>정보 수정</button>
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
          <div className="activityItem">
            <div className="atem">
              <div className="atemImg">
                <img src="./logo.svg"/>
              </div>
              <div className="atemIntro">
                <span>상품명</span>
              </div>
            </div>
          </div>
          <div className="activityItem">
            <div className="atem">
              <div className="atemImg">
                <img src="./logo.svg"/>
              </div>
              <div className="atemIntro">
                <span>상품명</span>
              </div>
            </div>
          </div>
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
          <div className="activityItem">
            <div className="atem">
              <div className="atemImg">
                <img src="./logo.svg"/>
              </div>
              <div className="atemIntro">
                <span>상품명</span>
              </div>
            </div>
          </div>
          <div className="activityItem">
            <div className="atem">
              <div className="atemImg">
                <img src="./logo.svg"/>
              </div>
              <div className="atemIntro">
                <span>상품명</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shoppingBasket">
        <h2>장바구니</h2>
        <div className="bitems">
        <div className="bitem">
          <span>상품 1</span>
          <img src="logo.svg"/>
          <button>삭제</button>
        </div>
        <div className="bitem">
          <span>상품 2</span>
          <img src="logo.svg"/>
          <button>삭제</button>
        </div>
        <div className="bitem">
          <span>상품 3</span>
          <img src="logo.svg"/>
          <button>삭제</button>
        </div>
      </div>
      <div className="btotal">
        <span>총 가격: $100</span>
      </div>
      <button>결제하기</button>
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
  );
}

