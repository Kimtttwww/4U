import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/common/Rightbar.css";

export default function Rightmenubar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`rightBar ${isSidebarOpen ? 'open' : ''}`}>
      <button onClick={handleToggleSidebar}>
    <div className="">
              <img className="categoryImg" src="./photo/CategoryImg.png" alt="Category" />
    </div>    
    <div className="">
              <img className="categoryImg" src="./photo/couponImg.png" alt="Coupon" />
    </div>
      </button>
      {isSidebarOpen && (
        <>
          <div className="sideBarContent">
            원하시는 카테고리를 선택해주세요.
          </div>
        </>
      )}

    </div>
  );
}