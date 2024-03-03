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
                <textarea placeholder="상품에 대한 설명을 적어 주세요." />
            </div>


            {/* 옷의 세부 상품 설명 */}
            <div className='regi-detail-box'>
                <div>
                    <h5>옷감 두께:</h5>
                    <input type="text" />
                </div>
                <div>
                    <h5>옷의 안감:</h5>
                    <input type="text" />
                </div>
                <div>
                    <h5>비침 정도:</h5>
                    <input type="text" />
                </div>
                <div>
                    <h5>옷감 종류:</h5>
                    <input type="text" />
                </div>
                <div>
                    <h5>디자인(패턴):</h5>
                    <input type="text" />
                </div>
                <div>
                    <h5>라인 타입:</h5>
                    <input type="text" />
                </div>
                <div>
                    <h5>계절감:</h5>
                    <input type="text" />
                </div>
            </div>
            

            {/* 사진 박스 */}
            <div className="regi-poto-box">
                <h4>제품 사진 등록</h4>
                <div>
                    <button>+</button>
                    <div className="regi-poto-list">
                        {/* 초기화면에는 +버튼만 있고 사진이 추가되면 사진올린만큼 사진칸이 생김 */}
                        <img src="" alt="" />
                    </div>
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
                    <h5>색상:</h5>
                    <div>
                        <select name="color" id="colorSelect">
                            {palettes.map(palette => (
                                <option key={palette.colorNo} value={palette.colorNo}>{palette.colorName}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <h5>사이즈:</h5>
                    <div>
                        <select name="size" id="colorSelect">
                            <option value="size-S">S</option>
                            <option value="size-M">M</option>
                            <option value="size-L">L</option>
                            <option value="size-XL">XL</option>
                            <option value="size-XXL">XXL</option>
                        </select>
                        <input type="text" placeholder='기장 수치 입력.'/>
                    </div>
                </div>

                <div>
                    <h5>수량:</h5>
                    <div>
                        <input type="text" placeholder='수량 입력.'/>
                    </div>
                </div>
                {/* 추가 버튼 누를시 가격/색상/사이즈/수량에 기입된 정보만 아래에 regi-stock-box 박스에 추가 됨 */}
                <button type='button'>추가</button>
            </div>


            {/* 가격 / 색상 / 사이즈 / 수량 정해서 등록 후 list로 보여질 박스*/}
            <div className='regi-stock-box'>
                <h5>해당 상품의 재고 목록</h5>
                <div>
                    <textarea></textarea>
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