import { Route, Routes } from "react-router-dom";
import BuyerMyPage from "./resources/page/BuyerMyPage/BuyerMyPage";
import MyEdit from "./resources/page/BuyerMyPage/myEdit";
import CartList from "./resources/page/BuyerMyPage/cart/CartList";
import Login from "./resources/modal/Login";
import Order from "./resources/page/order/Order";
import Payment from "./resources/page/order/Payment";
import Header from "./resources/components/Header";
import Footer from "./resources/components/Footer";
import ProdList from "./resources/page/product/ProdList";
import SignUp from "./resources/page/member/SignUp";
import UserUpdate from "./resources/page/BuyerMyPage/UserUpdate";
import { useState } from "react";
import OrderHt from "./resources/page/BuyerMyPage/orderHistory/OrderHt";
import Error from "./resources/components/Error";
import Mainpage from "./resources/page/common/Mainpage";
import SellerMyPage from "./resources/page/sellerMyPage/SellerMyPage";
import SellerOrderList from "./resources/page/sellerMyPage/SellerOrderList";
import SellerManagement from "./resources/page/sellerMyPage/SellerManagement";
import SellerReview from "./resources/page/sellerMyPage/SellerReview";
import ListQna from "./resources/page/qna/ListQna";
import CategorySearch from "./resources/modal/CategorySearch";
import BuyerCoupon from "./resources/page/BuyerMyPage/BuyerCoupon";
import SellerRegistration from "./resources/page/sellerMyPage/SellerRegistration";
import SellerStats from "./resources/page/sellerMyPage/SellerStats";
import Cookies from "js-cookie";


function App() {

   /** 로그인창 띄울떄 필요한 매개변수 */
   const [showLogin, setShowLogin] = useState(false);
   const [loginMember, setLoginMember] = useState(Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null);

   return (
      <div className="App">

         <Header setShowLogin={setShowLogin} login={loginMember} setLogin={setLoginMember} />

         <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<Mainpage />} />

            {/* 회원 관련 */}
            <Route path="/member">
               {/* 회원가입 페이지 */}
               <Route path="signUp" element={<SignUp />} />
               {/* ? */}
               <Route path="userupdate" element={<UserUpdate />} />

            </Route>

            {/* 제품 관련 */}
            <Route path="/product">
               {/* 제품 리스트 */}
               <Route path="list" element={<ProdList />} />
               <Route path="list/:mainNo" element={<ProdList />} />
               <Route path="list/:mainNo/:subNo" element={<ProdList />} />
            </Route>

            {/* ? */}
            <Route path="/order">
               {/* ? */}
               <Route path="" element={<Order loginUser={loginMember} />} />
               {/* ? */}
               <Route path="payment" element={<Payment />} />
               {/* ? */}
               <Route path="history" element={<OrderHt />} />
               {/* 카테고리 검색 */}
               <Route path="cateSearch" element={<CategorySearch />} />
            </Route>

            {/* 구매자 마이페이지 */}
            <Route path="/buyer/mypage" element={<BuyerMyPage />} exact />
            <Route path="/BuyerCoupon" element={<BuyerCoupon />} />

            {/* 구매자 마이페이지 정보수정 */}s
            <Route path="/buyer/mypage/myEdit" element = {<MyEdit />}/>

            {/* 장바구니 관련 */}
            <Route path="/cart/CartList/" element={<CartList />} />

            {/* 판매자 마이페이지 */}
            <Route path="/sellerMypage" element={<SellerMyPage />}>
               {/* 주문 확인 */}
               <Route path="list" element={<SellerOrderList />} />
               {/* 상품 관리 */}
               <Route path="management" element={<SellerManagement />} />
               {/* 상품 관리 탭 등록 하기 */}
               <Route path="management/registration" element={<SellerRegistration />} />
               {/* 리뷰 관리 */}
               <Route path="review" element={<SellerReview />} />
               {/* 통계 */}
               <Route path="stats" element={<SellerStats/>}/>
            </Route>

            {/* QNA */}
            <Route path="/qna">
               {/* ? */}
               <Route path="listqna" element={<ListQna />} />
            </Route>

            {/* 그 외의 페이지 */}
            <Route path="*" element={<Error />} />
         </Routes>

         {/* 로그인 페이지 */}
         <Login showLogin={showLogin} setShowLogin={setShowLogin} setLoginMember={setLoginMember} />

         <Footer />
      </div>
   );
}

export default App;
