import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/common/Rightbar.css";
import Cookies from "js-cookie";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import MemberInfoMin from "./MemberInfoMin";

/**
 * 화면 우측 고정, 상품 필터 검색창
 * @props props 
 * 	@param loginMember 로그인 된 사용자
 * 	@param setLoginMember 로그인 된 사용자's setter fn
 */
export default function Rightmenubar(props) {
	const {loginMember, setLoginMember} = props;
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [filterList, setFilterList] = useState(null);
	const [showMemberInfo, setShowMemberInfo] = useState(false);
	const navigate = useNavigate();
	// ===================================================
	const [cateMainList, setCateMainList] = useState([]);
	const [cateSubList, setCateSubList] = useState([]);
	const [seeThroughList, setSeeThroughList] = useState([]);
	const [thicknessList, setThicknessList] = useState([]);
	const [lineList, setLineList] = useState([]);
	const [sizeList, setSizeList] = useState([]);
	const [colorList, setColorList] = useState([]);


	useEffect(() => {
		axios.get("/product/category") // 컨트롤러 주소
		.then(response => {
			setFilterList(response.data);
		});
	}, []);

	// 대분류
	const checkCategoryMain = (mainName) => {
		if (cateMainList.includes(mainName)) {
			setCateMainList(cateMainList.filter(cateMain => cateMain !== mainName));
		} else {
			setCateMainList([...cateMainList, mainName]);
		}
	};

	// 소분류
	function checkCategorySub (subName) {
		if (cateSubList.includes(subName)) {
			setCateSubList(cateSubList.filter(cateSub => cateSub !== subName));
		} else {
			setCateSubList([...cateSubList, subName]);
		}
	}

	// 비침 정도
	const checkSeeThrough = (seeThrough) => {
		if (seeThroughList.includes(seeThrough)) {
			setSeeThroughList(seeThroughList.filter(seethr => seethr !== seeThrough));
		} else {
			setSeeThroughList([...seeThroughList, seeThrough]);
		}
	};

	// 라인
	const checkLine = (line) => {
		if (lineList.includes(line)) {
			setLineList(lineList.filter(li => li !== line));
		} else {
			setLineList([...lineList, line]);
		}
	};

	// 사이즈
	function checkSize(size) {
		if (sizeList.includes(size)) {
			setSizeList(sizeList.filter(si => si !== size));
		} else {
			setSizeList([...sizeList, size]);
		}
	}

	// 색상
	function checkColor(colorNo) {
		if (colorList.includes(colorNo)) {
			setColorList(colorList.filter(color => color !== colorNo));
		} else {
			setColorList([...colorList, colorNo]);
		}
	}

	// 필터요소 쿠키에 등록하고 페이지 이동
	const handleButtonClick = () => {
		let cateMain = [];
		let cateSub = [];

		cateMainList.forEach((mainName) => {
			cateMain.push(filterList.cateMain.find((main) => main.mainName == mainName))
		});
		cateMain = cateMain.map((main) => main.cateMain);

		cateSubList.forEach((subName) => {
			cateSub.push(filterList.cateSub.find((sub) => sub.subName == subName))
		});
		cateSub = cateSub.map((sub) => sub.cateSub);
		
		let prodFilter = {
			cateMain: cateMain?.length ? cateMain : null,
			cateSub: cateSub?.length ? cateSub : null,
			seeThrough: seeThroughList?.length ? seeThroughList : null,
			line: lineList?.length ? lineList : null,
			size: sizeList?.length ? sizeList : null,
			color: colorList?.length ? colorList : null
		};

		Cookies.set("prodFilter", JSON.stringify(prodFilter));
		setSidebarOpen(false);
		navigate("/product/list");
	};

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
		 	<span onClick={() => {setSidebarOpen(!isSidebarOpen); setShowMemberInfo(false);}}><img src="/photo/free-icon-magnifier-9794483.png" /></span>
			<span onClick={() => {setShowMemberInfo(!showMemberInfo); setSidebarOpen(false);}}><img src="/photo/free-icon-hearts-3508704.png" /></span>
			<span onClick={scrollToTop}><img src="/photo/free-icon-up-arrow-10180203.png" /></span>
			<span onClick={scrollToBottom}><img src="/photo/free-icon-down-arrow-10180214.png" /></span>
		</div>

		{isSidebarOpen && (
			<div className="sideBarContent-category">
				<div className="cateTitle">스타일</div>
				<div className="productContainer">
					{filterList.cateMain.map((filter) => (
						<span key={filter.mainName} onClick={() => checkCategoryMain(filter.mainName)}
							className={`cateSeeThrough ${cateMainList.includes(filter.mainName) ? 'active' : ''}`}>
							 {filter.mainName}
						</span>
					))}
				</div>

				<div className="cateTitle">타입</div>
				<div className="right-category-box">
					{filterList.cateSub.map((filter) => (
						<span key={filter.subName} onClick={() => checkCategorySub(filter.subName)}
							className={`cateSeeThrough ${cateSubList.includes(filter.subName) ? 'active' : ''}`}>
							 {filter.subName}
						</span>
					))}
				</div>

				<div className="cateTitle">비침</div>
				<div className="right-category-box">
					{filterList.seeThrough.map((seeThrough, i) => (
						<span key={i} onClick={() => checkSeeThrough(seeThrough)}
							className={`cateSeeThrough ${seeThroughList.includes(seeThrough) ? 'active' : ''}`}>
							{seeThrough}
						</span>
					))}
				</div>  

				<div className="cateTitle">라인</div>
				<div className="right-category-box">
					{filterList.lining.map((line, i) => (
						<span key={i} onClick={() => checkLine(line)}
							className={`cateSeeThrough ${lineList.includes(line) ? 'active' : ''}`}>
							{line}
						</span>
					))}
				</div>

				<div className="cateTitle">사이즈</div>
				<div className="right-category-box">
					{filterList.size.map((size, i) => (
						<span key={i} onClick={() => checkSize(size)}
							className={`cateSeeThrough ${sizeList.includes(size) ? 'active' : ''}`}>
							{size}
						</span>
					))}
				</div>

				<div className="cateTitle">색상</div>
				<div className="flexContainer">
					{filterList.color.map((color) => (
						<OverlayTrigger placement="top" delay={{hide: 400}} overlay={(props) => colorTooltip(props, color.colorName)}>
							<span key={colorList.colorNo} className="colorCircle" onClick={() => checkColor(color.colorNo)}
								style={{
									width: '25px',
									height: '25px',
									borderRadius: '50%',
									backgroundColor: color.rgb,
									border: `3px solid ${colorList.includes(color.colorNo) ? 'black' : 'white'}`,
									textDecoration: 'none',
									color: '#000'
							}}></span>
						</OverlayTrigger>
					))}
				</div>
				<br/>
				
	 			<button className="cateButton" onClick={handleButtonClick}>상품찾기</button>
			</div>
		)}

		{loginMember && showMemberInfo && <MemberInfoMin loginMember={loginMember} setLoginMember={setLoginMember} showMemberInfo={showMemberInfo} setShowMemberInfo={setShowMemberInfo} />}
	</>);
}
