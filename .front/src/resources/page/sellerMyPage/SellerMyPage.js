import { Link, Outlet } from "react-router-dom";
import "../../css/sellerMyPage/SellerMyPage.css";
import { useState } from "react";

export default function SellerMyPage (){
    const [sideColor, setSideColor] = useState("/sellerMypage/list");

    const handleClick = (link) => {
        setSideColor(link);
    };

    return(
        <div className="SellerMyPage">
            <div className="seller-side-area">
                <h2>관리자 마이페이지</h2>
                {/* 앞에 아이콘은 넣을지 말지 정하삼 */}
                <Link to="/sellerMypage/list" onClick={() => handleClick("/sellerMypage/list")} className={sideColor === "/sellerMypage/list" ? "side-area-color" : ""}>주문 확인</Link>
                <Link to="/sellerMypage/management" onClick={() => handleClick("/sellerMypage/management")} className={sideColor === "/sellerMypage/management" ? "side-area-color" : ""}>상품 관리</Link>
                <Link to="/sellerMypage/review" onClick={() => handleClick("/sellerMypage/review")} className={sideColor === "/sellerMypage/review" ? "side-area-color" : ""}>리뷰 관리</Link>
                <Link to="/sellerMypage/qna" onClick={() => handleClick("/sellerMypage/qna")} className={sideColor === "/sellerMypage/qna" ? "side-area-color" : ""}>QNA 관리</Link>
                <Link to="/sellerMypage/meminfo" onClick={() => handleClick("/sellerMypage/meminfo")} className={sideColor === "/sellerMypage/meminfo" ? "side-area-color" : ""}>정보 관리</Link>
                <Link to="/sellerMypage/stats" onClick={() => handleClick("/sellerMypage/stats")} className={sideColor === "/sellerMypage/stats" ? "side-area-color" : ""}>주문 통계</Link>
            </div>
            <Outlet></Outlet>
        </div>
    )
}