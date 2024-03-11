import { useEffect, useState } from "react";
import ChangeOption from "../../modal/ChangeOption";
import AvailbleCoupon from "../../modal/AvailableCoupon";
import '../../css/order/OrderPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { userInfoAPI, loadProdNameAPI, loadUserCouponAPI, loadProdImgAPI } from "./OrderAPI";
import { useNavigate } from "react-router-dom";
import PaymentAPI from "./PaymentAPI";
import AddressAPI from "../common/AddressAPI"
import Cookies from "js-cookie";
// import { checkDiscount } from "../common/ProdDetailAPI";

export default function Order({ loginUser }) {

	const inputObj = {
		receiverName: "",
		phone1: "",
		phone2: "",
		phone3: "",
		zipCode: "",
		address: "",
		addressDetail: ""
	};

	const navi = useNavigate();
	const [orderProd, setOrderProd] = useState([]);
	const [prodImgs, setProdImgs] = useState([]);
	const [userInfo, setuserInfo] = useState({});
	const [userInfoChecked, setuserInfoChecked] = useState(false);
	const [isOptionChange, setisOptionChange] = useState(false);
	const [isChange, setIsChange] = useState(false); // 주문자정보 변경여부 체크
	const [userCoupon, setUserCoupon] = useState({}); // member의 coupon
	const [openCoupon, setOpenCoupon] = useState(false); // coupon 모달
	const [applyCoupon, setApplyCoupon] = useState(0); // 사용할 coupon
	const [changePoint, setChangePoint] = useState(0); // input입력되는 point
	const [applyPoint, setApplyPoint] = useState(); // 사용할 point
	const [pointAllChecked, setPointAllChecked] = useState(false); // point 전체사용 여부
	const [modalState, setModalState] = useState(false); // DAUM API 모달
	const [delMsg, setDelMsg] = useState('');
	const [cartItems, setCartItems] = useState(Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : {});
	const [orderIndex, setOrderIndex] = useState(0);
	const [prodCount, setProdCount] = useState();
	const [totalPrice, setTotalPrice] = useState(0);
	const [discountPrice, setdiscountPrice] = useState(0);
	const [inputChange, setInputChange] = useState({
		receiverName: "",
		phone1: "010",
		phone2: "",
		phone3: "",
		zipCode: "",
		address: "",
		addressDetail: ""
	});

	const openModal = () => setisOptionChange(true);
	const closeModal = () => setisOptionChange(false);
	const openCouponModal = () => setOpenCoupon(true);
	const closeCouponModal = () => setOpenCoupon(false);


	// 쿠키에 담아놓은 주문할 상품데이터 꺼내오기
	const getProdName = async () => {
		if (cartItems == null) {
			setCartItems(Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : {});
		};
		if (orderProd.length === 0) {
			const prodNoArr = [];
			cartItems?.forEach(item => {
				prodNoArr.push(item.prodNo)
			});

			if (prodNoArr.length > 0) {
				const responseData = await loadProdNameAPI(prodNoArr);
				const imgResponse = await loadProdImgAPI(prodNoArr);
				setOrderProd([...orderProd, ...responseData]);
				setProdImgs([...prodImgs, ...imgResponse]);
			};
		};
	};

	const checkDiscount = (item) => {
		let element;
		if (item.discountRate) {
			let saledPrice = item.price * (100 - item.discountRate) / 100;
			element = (
				<>
					<div className="prod-discount-style">{(item.price).toLocaleString()}원</div>
					<div>{saledPrice.toLocaleString()}원</div>
				</>
			);
		} else { element = (<span>{(item.price).toLocaleString()}원</span>); }
		return element;
	};

	const checkTotalPrice = (item) => {
		let element;
		if (item.discountRate) {
			let saledPrice = ((item.price * (100 - item.discountRate) / 100) * item.count).toLocaleString()
			element = (<span>{saledPrice}</span>);
		} else { element = (<span>{(item.price * item.count).toLocaleString()}</span>); }
		return element;
	}

	// 해당 상품의 수량 증가
	const increaseCount = (index) => {
		const prodCount = orderProd[index].count++;
		setProdCount(prodCount);
		orderProd[index].count = prodCount;
		setOrderProd(prevOrderProd => {
			const updateProdCount = [...prevOrderProd];
			updateProdCount[index].count++;
			return updateProdCount;
		});
	};

	// 해당 상품의 수량 감소
	const decreaseCount = (index) => {
		if (orderProd[index].count <= 1) {
			alert("1보다 작을 수 없습니다.");
		} else {
			const prodCount = orderProd[index].count--;
			setProdCount(prodCount);
			orderProd[index].count = prodCount;
			setOrderProd(prevOrderProd => {
				const updateProdCount = [...prevOrderProd];
				updateProdCount[index].count--;
				return updateProdCount;
			});
		};
	};

	// 주문상품 삭제버튼 클릭시 
	const orderDelete = (prodNo) => {
		setOrderProd(orderProd?.filter((order) => order.prodNo !== prodNo));
	};

	// 주문자정보 DB에서 가져오기
	const loadFromDb = async () => {
		const responseData = await userInfoAPI(loginUser?.memberNo);
		setuserInfo(responseData);
	};


	// 주문자정보 불러오기 체크박스 핸들러
	const checkedHandler = (e) => {
		setuserInfoChecked(e.target.checked);

		if (e.target.checked) {
			setInputChange({
				receiverName: userInfo?.memberName,
				phone1: (userInfo.phone).split('-')[0],
				phone2: (userInfo.phone).split('-')[1],
				phone3: (userInfo.phone).split('-')[2],
				zipCode: userInfo?.zipCode,
				address: userInfo?.address,
				addressDetail: userInfo?.addressDetail
			});
		};
	};

	// [배송정보]에 input이 감지되면 불러오기체크 해제 -> input의 변경값 담기
	const inputChangeHandler = (e) => {
		setuserInfoChecked(false);
		let { name, value } = e.target;
		// input이 변경되면 inputChageHandler 에 들어옴 -> isChage true로 만듬..
		setIsChange(true);
		setInputChange({ ...inputChange, [name]: value });
	};

	// 다음 주소창(주소찾기 버튼) 열리게 하기
	const toggleModal = () => {
		setModalState(!modalState);
		setuserInfoChecked(false);
		setIsChange(true);
	};

	// AddressAPI에서 주소데이터 받아오기
	const onCompletePost = (data) => {
		setModalState(false);
		const dataName = {
			"zipCode": data.zonecode,
			"address": data.address,
			"addressDetail": ""
		};
		setInputChange({ ...inputChange, ...dataName });
	};

	// 배송메세지 option Data
	const deliMessage = [
		{ key: 0, value: "배송메세지를 선택하세요" },
		{ key: 1, value: "문앞에 두고 가주세요" },
		{ key: 2, value: "경비실에 맡겨주세요" },
		{ key: 3, value: "배송전 연락부탁드립니다" },
		{ key: 4, value: "소화전에 넣어주세요" }
	];

	// 배송메세지 변경
	const applyMsg = (e) => {
		setDelMsg(e.currentTarget.value);
	};


	// member의 coupon정보 가져오기
	const getUserCoupon = async () => {
		if (!loginUser || !loginUser.memberNo) {
			return;
		};
		// const formData = { memberNo: loginUser?.memberNo };
		const responseData = await loadUserCouponAPI(loginUser?.memberNo);
		setUserCoupon(responseData);
	};

	// 적용할 coupon
	const couponHandler = (data) => {
		// payPrice에 총결제할 금액 넣어줄거임.. -> (totalPrice-할인가격)
		// discountRate가 있으면
		const findCoupon = userCoupon.filter(item => item.couponNo == data);
		if (findCoupon) {
			const disPrice = findCoupon[0].discount == 0 ?
				totalPrice - (totalPrice * (1 - findCoupon[0].discountRate / 100)) : findCoupon[0].discount;
			setdiscountPrice(disPrice);
			setApplyCoupon(findCoupon[0]);
		};
	};

	// 적용할 point
	const pointHandler = (e) => {
		// 여기 들어왔다? -> input에 변화가 생김
		// -> 전체사용버튼 해제 + 내포인트보다 더 입력X(input비우기) + changePoint에 값입력받다가 최종 applyPoint에저장
		let inputPoint = parseInt(e.target.value);
		setPointAllChecked(false);
		if (userInfo.point < inputPoint) {
			e.target.value = 0;
			alert("최대 " + userInfo.point + "원 사용가능합니다");
			setChangePoint(0);
			return;
		};
		if (inputPoint == "") {
			setChangePoint(0);
		};
		setChangePoint(inputPoint);
	};

	// point 전체사용하기 check상태값 체크
	const pointAllCheckedHandler = (e) => {
		setPointAllChecked(e.target.checked);
		if (!pointAllChecked) {
			setChangePoint(userInfo.point);
		} else {
			setChangePoint(0);
		}
	};

	// 결제하기 버튼 클릭시 보낼 데이터들
	const dataByPayment = {
		applyCoupon, applyPoint, delMsg, totalPrice, discountPrice
	};

	useEffect(() => {
		if (!userInfoChecked) {
			// userInfoChecked가 체크해제됨(불러오기 안함)

			if (!isChange) {
				// input 변경내용 없음 -> input 전부 공백처리
				setInputChange(inputObj);
			};
		};
		setIsChange(false);
	}, [userInfoChecked]);

	useEffect(() => {
		if (!pointAllChecked) {
			if (!changePoint) {
				setChangePoint(0);
			};
			setChangePoint(changePoint);
		} else {
			setChangePoint(userInfo.point);
		};
	}, [pointAllChecked]);


	useEffect(() => {
		setApplyPoint(changePoint);
	}, [changePoint]);



	// 로그인상태에서만 페이지 접근가능하도록 설정
	useEffect(() => {
		if (loginUser == null || !loginUser.memberNo) {
			alert("로그인 후 이용가능합니다.");
			navi("/");
			return;
		};
		if ((Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [])?.length == 0) {
			alert("장바구니가 비어있습니다.");
			navi("/");
			return;
		};
		loadFromDb();
		getUserCoupon();
		getProdName();
	}, []);

	useEffect(() => {
		if (modalState) {
			const modal = document.querySelector("#modal");
			modal.parentElement.addEventListener('click', (e) => {
				e.stopPropagation();
			});
			const closeBtn = document.querySelector(".modal-header").children[1];
			closeBtn.addEventListener('click', (e) => { setModalState(false); });
		}
	}, [modalState])

	useEffect(() => {
		if (orderProd.length > 0 && cartItems != null) {
			// 쿠키에서 담아온 배열 객체에 추가적인 정보를 더 넣기 위해서 합칠거임
			let arr = [];
			orderProd?.forEach((order) => {
				order = {
					...order, ...cartItems?.filter(
						(item) => item.prodNo == order.prodNo)[0]
				};
				arr.push(order);
			});
			setOrderProd(arr);
			setCartItems(null);
		};

		const allPrice = orderProd.reduce((total, product) =>
			total + (product.price * product.count), 0);
		setTotalPrice(allPrice);
	}, [orderProd, prodCount]);

	return (
		<div className="order-container">
			<p className="order-write">주문서 작성</p>
			<span className="order-prod-title">주문상품</span>
			<table className="order-prod-table">
				<thead>
					<tr>
						<td style={{ width: "10%" }}>이미지</td>
						<td style={{ width: "43%" }}>상품명</td>
						<td style={{ width: "11%" }}>옵션</td>
						<td style={{ width: "10%" }}>상품금액</td>
						<td style={{ width: "8%" }}>수량</td>
						<td style={{ width: "10%" }}>주문금액</td>
						<td style={{ width: "8%" }}>삭제</td>
					</tr>
				</thead>
				<tbody>
					{
						orderProd?.map((item, index) => {
							return (
								<tr key={index}>
									<img className="orderProdImg "
										src={prodImgs.filter((img) => item.prodNo == img.refNo)[1].imgName} />
									<td>{item.prodName}</td>
									<td>
										<div>{item.colorName}/{item.size}</div>
										<Button variant="secondary" className="optionChange-btn"
											onClick={() => {
												openModal();
												setOrderIndex(index);
											}}>
											옵션변경
										</Button>
										<ChangeOption show={isOptionChange}
											closeModal={closeModal}
											orderProd={orderProd[orderIndex]} />
									</td>
									<td className="table-price">{checkDiscount(item)}</td>
									<td className="countTdTag">
										<div className="prod-price-style">
											{item.count}
										</div>
										<div className="updownButton">
											<img src="/photo/order-up.png"
												style={{ width: "20px" }}
												onClick={() => increaseCount(index)} />
											<img src="/photo/order-down.png"
												style={{ width: "20px" }}
												onClick={() => decreaseCount(index)} />
										</div>
									</td>
									<td>{(checkTotalPrice(item))}원</td>
									<td>
										<img src="/photo/order-x.png"
											style={{ width: "25px" }}
											onClick={() => orderDelete(item.prodNo)} />
									</td>
								</tr>

							);
						})
					}
				</tbody>
			</table>

			<span className="totalPrice">총 주문금액 {totalPrice.toLocaleString()}원</span>

			<div className="delivery-info">
				<span className="order-delivery-title">배송정보</span>
				<div className="ordererInfo">
					<input type="checkbox" name="ordererInfo"
						checked={userInfoChecked} onChange={checkedHandler}
					/>
					<span style={{ fontSize: "16px" }}>주문자정보 불러오기</span>
				</div>
				<div className="order-delivery-content">
					<div className="receiver-text">
						<span style={{ height: "60px" }}>수령자명</span>
						<span style={{ height: "60px" }}>연락처</span>
						<span style={{ height: "80px" }}>배송지주소</span>
						<span style={{ height: "60px" }}>배송메모</span>
					</div>

					<div className="receiver-input">
						<input type="text" id="userName" name="receiverName" placeholder="입력해주세요"
							style={{ height: "60px" }}
							value={userInfoChecked ? userInfo?.memberName : inputChange.receiverName}
							onChange={inputChangeHandler}
						/>
						<div className="order-phone-box"
							style={{ height: "60px" }}>
							<select defaultValue={'010'} name="phone1"
								value={userInfoChecked ? (userInfo?.phone).split('-')[0] : inputChange?.phone1} maxLength={3}
								onChange={inputChangeHandler} >
								<option >선택</option>
								<option value="010">010</option>
								<option value="011">011</option>
								<option value="019">019</option>
							</select>
							<span>-</span>
							<input type="number" id="phone2" name="phone2"
								value={userInfoChecked ? (userInfo?.phone).split('-')[1] : inputChange?.phone2} maxLength={4}
								onChange={inputChangeHandler} />
							<span>-</span>
							<input type="number" id="phone3" name="phone3"
								value={userInfoChecked ? (userInfo?.phone).split('-')[2] : inputChange?.phone3} maxLength={4}
								onChange={inputChangeHandler} />
						</div>

						<div className="order-address"
							style={{ height: "80px" }}>
							<div>
								<input type="number" id="" name="zipCode" readOnly
									value={userInfoChecked ? userInfo?.zipCode : inputChange.zipCode} />

								<button type="button" onClick={toggleModal} className="btn btn-primary">주소 찾기</button>
								{/* Daum 주소 API 컴포넌트 */}
								<Modal id="modal" show={modalState} onHide={() => setModalState(false)}
									dialogClassName='DaumModal' className="addressAPI-modal">
									<AddressAPI onCompletePost={onCompletePost} />
								</Modal>
							</div>
							<div>
								<input type="text" name="address" readOnly
									value={userInfoChecked ? userInfo?.address : inputChange.address}
									onChange={inputChangeHandler} />
								<input type="text" name="addressDetail"
									value={userInfoChecked ? userInfo?.addressDetail : inputChange.addressDetail}
									onChange={inputChangeHandler} placeholder="상세 주소 입력" />
							</div>
						</div>
						<div style={{ height: "60px" }}>
							<input type="text" name="message"
								value={delMsg}
								onChange={applyMsg} />
							<select
								onChange={applyMsg} >
								{
									deliMessage?.map((msg, index) =>
										<option key={index} value={msg.value ? msg.value : delMsg}>{msg.value}</option>
									)
								}
							</select>
						</div>
					</div>
				</div>
			</div>

			<div className="paymnet-area">
				<span className="order-paymentInfo-title">결제정보</span>
				<div className="payment-left">
					<div className="order-paymentInfo-content">
						<div className="payment-info">
							<div className="payment-text">
								<div>결제예정금액</div>
								<div>쿠폰할인</div>
								<div>사용할 포인트</div>
								<div>사용가능한 포인트</div>
							</div>
							<div className="payment-discount">
								<div style={{ height: "54px" }}>
									{totalPrice.toLocaleString()}원</div>
								<div className="payment-discount-view">
									<input type="number"
										style={{ width: '80px', height: "30px" }} readOnly
										value={discountPrice} />원
									<Button type="button" variant="secondary"
										style={{ width: '120px', height: '25px', fontSize: '12px', padding: '0', marginLeft: '10px' }}
										onClick={openCouponModal}>
										사용가능한 쿠폰보기
									</Button>
									<AvailbleCoupon show={openCoupon} closeModal={closeCouponModal}
										loginUser={loginUser} userCoupon={userCoupon}
										sendCoupon={couponHandler} />
								</div>
								<div className="payment-discount-view">
									<input type="number"
										style={{ width: '80px', height: "30px" }} id="applyPoint"
										value={pointAllChecked ? userInfo.point : applyPoint}
										onChange={pointHandler} max={userInfo.point}
										min={0} />원
								</div>
								<div className="payment-discount-point"
									style={{ height: "56px" }}>
									<span>{userInfo.point}원</span>
									<input type="checkbox" checked={pointAllChecked}
										style={{ marginLeft: "20px" }}
										onChange={pointAllCheckedHandler} />
									<span style={{ fontSize: "16px" }}>전체사용하기</span>
								</div>
							</div>
						</div>

						<div className="payPrice">
							<div>결제하실 금액</div>
							<div>
								{
									(totalPrice - discountPrice - applyPoint).toLocaleString()
								}원
								(
								{
									(discountPrice + applyPoint).toLocaleString()
								}원 절약
							</div>)
						</div>
					</div>
				</div>
			</div>

			<div className="payBtn-div">
				<PaymentAPI
					userInfo={userInfo}
					dataByPayment={dataByPayment} //쿠폰,포인트,배송메세지, 할인전 총금액, 할인금액 
					changeInfo={inputChange} // 새로운 배송지정보
					orderProd={orderProd} //주문하는 상품
					prodImgs={prodImgs} />
			</div>
		</div>







	)
}
