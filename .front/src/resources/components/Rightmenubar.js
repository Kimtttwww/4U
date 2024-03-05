import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/common/Rightbar.css";
import Cookies from "js-cookie";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Rightmenubar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [cateSub, setCateSub] = useState("");
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
//===================================================
  const [selectedSeeThrough, setSelectedSeeThrough] = useState([]);
  const [selectedThickness, setSelectedThickness] = useState([]);
  const [selectedLine, setSelectedLine] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedColorNos, setSelectedColorNos] = useState([]);

 
//===================================================
	useEffect(() => {
		axios.get("/product/category") // 컨트롤러 주소
		.then(response => {setProduct(response.data)
			console.log(response.data);}
			)
	}, []);

	const handleToggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

//===================================================

	const handleClickSeeThrough = (value) => {
		if (selectedSeeThrough.includes(value)) {
			setSelectedSeeThrough(selectedSeeThrough.filter(item => item !== value));
		} else {
			setSelectedSeeThrough([...selectedSeeThrough, value]);
		}

		console.log(selectedSeeThrough)
	};

	const handleClickCategory = (category) => {
		if (selectedCategory.includes(category)) {
			setSelectedCategory(selectedCategory.filter(item => item !== category));
		} else {
			setSelectedCategory([...selectedCategory, category]);
		}
	};


  // 버튼 눌렀을때 ProdList.js로 넘어가야함
  // const handleButtonClick = () => {
  //   console.log("About to navigate");
  //   navigate("/product/list", { 
  //     state: { 
  //       selectedSeeThrough: selectedSeeThrough,
  //       selectedCategory: selectedCategory
  //     }
  //   });
  //   console.log("Navigation request sent");
  // };
	const handleButtonClick = () => {
		console.log("1");
		let cateMain = [];
		test = [selectedCategory, product.cateMain]

		selectedCategory.forEach((mainName) => {
			cateMain.push(product.cateMain.find((category) => category.mainName == mainName))
		});
		cateMain = cateMain.map((category) => category.cateMain);
			
		let selectedItems = {
			seeThrough: selectedSeeThrough,
			cateMain,
			color: selectedColorNos
		};
		Cookies.set("selectedItems", JSON.stringify(selectedItems));
		navigate("/product/list");
	};
	
	const handleClickLine = (value) => {
		if (selectedLine.includes(value)) {
			setSelectedLine(selectedLine.filter(item => item !== value));
		} else {
			setSelectedLine([...selectedLine, value]);
		}
	};

  //==============================================

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const scrollToBottom = () => {
		window.scrollTo({
			top: document.documentElement.scrollHeight,
			behavior: "smooth",
		});
	};

  	// 나중
	const handleClick = () => {
		axios.get("/product/category")
		.then(response => setProduct(response.data))
	};

	/**
	 * 해당 색상에 커서 올리면 색상명 보여주는 fn
	 * (OverlayTrigger에서 호출됨)
	 * @param {*} props Tooltip 스타일 매개변수(자동추가)
	 * @param {string} colorName 해당 색상의 이름
	 * @returns Tooltip 요소
	 */
	function colorTooltip(props, colorName) {
		return(<Tooltip id="button-tooltip" {...props}>{colorName}</Tooltip>);
	}

  	return (<>
		<div className={`rightBar ${isSidebarOpen ? "open" : ""}`}>
		 	<Link onClick={handleToggleSidebar}><i>&#128269;</i></Link>
			<Link><i>&#x1F604;</i></Link>
			<Link onClick={scrollToTop}><i>&#x2B06;</i></Link>
			<Link onClick={scrollToBottom}><i>&#x2B07;</i></Link>
		</div>

		{isSidebarOpen && (
			<div className="sideBarContent">
				<div className="cateTitle">옷 분류</div>
				<div className="productContainer">
					{product.cateMain.map((product) => (
						<a key={product.mainName} onClick={() => handleClickCategory(product.mainName)}
							className={`cateSeeThrough ${selectedCategory.includes(product.mainName) ? 'active' : ''}`}>
							{product.cateMain} {product.mainName}
						</a>
					))}
				</div>

				<div className="cateTitle">비침</div>
				<div>
					{product.seeThrough.map((seeThrough) => (
						<a onClick={() => handleClickSeeThrough(seeThrough)}
						className={`cateSeeThrough ${selectedSeeThrough.includes(seeThrough) ? 'active' : ''}`}>
							{seeThrough}
						</a>
					))}
				</div>  

				<div className="cateTitle">색상</div>
				<div className="flexContainer">
					{product.color.map((color) => (
						<OverlayTrigger placement="top" delay={{hide: 400}} overlay={(props) => colorTooltip(props, color.colorName)}>
							<span
								key={color.colorNo}
								href={"#" + color.colorNo}
								style={{
								width: '25px',
								height: '25px',
								borderRadius: '50%',
								backgroundColor: color.rgb,
								border: `3px solid ${selectedColorNos.includes(color.colorNo) ? 'white' : 'black'}`,
								textDecoration: 'none',
								color: '#000'
								}}
								className="colorCircle"
								onClick={(e) => {
								e.preventDefault();
								if (selectedColorNos.includes(color.colorNo)) {
									setSelectedColorNos(selectedColorNos.filter(no => no !== color.colorNo));
								} else {
									setSelectedColorNos([...selectedColorNos, color.colorNo]);
								}
								}}
							></span>
						</OverlayTrigger>
					))}
				</div>
				<br/>
				<br/>
	 			<button className="cateButton" type ="submit" onClick={handleButtonClick}>상품찾기</button>
			</div>
		)}
	</>);
}
