import { useEffect, useRef, useState } from "react";
import ChangeOption from "../../modal/ChangeOption";
import AvailbleCoupon from "../../modal/AvailableCoupon";
import '../../css/order/OrderPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from "axios";
import { loadInfoAPI, loadOrderAPI } from "./OrderAPI";
import { useNavigate } from "react-router-dom";

export default function Order({ loginUser }) {

    const navi = useNavigate();
    const [applyColor, setApplyColor] = useState('');
    const [applySize, setApplySize] = useState('');
    const [isMyCoupon, setisMyCoupon] = useState(false);
    const [loadInfo, setLoadInfo] = useState({});
    const [loadInfoChecked, setLoadInfoChecked] = useState(false);
    const [loadPhone, setLoadPhone] = useState();
    const [isOptionChange, setisOptionChange] = useState(false);
    const [delMsg, setDelMsg] = useState('');
    const [inputChange, setInputChange] = useState({
        receiverName: loadInfo.memberName,
        address: loadInfo.address,
        addressDetail: loadInfo.addressDetail
    });

    const phoneRef = useRef([]);

    const openModal = () => setisOptionChange(true);
    const closeModal = () => setisOptionChange(false);
    const openCoupon = () => setisMyCoupon(true);
    const closeCoupon = () => setisMyCoupon(false);

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
    }

    // 옵션 사이즈변경
    const sizeHandler = (data) => {
        setApplySize(data);
    }

    // 배송메세지 변경
    const applyMsg = (e) => {
        setDelMsg(e.currentTarget.value);
    }



    // 주문자정보 DB에서 가져오기
    const loadFromDb = async () => {
        const responseData = await loadInfoAPI({ memberNo: loginUser?.memberNo });
        // console.log(responseData);
        setLoadInfo(responseData);
    }


    // 배송정보에 input이 감지되면 불러오기체크 해제
    // input의 변경값 담기
    const { receiverName, address, addressDetail } = inputChange;

    const inputChangeHandler = async (e) => {
        setLoadInfoChecked(false);


        let { name, value } = e.target;
        console.log(name, value);
        console.log("inputChange?", inputChange);

        setInputChange({ ...inputChange, [name]: value });


    }


    // 주문자정보 불러오기 체크박스 체크
    const checkedHandler = (e) => {
        // console.log(e.target.checked);
        setLoadInfoChecked(e.target.checked);
        // inputChangeHandler();

        let phoneDb = loadInfo.phone.split('-');
        for (let i = 0; i < 3; i++) {
            if (!loadInfoChecked) {
                phoneRef.current[i].value = phoneDb[i];
            } else {
                phoneRef.current[i].value = "";
                // setLoadInfo("");
            }
            setLoadInfo(loadInfo);
        }

        if (loadInfo != inputChange) {
            // checkedHandler();
            console.log(loadInfo != inputChange, "loadInfo  inputChange 다름 ");
            // console.log("loadInfo  inputChange 다름 ");
            setInputChange({});
        }
    };




    const delInfoHandler = (e) => {
    }

    // 로그인상태에서만 페이지 접근가능하도록 설정
    useEffect(() => {
        if (loginUser == null || !loginUser.memberNo) {
            alert("로그인 해주세요");
            navi("/");
        }
        loadFromDb();

        // axios.post("http://localhost:3000/order/loadOrderInfo", { memberNo: loginUser.memberNo })
        // .then((response) => {
        //     setLoadInfo(response.data);
        // }).catch((err) => console.log("통신 문제있음"))
    }, []);

    useEffect(() => {

    })

    // 결제하기 버튼 클릭시 
    const paymentReq = () => {
        console.log(inputChange);
        if (!receiverName || !address || !addressDetail) {
            alert("배송정보가 모두 입력되지 않았습니다.");
            return;
        }
    }
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
                    <tr>
                        <td>[이미지]</td>
                        <td>샤랄라 원피스</td>
                        <td className="apply-option">
                            L/블랙
                            <label>{applySize}/{applyColor}</label>
                            <Button variant="secondary" className="optionChange-btn"
                                onClick={openModal}>
                                옵션변경
                            </Button>
                            <ChangeOption show={isOptionChange} closeModal={closeModal} sendColor={colorHandler} sendSize={sizeHandler} />

                        </td>
                        <td>39000</td>
                        <td>29000</td>
                        <td>1</td>
                        <td><button>삭제</button></td>
                        {/* {
                            orderData?.map((order, index) => {
                                <td key={index} >{order.value}</td>
                            })

                        } */}
                    </tr>
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
                            className="margin" value={loadInfoChecked ? loadInfo?.memberName : ""}
                            onChange={inputChangeHandler}
                        />
                        <div className="margin">
                            <select ref={(e) => { phoneRef.current[0] = e }}>
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="019">019</option>
                            </select>-
                            <input type="number" id="phone1" name="miPhone" ref={(e) => { phoneRef.current[1] = e }} style={{ width: "60px" }}

                            />-
                            <input type="number" id="phone2" name="laPhone" ref={(e) => { phoneRef.current[2] = e }} style={{ width: "60px" }} />
                        </div>

                        <div className="margin">
                            <div>
                                <input type="number" id="" name="zipCode" style={{ width: "70px" }}
                                    value={loadInfoChecked ? loadInfo?.zipCode : ""} />
                                <button>우편번호 찾기</button>
                            </div>
                            <div>
                                <input type="text" id="" name="address"
                                    value={loadInfoChecked ? loadInfo?.address : inputChange?.address}
                                    onChange={inputChangeHandler} />
                                <input type="text" id="" name="addressDetail"
                                    value={loadInfoChecked ? loadInfo?.addressDetail : (inputChange ? inputChange.addressDetail : "")}
                                    onChange={inputChangeHandler} />
                            </div>
                        </div>
                        <input type="text" id="" name="message" className="margin" />
                        <select style={{ width: "200px" }}
                            onChange={applyMsg} value={delMsg} >
                            {
                                deliMessage?.map((msg, index) => {
                                    <option key={index} value={msg.value}>{msg.value}</option>
                                })

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
                                <div>포인트할인</div>
                                <div>사용가능한 포인트</div>
                            </div>
                            <div className="payment-discount">
                                <div>99,900원</div>
                                <div className="myCoupon-view">
                                    <span style={{ marginRight: '10px' }}>0원</span>
                                    <Button variant="secondary" style={{ width: '130px', height: '25px', fontSize: '10px', padding: '0' }}
                                        onClick={openCoupon}>
                                        사용가능한 쿠폰보기
                                    </Button>
                                    <AvailbleCoupon show={isMyCoupon} closeCoupon={closeCoupon} />

                                </div>
                                <span>0원</span>
                                <div>
                                    <span style={{ marginRight: '10px' }}>0원</span>
                                    <span>전체사용하기</span>
                                    <input type="checkbox" />
                                </div>
                            </div>
                        </div>
                        <div className="payPrice">
                            <span>결제하실 금액</span>
                            <span>99,000원</span>
                            <span>900원 절약</span>
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
                            <div>(총 900원 할인)</div>
                        </div>
                        <div>
                            <div>99,900원</div>
                            <div>900원</div>
                            <div>90,000원</div>
                        </div>
                    </div>
                    <div className="payBtn">
                        <button onClick={paymentReq}>결제하기</button>
                    </div>
                </div>
            </div>
        </div>







    )
}