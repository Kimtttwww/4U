import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/common/Rightbar.css";

export default function Rightmenubar() {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const handleToggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: "smooth"
		});
	};

  return (
	<div className={`rightBar ${isSidebarOpen ? 'open' : ''}`} onClick={handleToggleSidebar}>
			<Link to="" onClick={openCateModal}>
				<i>&#128269;</i>
			</Link>
			<Link to="">
				<i>&#x1F604;</i>
			</Link>
			<Link to="" onClick={scrollToTop}>
				<i>&#x2B06;</i>
			</Link>
			<Link to="" onClick={scrollToBottom}>
				<i>&#x2B07;</i>
			</Link>
	  {isSidebarOpen && (
		<>
		  <div className="sideBarContent">원하시는 카테고리를 선택해주세요.</div>
		</>
	  )}

	</div>
  );
}
