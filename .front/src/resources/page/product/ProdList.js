import { useEffect, useState } from "react";
import "../../css/product/ProdList.css";
import ProdDetail from "../../modal/ProdDetail";
import axios from "axios";
import { mainCateListAPI, subCateListAPI } from "../common/LeftbarAPI";
import { useParams } from "react-router";
import Leftmenubar from "../../components/Leftmenubar";
import { Link } from "react-router-dom";
import qs from 'qs';
import Cookies from "js-cookie";
import { checkDiscount, priceConverter } from "../common/ProdDetailAPI";


/**
 * 상품 리스트 페이지
 */
export default function ProdList() {

	const { mainNo, subNo } = useParams();
	const [prodList, setProdList] = useState([]);
	const [showDetail, setShowDetail] = useState(false);
	const [product, setProduct] = useState();
	const [mainList, setMainList] = useState([]);
	const [subList, setSubList] = useState([]);
	const [checkedSub, setCheckedSub] = useState(subNo);
	console.log("Prodlist > mainNo : " + mainNo + ", subNo : " + subNo);

	
	// useEffect(() => {
	// 	console.log("checkedSub ??", checkedSub);
	// }, [checkedSub])

	useEffect(() => {loadMainDb()}, []);

	useEffect(() => {
		const nameBymainNo = mainList?.find(item => item.cateMain == mainNo);
		setCheckedSub(subNo);
		loadSubDb();
		getProduct();
	}, [mainNo, subNo, mainList]);

	// DB에서 CATE_MAIN 가져오기
	const loadMainDb = async () => {
		setMainList(await mainCateListAPI());
	};

	// DB에서 cateMain에 해당하는 CATE_SUB 가져오기
	const loadSubDb = async () => {
		if(mainNo) {
			setSubList([...await subCateListAPI(mainNo)]);
		}
	};

	// DB에서 mainNo-subNo에 대한 상품들 가져오기
	const getProduct =  () => {
		let subUrl = [];
		if(mainNo) subUrl.push("cateMain=" + mainNo);
		if(subNo) subUrl.push("cateSub=" + subNo);
		
		let url = "/product/list";
		for (let i = 0; i < subUrl.length; i++) {
			switch (i) {
				case 0: url += "?" + subUrl[i]; break;
				default: url += "&" + subUrl[i]; break;
			}
		}
		
		axios.get(url).then((data) => {
			if(Array.isArray(data.data)) setProdList(data.data);
		}).catch((error) => {
			console.log(error);
			alert("상품을 불러오는 중 문제가 발생했습니다");
		});
	};

	// 민구님꺼? (추정)
	// useEffect(() => {
	// 	let selectedItems = Cookies.get("selectedItems") ? JSON.parse(Cookies.get("selectedItems")) : {};

	// 	api.get("/product/list", {params: selectedItems})
	// 	.then((result) => {
	// 		setProdList(result.data);
	// 	}).catch((error) => {
	// 		console.log(error);
	// 		alert("상품을 불러오는 중 문제가 발생했습니다");
	// 	});
	// }, []);
	
	// cateMain No에 해당하는 cateSub가져오기
	const subCateHTML = () => {
		if (mainNo > 0 && subList?.length > 0) {
			const objArr = subList?.filter((sub) => (sub.cateMain == mainNo));
			return objArr;
		}
		return null;
	};

	// subCate 선택시 스타일부여
	// 안되는 듯
	const subCateHovered = (subNo) => {
		setCheckedSub(subNo);
	};

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

	return (<>
		<h1 className="mainCateName">{mainList.find((main) => main.cateMain == mainNo)?.mainName}</h1>
		<h5 className="subCateName">
			{subCateHTML()?.map((sub, index) => (
				<div className="subListEle" key={index}>
					<Link to={`/product/list/${mainNo}/${sub.cateSub}`}
						onClick={() => subCateHovered(sub.cateSub)} defaultChecked={checkedSub}
						style={{
							color: checkedSub === sub.cateSub ? 'blue' : 'black',
							fontWeight: checkedSub === sub.cateSub ? 'bold' : '200',
							fontSize: checkedSub === sub.cateSub ? '20px' : '15px'}}>
						{sub.subName}
					</Link>
				</div>
			))}
		</h5 >
		<div className="ProdList">
			<div className="menu-side-area">
				<Leftmenubar checkedSub={checkedSub} />
			</div>
			<div className="products">
				{prodList?.length ? prodList.map((prod) => {
					return (<>
						<section key={prod.prodNo} className="product" onClick={() => gotoProdDetail(prod.prodNo)}>
							<img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
							<article>
								<div className="prod-name">{prod.prodName}</div>
								<div className="prod-amount">{checkDiscount(prod)}</div>
								<div className="prod-color">{prod.image?.length && colorList(prod)}</div>
							</article>
						</section>
					</>);
				}) : <div>선택한 상품이 없습니다</div>}
			</div>
		</div>

		{product && <ProdDetail showDetail={showDetail} setShowDetail={setShowDetail} product={product} />}
	</>);
}