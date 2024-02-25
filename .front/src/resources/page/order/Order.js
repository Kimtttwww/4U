import { useEffect, useRef, useState } from "react";
import ChangeOption from "../../modal/ChangeOption";
import AvailbleCoupon from "../../modal/AvailableCoupon";
import '../../css/order/OrderPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { loadInfoAPI, loadProdNameAPI, loadUserCouponAPI, loadUserPointAPI } from "./OrderAPI";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";
import PaymentAPI from "./PaymentAPI";
import AddressAPI from "../common/AddressAPI"
import Cookies from "js-cookie";

export default function Order({ loginUser }) {

    const inputObj = {
        receiverName: "",
        phone1: "",
        phone2: "",
        phone3: "",
        zipCode: "",
        address: "",
        addressDetail: ""
    }


    const navi = useNavigate();
    const [loadInfo, setLoadInfo] = useState({});
    const [loadInfoChecked, setLoadInfoChecked] = useState(false);
    const [phoneParts, setPhoneParts] = useState(['', '', '']);
    const [changePhoneParts, setChangePhoneParts] = useState(['', '', '']);
    const [isOptionChange, setisOptionChange] = useState(false);
    const [applyColor, setApplyColor] = useState('');
    const [applySize, setApplySize] = useState('');
    const [isChange, setIsChange] = useState(false); // 주문자정보 변경여부 체크
    const [userCoupon, setUserCoupon] = useState({}); // member의 coupon
    const [openCoupon, setOpenCoupon] = useState(false); // coupon 모달
    const [applyCoupon, setApplyCoupon] = useState(0); // 사용할 coupon
    const [changePoint, setChangePoint] = useState(0); // input입력되는 point
    const [pointAllChecked, setPointAllChecked] = useState(false); // point 전체사용 여부
    const [applyPoint, setApplyPoint] = useState(); // 사용할 point
    const [modalState, setModalState] = useState(false); // DAUM API 모달
    const [delMsg, setDelMsg] = useState('');
    const [orderProd, setOrderProd] = useState([]);
    const [cartItems, setCartItems] = useState(JSON.parse(Cookies.get('cart')));
    const [inputChange, setInputChange] = useState({
        receiverName: "",
        phone1: "010",
        phone2: "",
        phone3: "",
        zipCode: "",
        address: "",
        addressDetail: ""
    });
    const [zipAndAddress, setZipAndAddress] = useState({
        zipCode: "",
        address: ""
    });


    const openModal = () => setisOptionChange(true);
    const closeModal = () => setisOptionChange(false);
    const openCouponModal = () => setOpenCoupon(true);
    const closeCouponModal = () => setOpenCoupon(false);
    const handleModalOpen = () => setModalState(true);
    const handleModalClose = () => setModalState(false);

    const [optionNum, setOptionNum] = useState(null);

    // 다음 주소창(주소찾기 버튼) 열리게 하기
    const toggleModal = () => {
        setModalState(!modalState);
        setLoadInfoChecked(false);
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

    // 옵션 색상변경
    const colorHandler = (data) => {
        setApplyColor(data);
    };

    // 옵션 사이즈변경
    const sizeHandler = (data) => {
        setApplySize(data);
    };

    // 배송메세지 변경
    const applyMsg = (e) => {
        setDelMsg(e.currentTarget.value);
    };

    // 주문자정보 DB에서 가져오기
    const loadFromDb = async () => {
        const responseData = await loadInfoAPI(loginUser?.memberNo);
        setLoadInfo(responseData);
    }

    // 주문자정보 불러오기 체크박스 핸들러
    const checkedHandler = (e) => {
        setLoadInfoChecked(e.target.checked);

        if (e.target.checked) {
            setInputChange({
                receiverName: loadInfo?.memberName,
                phone1: (loadInfo.phone).split('-')[0],
                phone2: (loadInfo.phone).split('-')[1],
                phone3: (loadInfo.phone).split('-')[2],
                zipCode: loadInfo?.zipCode,
                address: loadInfo?.address,
                addressDetail: loadInfo?.addressDetail
            });
        };
    };

    // [배송정보]에 input이 감지되면 불러오기체크 해제 -> input의 변경값 담기
    const inputChangeHandler = (e) => {
        setLoadInfoChecked(false);
        let { name, value } = e.target;
        // input이 변경되면 inputChageHandler 에 들어옴 -> isChage true로 만듬..
        setIsChange(true);
        setInputChange({ ...inputChange, [name]: value });
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
        const findCoupon = userCoupon.filter(item => item.couponNo == data);
        if (findCoupon) {
            const coupon = findCoupon[0].discount == 0 ?
                findCoupon[0].discountRate : findCoupon[0].discount;
            setApplyCoupon(coupon);
        };
    };

    // 적용할 point
    const pointHandler = (e) => {
        // 여기 들어왔다? -> input에 변화가 생김
        // -> 전체사용버튼 해제 + 내포인트보다 더 입력X(input비우기) + changePoint에 값입력받다가 최종 applyPoint에저장
        let inputPoint = parseInt(e.target.value);
        setPointAllChecked(false);

        if (loadInfo.point < inputPoint) {
            e.target.value = "";
            alert("최대 " + loadInfo.point + "원 사용가능합니다");
            setChangePoint(0);
            return;
        }
        setChangePoint(inputPoint);
    };

    // point 전체사용하기 check상태값 체크
    const pointAllCheckedHandler = (e) => {
        setPointAllChecked(e.target.checked);
        if (!pointAllChecked) {
            setChangePoint(loadInfo.point);
        } else {
            setChangePoint(0);
        }
    };

    // 주문상품 삭제버튼 클릭시 
    const orderDelete = (prodNo) => {
        setOrderProd(orderProd?.filter((order) => order.prodNo !== prodNo));
    };

    const optionChangeHandler = (index) => {
        // setOptionNum(index);
    }

    // const sendPayment = (data) => {
    // PG사
    // 결제수단 //가상계좌 vbank
    // 주문번호
    // 결제금액
    // 주문명
    // 구매자 이름
    // 구매자 전화번호
    // 구매자 이메일
    // 구매자 주소
    // 구매자 우편번호
    // };

    // test = `${new Date().getFullYear()}${(new Date().getMonth() + 1 < 10 ? '0' : '')}${new Date().getMonth() + 1}${(new Date().getDate() < 10 ? '0' : '')}${new Date().getDate()}`;


    useEffect(() => {
        if (!loadInfoChecked) {
            // loadInfoChecked가 체크해제됨(불러오기 안함)

            if (!isChange) {
                // input 변경내용 없음 -> input 전부 공백처리
                setInputChange(inputObj);
            }
        }
        setIsChange(false);
    }, [loadInfoChecked]);

    useEffect(() => {
        if (!pointAllChecked) {
            if (!changePoint) {
                setChangePoint(0);
            };
            setChangePoint(changePoint);
        } else {
            setChangePoint(loadInfo.point);
        };
    }, [pointAllChecked]);


    useEffect(() => {
        setApplyPoint(changePoint);
    }, [applyCoupon, changePoint]);


    // 로그인상태에서만 페이지 접근가능하도록 설정
    useEffect(() => {
        // if (loginUser == null || !loginUser.memberNo) {
        //     // alert("로그인 후 이용가능합니다.");
        //     navi("/");
        // }
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


    // 주문할 상품 쿠키에서 꺼내오기
    const getProdName = async () => {

        if (cartItems == null) {
            setCartItems(JSON.parse(Cookies.get('cart')));
        }

        const itemArr = [];
        const prodNos = cartItems?.map(item => {
            itemArr.push(item.prodNo)
        });
        const responseData = await loadProdNameAPI(itemArr);
        setOrderProd([...orderProd, ...responseData]);
    };

    useEffect(() => {
        if (orderProd.length > 0 && cartItems != null) {
            // 쿠키에서 담아온 배열 객체에 추가적인 정보를 더 넣ㅇ기 위해서 합칠거임
            let arr = [];
            orderProd?.map((order) => {
                order = { ...order, ...cartItems?.filter((item) => item.prodNo == order.prodNo)[0] };
                arr.push(order);
            })
            setOrderProd(arr);
            setCartItems(null);
        };
    }, [orderProd]);


    return (
        <div className="order-container">
            <p className="order-write">주문서 작성</p>
            <span className="order-prod-title">주문상품(총수량)</span>
            <table className="order-prod-table">
                <thead>
                    <tr>
                        <td>이미지</td>
                        <td>상품명</td>
                        <td>옵션</td>
                        <td>상품금액</td>
                        <td>주문금액</td>
                        <td>수량</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>

                    {
                        orderProd?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>[이미지]</td>
                                    <td>{item.prodName}</td>
                                    <td>
                                        {item.size}/{item.colorName}

                                        <Button variant="secondary" className="optionChange-btn"
                                            onClick={() => {
                                                openModal();
                                                setOptionNum(index);
                                            }}
                                        >
                                            옵션변경
                                        </Button>

                                        {optionNum == null ? <></> :
                                            <ChangeOption show={isOptionChange} closeModal={closeModal} sendColor={colorHandler} sendSize={sizeHandler} option={orderProd[optionNum]} />}
                                    </td>
                                    <td>{item.price}</td>
                                    <td>{item.count}</td>
                                    <td><button onClick={() => { orderDelete(item.prodNo) }}>삭제</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <span className="totalPrice">총 주문금액</span>

            <span className="order-delivery-title">배송정보</span>
            <div className="delivery-info">
                <div className="ordererInfo">
                    <input type="checkbox" id="" name="ordererInfo"
                        checked={loadInfoChecked} onChange={checkedHandler}
                    />
                    <span>주문자정보 불러오기</span>
                </div>
                <div className="order-delivery-content">
                    <div className="receiver-text">
                        <span className="margin">수령자명</span>
                        <span className="margin">연락처</span>
                        <span className="margin">배송지주소</span>
                        <span className="memo">배송메모</span>
                    </div>

                    <div className="receiver-input">
                        <input type="text" id="userName" name="receiverName" style={{ width: "100px" }}
                            className="margin" value={loadInfoChecked ? loadInfo?.memberName : inputChange.receiverName}
                            onChange={inputChangeHandler}
                        />
                        <div className="margin">
                            <select defaultValue={'010'} name="phone1"
                                value={loadInfoChecked ? (loadInfo?.phone).split('-')[0] : inputChange?.phone1} maxLength={3}
                                onChange={inputChangeHandler} >
                                <option >선택</option>
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="019">019</option>
                            </select>
                            -
                            <input type="number" id="phone2" name="phone2"
                                value={loadInfoChecked ? (loadInfo?.phone).split('-')[1] : inputChange?.phone2} maxLength={4}
                                onChange={inputChangeHandler} />
                            -
                            <input type="number" id="phone3" name="phone3"
                                value={loadInfoChecked ? (loadInfo?.phone).split('-')[2] : inputChange?.phone3} maxLength={4}
                                // onChange={(e) => phonePartsHandler(2, e.target.value)} />
                                onChange={inputChangeHandler} />
                        </div>

                        <div className="margin">
                            <div>
                                <input type="number" id="" name="zipCode" readOnly
                                    value={loadInfoChecked ? loadInfo?.zipCode : inputChange.zipCode} />

                                <button type="button" onClick={toggleModal} className="btn btn-primary">주소 찾기</button>
                                {/* Daum 주소 API 컴포넌트 */}
                                <Modal id="modal" show={modalState} onHide={handleModalClose} dialogClassName='DaumModal' >
                                    <AddressAPI onCompletePost={onCompletePost} />
                                </Modal>
                            </div>
                            <div>
                                <input type="text" id="" name="address" readOnly style={{ width: "250px", fontSize: "12px" }}
                                    value={loadInfoChecked ? loadInfo?.address : inputChange.address}
                                    onChange={inputChangeHandler} />
                                <input type="text" id="" name="addressDetail" style={{ width: "250px" }}
                                    value={loadInfoChecked ? loadInfo?.addressDetail : inputChange.addressDetail}
                                    onChange={inputChangeHandler} />
                            </div>
                        </div>
                        <input type="text" id="" name="message" className="margin" style={{ width: "200px" }}
                            value={delMsg} />
                        <select style={{ width: "220px" }}
                            onChange={applyMsg}  >
                            {
                                deliMessage?.map((msg, index) =>
                                    <option key={index} value={msg.value}>{msg.value}</option>
                                )

                            }

                        </select>
                    </div>
                </div>
            </div>

            <span className="order-paymentInfo-title">결제정보</span>
            <div className="paymnet-area">
                <div className="payment-left">
                    <div className="order-paymentInfo-content">
                        <div className="payment-info">
                            <div className="payment-text">
                                <div>결제예정금액</div>
                                <div>쿠폰할인</div>
                                <div>사용할 포인트</div>
                                <div style={{ fontSize: '11px' }}>사용가능한 포인트</div>
                            </div>
                            <div className="payment-discount">
                                <div>90,000원</div>
                                <div className="myCoupon-view">
                                    <input type="number" style={{ width: '80px' }}
                                        value={applyCoupon} readOnly />원

                                    <Button type="button" variant="secondary"
                                        style={{ width: '130px', height: '25px', fontSize: '10px', padding: '0', marginLeft: '10px' }}
                                        onClick={openCouponModal}>
                                        사용가능한 쿠폰보기
                                    </Button>
                                    <AvailbleCoupon show={openCoupon} closeModal={closeCouponModal}
                                        loginUser={loginUser} userCoupon={userCoupon}
                                        sendCoupon={couponHandler} />
                                </div>
                                <span>
                                    <input type="number" style={{ width: '80px' }} id="applyPoint"
                                        value={pointAllChecked ? loadInfo.point : applyPoint} onChange={pointHandler} max={loadInfo.point} min={0} />원
                                </span>
                                <div>
                                    <span style={{ marginRight: '10px' }}>{loadInfo.point}원</span>
                                    <input type="checkbox" checked={pointAllChecked} onChange={pointAllCheckedHandler}
                                    />
                                    <span>전체사용하기</span>
                                </div>
                            </div>
                        </div>
                        <div className="payPrice">
                            <span>결제하실 금액</span>
                            <span>
                                {
                                    (90000 - applyCoupon - applyPoint)
                                }원
                            </span>
                            <span>
                                {
                                    (applyCoupon + applyPoint)
                                }원 절약
                            </span>
                        </div>
                    </div>

                    <span className="order-payment-title">결제하기</span>
                    <div className="payment-method">
                        <button>카드결제</button>
                        <button>무통장입금</button>
                        <button>페이결제</button>
                    </div>
                </div>


                <div className="payment-right">
                    <p>최종 결제금액</p>
                    <div className="payment-right-content">
                        <div>
                            <div>상품금액</div>
                            <div>할인금액</div>
                            <div>(총 {(applyCoupon + applyPoint)}원 할인)</div>
                        </div>
                        <div>
                            <div>90000원</div>
                            <div>
                                {(applyCoupon + applyPoint)}원
                            </div>
                            <div>
                                {(90000 - applyCoupon - applyPoint)}원
                            </div>
                        </div>
                    </div>
                    <div className="payBtn">
                        <PaymentAPI sendPayment={loadInfo} point={applyPoint} />
                    </div>
                </div>
            </div>
        </div >







    )
}
