import { useEffect, useState } from "react";
import "../../css/product/ProdList.css";
import ProdDetail from "../../modal/ProdDetail";
import axios from "axios";
import { loadMainProdAPI, loadSubProdAPI } from "./CateAPI";
import { mainCateListAPI, subCateListAPI } from "../common/LeftbarAPI";
import { useParams } from "react-router";
import Leftmenubar from "../../components/Leftmenubar";
import { Link } from "react-router-dom";


/**
 * 상품 리스트 페이지
 */
export default function ProdList() {

	const { mainNo, subNo } = useParams();
	const [prodList, setProdList] = useState([]);
	const [showDetail, setShowDetail] = useState(false);
	const [product, setProduct] = useState();
	const [prodBycateMain, setProdBycateMain] = useState([]);
	const [prodBycateSub, setProdBycateSub] = useState([]);
	const [prodBycate, setProdBycate] = useState([]);
	const [mainList, setMainList] = useState([]);
	const [subList, setSubList] = useState([]);
	const [mainName, setMainName] = useState();
	const [checkedSub, setCheckedSub] = useState(subNo);
	console.log("Prodlist > mainNo : " + mainNo + ", subNo : " + subNo);


	// DB에서 CATE_MAIN 가져오기
	const loadMainDb = async () => {
		const mainCate = await mainCateListAPI();
		setMainList(mainCate);
	};

	// DB에서 mainCate No에 대한 상품들 가져오기
	const getMainCateNo = async () => {
		const response = await loadMainProdAPI(mainNo);
		setProdBycateMain([...response]);
	};

	// DB에서 cateMain에 해당하는 CATE_SUB 가져오기
	const loadSubDb = async () => {
		// if (subNo == undefined) {
		const subCate = await subCateListAPI(mainNo);
		setSubList([...subCate]);
		// };
	};

	// DB에서 mainNo-subNo에 대한 상품들 가져오기
	const getProdSubNo = async () => {
		if (subNo !== undefined) {
			const data = {
				cateMain: mainNo,
				cateSub: subNo
			};
			const response = await loadSubProdAPI(data);
			setProdBycateSub([...response]);
		};
	};

	// cateMain No에 해당하는 cateSub가져오기
	const subCateHTML = () => {
		// console.log("subCateHTML() 들어옴?");
		if (mainNo > 0 && subList?.length > 0) {
			const objArr = subList?.filter((sub) => (sub.cateMain == mainNo));
			// console.log("subList ?", subList);
			return objArr;
		}
		return null;
	};

	// subCate 선택시 스타일부여
	const subCateHovered = (subNo) => {
		setCheckedSub(subNo);
	};

	useEffect(() => {
		console.log("checkedSub ??", checkedSub);
	}, [checkedSub])

	useEffect(() => {
		getMainCateNo();
		loadMainDb();
		// 상품 리스트 불러오기
		axios.get("/product/list")
		.then((result) => {
			setProdList(result.data);
		}).catch((error) => {
			console.log(error);
			alert("상품을 불러오는 중 문제가 발생했습니다");
		});
	}, []);

	useEffect(() => {
		if (subNo > 0 && subNo !== undefined) {
			getProdSubNo();
		};
		setCheckedSub(subNo);
	}, [subNo]);

	useEffect(() => {
		loadSubDb();
		if (subNo == undefined) {
			getMainCateNo();
			setProdBycateSub(null);
		};
		const nameBymainNo = mainList?.find(item => item.cateMain == mainNo);
		if (nameBymainNo) {
			setMainName(nameBymainNo.mainName);
		};
	}, [mainNo, mainList]);



	/**
	 * 상세페이지에 필요한 값 세팅
	 * @param {number} prodNo
	 */
	function gotoProdDetail(prodNo) {
		setProduct(prodList.find((prod) => prod?.prodNo === prodNo));
		setShowDetail(true);
	}

	/**
	 * 상품별 색상 종류 표시
	 * @returns 사진 중 중복 색상을 제거한 후 남은 단일한 색상을 반환
	 */
	function colorList(prod) {
		let arr: Set<number> = new Set(prod.detail.map((dtl) => dtl.colorNo));
		let imgList = [];

		for (let i = 0; i < prod.image.length; i++) {
			let img = prod.image[i];
			if (arr.has(img.colorNo)) {
				imgList.push(img);
				arr.delete(img.colorNo);
			}
			if (!arr.size) break;
		}

		return (
			imgList.map((img) => {
				let { imgNo, refNo, rgb } = img;
				return (<span onMouseEnter={(e) => changeImageToColor(e, refNo)} onMouseLeave={(e) => rollbackImage(e, refNo)}
					style={{ backgroundColor: rgb, color: rgb }}>{imgNo}</span>);
			})
		);
	}

	/**
	 * 색깔에 커서 올리면 해당 색깔의 상품 이미지가 나오게 하는 fn
	 * @param {SyntheticBaseEvent} e 이벤트 객체
	 * @param {number} prodNo 해당 상품 번호
	*/
	function changeImageToColor(e, prodNo) {
		const imgNo = Number(e.target.innerHTML);
		const prod = prodList.find((p) => p.prodNo === prodNo);

		e.target.parentElement.parentElement.previousSibling.src = prod.image.find((img) => img.imgNo === imgNo).imgName;
	}

	/**
	 * 바뀌었던 이미지를 다시 원래 썸넬로 되돌리는 fn
	 * @param {SyntheticBaseEvent} e 이벤트 객체
	 * @param {number} prodNo 해당 상품 번호
	 */
	function rollbackImage(e, prodNo) {
		const prod = prodList.find((p) => p.prodNo === prodNo);

		e.target.parentElement.parentElement.previousSibling.src = prod.image.find((img) => img.imgType === 1)?.imgName;
	}

	/**
	 * 숫자형 가격 값을 ','가 포함된 문자형 값으로 변환해주는 fn
	 * @param {number} num 숫자형 가격 값
	 * @returns {string} ','가 포함된 문자형 숫자 값
	 */
	function priceConverter(num) {
		let str = num.toString()
		let numArr = []
		for (let i = 0; i < Math.ceil(str.length / 3); i++) {
			numArr.push(str?.charAt(str.length - 3 - i * 3) + str?.charAt(str.length - 2 - i * 3) + str?.charAt(str.length - 1 - i * 3))
		}
		return numArr.reverse().toString();
	}

	/**
	 * 할인 유무에 따른 가격 포맷 적용 fn
	 * @param {number} product 해당 물품
	 * @returns {React.JSX.Element} 할인 유무를 적용하고 ,도 적용한 가격을 표현하는 태그들
	*/
	function checkDiscount(product) {
		let element;

		if (product.discountRate) {
			let saledPrice = product.price * (100 - product.discountRate) / 100;
			element = (<>
				<span>\{priceConverter(saledPrice)}</span>
				<span>\{priceConverter(product.price)}</span>
			</>);
		} else { element = (<span>\{priceConverter(product.price)}</span>); }

		return element;
	}





	// console.log("subNo ??", subNo, "subNo ??", subNo);
	console.log(checkedSub)
	return (
		<>
			<h1 className="mainCateName">{mainName}</h1>
			<h5 className="subCateName">
				{
					subCateHTML()?.map((sub, index) => (
						<div className="subListEle" key={index}>
							<Link to={`/product/list/${mainNo}/${sub.cateSub}`}
								onClick={() => subCateHovered(sub.cateSub)}
								defaultChecked={checkedSub}
								style={{
									color: checkedSub === sub.cateSub ? 'blue' : 'black',
									fontWeight: checkedSub === sub.cateSub ? 'bold' : '200',
									fontSize: checkedSub === sub.cateSub ? '20px' : '15px'
								}}
							>
								{sub.subName}
							</Link>
						</div>
					))
				}
			</h5 >
			<div className="ProdList">
				<div className="menu-side-area">
					<Leftmenubar checkedSub={checkedSub} />
				</div>
				<div className="products">
					{
						prodBycateSub && prodBycateSub?.length > 0 ? prodBycateSub.map((prod) => {
							return (
								<>
									<section key={prod.prodNo} className="product"
										onClick={() => gotoProdDetail(prod.prodNo)}
									>
										<img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
										<article>
											<div className="prod-name">{prod.prodName}</div>
											<div className="prod-amount">
												{checkDiscount(prod)}
											</div>
											<div className="prod-color">
												{prod.image?.length && colorList(prod)}
											</div>
										</article>
									</section>
								</>
							)
						}) :
							prodBycateMain?.length ? prodBycateMain.map((prod) => {
								return (
									<>
										<section key={prod.prodNo} className="product"
											onClick={() => gotoProdDetail(prod.prodNo)}
										>
											<img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
											<article>
												<div className="prod-name">{prod.prodName}</div>
												<div className="prod-amount">
													{checkDiscount(prod)}
												</div>
												<div className="prod-color">
													{prod.image?.length && colorList(prod)}
												</div>
											</article>
										</section>
									</>
								);
							})
								:
								prodList?.length ? prodList.map((prod) => {
									return (
										<>
											<section key={prod.prodNo} className="product" onClick={() => gotoProdDetail(prod.prodNo)}>
												{/* 썸넬 사진을 찾아서 보여주기 */}
												<img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
												<article>
													{/* 이름이 가격 위에 있는게 좋을거같아서 올렸는데 맘에 안들면 내려 */}
													{/* 그리고 이름이 박스 사이즈 넘어가는 길이면 "페이크 레더 스탠드 카라 지퍼 바이커 자켓..." 으로 보이게 바꿨음 */}
													<div className="prod-name">{prod.prodName}</div>
													{/* 할인이 없는 상품은 price만 나와야 하고, 할인이 있는 상품은 price, discountRate 두개가 나와야함 */}
													{/* 가격에 3자리수 마다 "," 찍어주는거 해야함 */}
													<div className="prod-amount">

														{checkDiscount(prod)}
													</div>
													<div className="prod-color">
														{prod.image?.length && colorList(prod)}
													</div>
												</article>
											</section>
										</>
									);
								})
									:
									<div>선택한 상품이 없습니다</div>
					}
				</div>
			</div>

			{product && <ProdDetail showDetail={showDetail} setShowDetail={setShowDetail} product={product} priceConverter={priceConverter} checkDiscount={checkDiscount} />}
		</>
	);
}