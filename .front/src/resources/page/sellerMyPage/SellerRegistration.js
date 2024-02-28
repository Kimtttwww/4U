import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/sellerMyPage/SellerRegistration.css";

export default function SellerRegistration() {

    const [palettes, setPalettes] = useState([]);

    useEffect(() => {
		// 상품 리스트 불러오기
		axios.get("/product/palettes")
		.then((result) => {
			setPalettes(result.data);
		}).catch((error) => {
			console.log(error);
			alert("색상이 없습니다");
		});
	}, []);


    return (

        <div className="SellerRegistration">
            <h2>상품 등록</h2>


            {/* 상품명 설명 박스 */}
            <div className="regi-name-box">
                <input type="text" placeholder="상품명을 입력해 주세요." />
                <textarea type="text" placeholder="상품에 대한 설명을 적어 주세요." />
            </div>

            {/* 사진 박스 */}
            <div className="regi-poto-box">
                <button>+</button>
                <div className="regi-potoBox">
                    {/* 초기화면에는 +버튼만 있고 사진이 추가되면 사진올린만큼 사진칸이 생김 (이건 img태그? div태그? 어떤걸로 해야하지?)*/}
                    <img src="" alt="" />
                </div>
            </div>

            {/* 상품 가격 박스 */}
            <div className="regi-price-box">
                <div>
                    <h5>판매가(KRW)</h5>
                    <input type="text" placeholder="KRW" />
                </div>
                <div>
                    <h5>정가(KRW)</h5>
                    <input type="text" placeholder="KRW" />
                </div>
            </div>

            {/* 옵션 체크 박스 */}
            <div className="regi-option-box">
                <div>
                    <h5>색상</h5>
                    <div>
                        <select name="color" id="colorSelect">
                            {palettes.map(palette => (
                                <option key={palette.colorNo} value={palette.colorNo}>{palette.colorName}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <h5>사이즈</h5>
                    <div>
                        <select name="color" id="colorSelect">
                            <option value=""></option>
                        </select>
                    </div>
                </div>

                <div>
                    <h5>수량</h5>
                    <div>
                        <select name="color" id="colorSelect">
                            <option value=""></option>
                        </select>
                    </div>
                </div>
            </div>


            {/* 버튼 박스 */}
            <div className="regi-btn-box">
                <button>상품 등록</button>
                <button>상품 수정</button>
                <button>상품 삭제</button>
            </div>

        </div>




    )


}