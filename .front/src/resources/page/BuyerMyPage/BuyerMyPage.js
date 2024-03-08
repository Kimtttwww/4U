import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProdDetail from '../../modal/ProdDetail';

import '../../css/buyerMyPage/UserInfo.css';
import '../../css/buyerMyPage/Activity.css';
import '../../css/buyerMyPage/ShoppingBasket.css';
import '../../css/buyerMyPage/Benefits.css';
import '../../css/buyerMyPage/Chat.css';


export default function BuyerMyPage() {

  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState(false);
  const [orders, setOrders] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [listQna, setListQna] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [product, setProduct] = useState(null);
  const [member, setMember] = useState({});
  const navi = useNavigate();

	// 세션 저장소에서 로그인 정보 가져오기
	const [loginMember, setLoginMember] = useState(Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null);
  const [MemberInfo , setMemberInfo] = useState([]);
  const [couponInfo , setCouponInfo] = useState([]);


  const couponCount = couponInfo.filter(info => info.status === 'Y').length;

	useEffect(() => {
		loadRecentlyViewed();
    loadMemberInfo();
    loadUserCoupon();
    loadRecentlyViewed(); // 컴포넌트가 마운트될 때 최근 본 상품 로드
    fetchQnaList();
}, []);

  const loadMemberInfo = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/order/loadMemberInfo`, loginMember.memberNo, {    
        headers: {
        'Content-Type': 'application/json'
    }});
      setMemberInfo(response.data); // 서버로부터 받은 데이터
    } catch (error) {
      console.error('멤버 로드 오류:', error); // 오류 발생 시 콘솔에 오류 메시지 출력
    }
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

	// 구매 내역 로드
	const loadOrders = () => {
		axios.get("http://localhost:3000/order/history")
		.then(response => setOrders(response.data))
		.catch(err => console.log(err));
	};

  // 최근본 상품
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

const handleProductClick = product => {
  setProduct(product);  // 클릭한 상품으로 product 상태 업데이트
  setShowDetail(true);  // 모달창 띄우기
};

	const fetchQnaList = async () => {
	try {
		const response = await axios.get(`/qna/listqna?memberNo=${loginMember.memberNo}`);
		setListQna(response.data);
	} catch (error) {
		console.error('Error fetching Q&A list:', error);
	}
	};
 
  // 정보수정 비밀번호
  const [passwordCheck, setPasswordCheck] = useState("");
  const [PassWord , setPassWord] = useState("");

  function changeMember(e) {
    if(member) {
        setMember({...member, [e.target.name]: e.target.value});
        // 키밸류 형태
    }
    console.log(member);
}


  const handlePasswordCheck = async () => {

    setMember({...member});

    const loginMember = Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null;
    
    let Memberinfo = {
      "memberId" : loginMember.memberId, // 로그인된 멤버의 멤버 아이디를 가져옴
      "memberPwd" : member.memberPwd // 내가 친 패스워드를 가져옴
    }

    console.log(MemberInfo.memberPwd);
    console.log(MemberInfo.memberId);
    
    try {
      const response = await axios.post('/member/login', Memberinfo)
      setPassWord(response.data);
      console.log(response.data);
      if(response.data) {
        alert('비밀번호 일치');
        navigate('/buyer/mypage/myEdit');
      } else {
        alert('비밀번호 불일치');
        navigate('/buyer/mypage')
      }
    } catch (error) { 
      console.error('멤버 로드 오류:', error); // 오류 발생 시 콘솔에 오류 메시지 출력
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
                    <span>
                    {MemberInfo.gradeNo === 1 && (<span className='bronze'>브론즈</span>)}
                    {MemberInfo.gradeNo === 2 && (<span className='silver'>실버</span>)}
                    {MemberInfo.gradeNo === 3 && (<span className='gold'>골드</span>)}
                    {MemberInfo.gradeNo === 4 && (<span className='diamond'>다이아</span>)}
                    {MemberInfo.gradeNo === 5 && (<span className='vip'>VIP</span>)}
                    </span>
                </div>
                <div className="userIntro">
                    <span>안녕하세요 {loginMember.memberName}님</span>
                </div>
                <div className="userUpdate">
                    <button onClick={() => setModalOpened(true)}>
                        정보 수정
                    </button>
                    
                    <Modal show={modalOpened} onHide={() => setModalOpened(false)} className='passwordModal'>
                        
                            <h1>비밀번호 확인</h1>
                        <Modal.Body>
                        <input type="password" id="disabledTextInput" className="form-control" name = "memberPwd"  onChange={changeMember}
         style={{ width: '250px' }}/>
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <Button onClick ={handlePasswordCheck}>확인</Button>
                            <Button variant="secondary" onClick={() => setModalOpened(false)}>닫기</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>

            <div className="activity">
              <div className="activityLeftContainer">
                  <div className="activityDetail">
                      <h2>나의 활동</h2>
                      <span>구매 내역</span>
                      <Link to="/order/history">
                      <button style={{width: 150}}>이동</button>
                      </Link>
                  </div>
              </div>
          </div>


            <div className="activity">
        <div className="activityLeftContainer">
          <div className="activityDetail">
            <h2>나의 활동</h2>
            <span>최근 본 상품</span>
            {/* <span>데이터 : {JSON.stringify(recentlyViewed)}</span> */}
          </div>
        </div>
        <div className="activityRightContainer">
          {/* 최근 본 상품 목록을 화면에 표시 */}
          {uniqueRecentlyViewed?.length && uniqueRecentlyViewed.map(product => (
            <div className="activityItem" key={product.prodNo} onClick={() => handleProductClick(product)}>
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
        <div className="benefitsRightContainer">
          <h2>회원 혜택</h2>
        </div>
        <div className="benefitsLeftContainer">
          <div className="pointContainer">
            <div className="pointImg">
              <img src="/photo/point-img.png"/>
            </div>
            <div className="pointInfo">
              <h3>포인트</h3>
              <span>{MemberInfo.point}p</span>
            </div>
          </div>

          <div className="couponContainer" onClick={() => (navi('/BuyerCoupon'))}>
            <div className="couponImg">
              <img src="https://cdn-icons-png.flaticon.com/128/5370/5370348.png"/>
            </div>
            <div className="couponInfo">
              <h3>쿠폰</h3>
              <span>보유 쿠폰 개수 : {couponCount}</span>
            </div>
          </div>

          <div className="gradeContainer">
            <div className="gradeImg">
            {MemberInfo.gradeNo === 1 && (<img src="/photo/grade-bronze.png"/>)}
            {MemberInfo.gradeNo === 2 && (<img src="/photo/grade-silver.png"/>)}
            {MemberInfo.gradeNo === 3 && (<img src="/photo/grade-gold.png"/>)}
            {MemberInfo.gradeNo === 4 && (<img src="/photo/grade-diamond.png"/>)}
            {MemberInfo.gradeNo === 5 && (<img src="/photo/grade-master.png"/>)}
            </div>
            <div className="gradeInfo">
              <h3>등급</h3>
                {MemberInfo.gradeNo === 1 && (<span className='bronze'>브론즈</span>)}
                {MemberInfo.gradeNo === 2 && (<span className='silver'>실버</span>)}
                {MemberInfo.gradeNo === 3 && (<span className='gold'>골드</span>)}
                {MemberInfo.gradeNo === 4 && (<span className='diamond'>다이아</span>)}
                {MemberInfo.gradeNo === 5 && (<span className='vip'>VIP</span>)}
            </div>
          </div>

        </div>
      </div>

      <div className="chat">
        <div className="chatLeftContainer">
          <h2>고객 센터</h2>
        </div>
        <div className="chatRightContainer">
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

     {/* ProdDetail 컴포넌트에 필요한 props 전달 */}
     {showDetail && <ProdDetail showDetail={showDetail} setShowDetail={setShowDetail} product={product} />}

    </>
  );
}  
