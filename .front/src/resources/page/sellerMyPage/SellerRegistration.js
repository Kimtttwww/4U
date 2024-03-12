import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/sellerMyPage/SellerRegistration.css";

export default function SellerRegistration() {

    const [palettes, setPalettes] = useState([]);
    const [images, setImages] = useState([]);
    const [newImage , setNewImage] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const [index, setIndex] = useState('');
    const [colorNo, setColorNo] = useState('');
    const [size, setSize] = useState('');
    const [stack, setStack] = useState('');
    const [top, setTop] = useState('');
    const [bottom, setBottom] = useState('');
    const [stockList, setStockList] = useState([]);

    const [product, setProduct] = useState({
        prodName: '',
        prodCap: '',
        thickness : '',
        lining : '',
        seeThrough : '',
        fabric : '',
        pattern: '',
        line: '',
        season: '',
        price : '',
        discountRate : ''
    });

    const handleChange = (e) => {
        // 할인률 검사
        if (e.target.name === 'discountRate') {
          const value = parseInt(e.target.value, 10);
          // 할인률 값이 0 미만이거나 100 초과인 경우
          if (value < 0 || value > 100) {
            alert('할인률은 0% 이상 100% 이하로 설정해주세요.');
            e.target.value = '';
            return; // 여기서 함수 실행을 중단
          }
        }
        
        // 숫자가 아닌 값 입력 검사 (판매가와 할인률 제외)
        const nonNumericFields = ['thickness', 'lining', 'seeThrough', 'fabric', 'pattern', 'line', 'season'];
        if (nonNumericFields.includes(e.target.name) && !isNaN(e.target.value) && e.target.value.trim() !== '') {
            alert('문자를 입력하십시오.');
            e.target.value = '';
            return; // 여기서 함수 실행을 중단
        }

        // 기타 입력 필드에 대한 상태 업데이트
        setProduct({
          ...product,
          [e.target.name]: e.target.value,
        });
      };

    console.log(product);

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

    const handleOptionChange = (event) => {
        console.log("Option selected: ", event.target.value);
        setSelectedOption(event.target.value);
    };
    
    const handleColorChange = (event) => {
        console.log("Color selected: ", event.target.value);
        setSelectedColor(event.target.value);
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            if (!selectedOption || !selectedColor) {
                alert('옵션과 색상을 먼저 선택해 주세요.');
                return;
            }
            const imageUrl = URL.createObjectURL(selectedImage);
            const newImages = [...images, { imgName: imageUrl.trim(), imgType: selectedOption, colorNo: selectedColor }];
            console.log("New image: ", newImages[newImages.length - 1]);
            setImages(newImages);
        }
    };

    console.log(newImage);

    const handleAddImage = () => {
        // 이미지 URL이 비어 있는지 확인하고, 비어 있으면 추가하지 않음
        if (!images[images.length - 1].imgName || !selectedOption || !selectedColor) {
            alert('이미지 URL, 색상, 옵션을 모두 선택해주세요.');
            return;
        }
        
        // 새 이미지 추가 처리
        const newImages = [...images];
        setNewImage(newImages);
    };



    const handleAdd = () => {
        if (!index || !colorNo || !size || !stack || 
            (!top && !bottom)) {
            alert('모든 필드를 채워주세요.');
            return;
        }

        setStockList(prevList => [...prevList, {
            index,
            colorNo,
            size,
            stack,
            top,
            bottom
        }]);

        setIndex('');
        setColorNo('');
        setSize('');
        setStack('');
        setTop('');
        setBottom('');
    };


    // const handleProductRegistration = () => {
    //     // 클라이언트에서 서버로 상품 정보 전송
    //     axios.post("/product/sellerInsertProduct", product)
    //     .then((response) => {
    //         console.log("Product data sent successfully");
    //     })
    //     .catch((error) => {
    //         console.error("Error sending product data:", error);
    //     });

    //     // 클라이언트에서 서버로 이미지 데이터 전송
    //     axios.post("/product/sellerImgInsert", newImage)
    //     .then((response) => {
    //         console.log("Image data sent successfully");
    //     })
    //     .catch((error) => {
    //         console.error("Error sending image data:", error);
    //     });

    //     // 클라이언트에서 서버로 재고 데이터 전송
    //     axios.post("/product/sellerProdDetail", stockList)
    //     .then((response) => {
    //         console.log("Stock data sent successfully");
    //     })
    //     .catch((error) => {
    //         console.error("Error sending stock data:", error);
    //     })

    //     .then(response => {
    //         console.log(response.data);
    //         alert('상품이 성공적으로 등록되었습니다.');
    //         // 상품 등록 후 필요한 작업 수행
    //     })
    //     .catch(error => {
    //         console.error('상품 등록에 실패했습니다:', error);
    //         alert('상품 등록에 실패했습니다. 다시 시도해주세요.');
    //     });
    // };

    const handleProductRegistration = () => {

        // 상품명과 상품설명 입력값 검사
        if (!product.prodName.trim() || !product.prodCap.trim()) {
            alert('상품명 또는 상품설명을 입력해주세요.');
            window.scrollTo(0,0); // 페이지 맨 위로 이동
            return; // 함수 실행을 여기서 중단
        }

        Promise.all([
            axios.post("/product/sellerInsertProduct", product),
            axios.post("/product/sellerImgInsert", newImage),
            axios.post("/product/sellerProdDetail", stockList),
        ])
        .then((responses) => {
            console.log("All data sent successfully");
            // 모든 응답에서 필요한 데이터 처리
            responses.forEach(response => console.log(response.data));
            alert('상품이 성공적으로 등록되었습니다.');
            // 상품 등록 후 필요한 작업 수행
        })
        .catch((error) => {
            console.error("Error during the registration process:", error);
            alert('상품 등록에 실패했습니다. 다시 시도해주세요.');
        });
    };




    return (
    <>
            <div className="SellerRegistration">
                <h2>상품 등록</h2>

                <div className="regi-name-box">
                    <input type="text" name="prodName" placeholder="상품명을 입력해 주세요." onChange={handleChange} />
                    <textarea name="prodCap" placeholder="상품에 대한 설명을 적어 주세요." onChange={handleChange} />
                </div>

                <div className='regi-detail-box'>
                    <div>
                        <h5>옷감 두께:</h5>
                        <input type="text" name="thickness" onChange={handleChange} />
                    </div>
                    <div>
                        <h5>옷의 안감:</h5>
                        <input type="text" name="lining" onChange={handleChange}/>
                    </div>
                    <div>
                        <h5>비침 정도:</h5>
                        <input type="text" name="seeThrough" onChange={handleChange} />
                    </div>
                    <div>
                        <h5>옷감 종류:</h5>
                        <input type="text" name="fabric" onChange={handleChange} />
                    </div>
                    <div>
                        <h5>디자인(패턴):</h5>
                        <input type="text" name="pattern" onChange={handleChange} />
                    </div>
                    <div>
                        <h5>라인 타입:</h5>
                        <input type="text" name="line" onChange={handleChange} />
                    </div>
                    <div>
                        <h5>계절감:</h5>
                        <input type="text" name="season" onChange={handleChange} />
                    </div> 

                    {/* 상품 가격 박스 */}
                    <div className="regi-price-box">
                        <div>
                            <h5>판매가(KRW)</h5>
                            <input type="text" name='price' onChange={handleChange} placeholder="KRW" />
                        </div>
                        <div>
                            <h5>할인률(%)</h5>
                            <input type="number" name='discountRate' onChange={handleChange} placeholder="%" min="0" max="100" />
                        </div>
                    </div>
                </div>


            

            {/* 사진 박스 */}
            <div className="regi-poto-box">
            <h4>제품 사진 등록</h4>
            <div>
                <input type="file" onChange={handleImageChange} />
                <div className="regi-poto-list">
                    {/* 업로드된 이미지들을 출력 */}
                    <div className="image-container" style={{ display: 'flex' }}>
                        {images.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.imgName} alt={`Uploaded ${index}`} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='imgOption'>
                    <select onChange={(event) => handleOptionChange(event)} value={selectedOption}>
                        <option>사용 용도 선택</option>
                        <option value="1">1:썸네일</option>
                        <option value="2">2:상세</option>
                        <option value="3">3:리뷰</option>
                        <option value="4">4:문의</option>
                    </select>

                    <select name='color' id='colorSelect' onChange={(event) => handleColorChange(event)} value={selectedColor}>
                        <option>색상 선택</option>
                        {palettes.map(palette => (
                            <option key={palette.colorNo} value={palette.colorNo}>{palette.colorName}</option>
                        ))}
                    </select>
                </div>

                <button onClick={handleAddImage}>추가</button>
            </div>
            <div className='addImg'>
                <h5>현재 추가된 이미지</h5>
                <div>
                    {/* 추가된 이미지 출력 */}
                    {newImage.map((image, index) => (
                        <div key={index}>
                            <img src={image.imgName} alt={`Added ${index}`} />
                            <p>사진용도: {image.imgType}</p>
                            <p>색상: {image.colorNo}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>




            {/* 옵션 체크 박스 */}
            <div className="regi-option-box">
                <div>
                    <h5>인덱스 : </h5>
                    <input type='text'value={index} onChange={e => setIndex(e.target.value)} placeholder='인덱스 경우의 수 입력' />
                </div>
                <div>
                    <h5>색상:</h5>
                    <div>
                        <select name="color" id="colorSelect" value={colorNo} onChange={e => setColorNo(e.target.value)}>
                        <option>색상을 고르세요.</option>
                            {palettes.map(palette => (
                                <option key={palette.colorNo} value={palette.colorNo}>{palette.colorName}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <h5>사이즈:</h5>
                    <div>
                        <select name="size" id="colorSelect" value={size} onChange={e => setSize(e.target.value)}>
                            <option>사이즈를 고르세요.</option>
                            <option value="size-S">S</option>
                            <option value="size-M">M</option>
                            <option value="size-L">L</option>
                            <option value="size-XL">XL</option>
                            <option value="size-XXL">XXL</option>
                        </select>
                        <input type="text" placeholder='상의 기장 수치 입력.' value={top} onChange={e => setTop(e.target.value)}/>
                        <input type="text" placeholder='하의 기장 수치 입력.' value={bottom} onChange={e => setBottom(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <h5>수량:</h5>
                    <div>
                        <input type="text" value={stack} onChange={e => setStack(e.target.value)} placeholder='수량 입력.'/>
                    </div>
                </div>
                {/* 추가 버튼 누를시 가격/색상/사이즈/수량에 기입된 정보만 아래에 regi-stock-box 박스에 추가 됨 */}
                <button type='button' onClick={handleAdd}>추가</button>
            </div>

            {/* 가격 / 색상 / 사이즈 / 수량 정해서 등록 후 list로 보여질 박스*/}
            <div className='regi-stock-box'>
                <h5>해당 상품의 재고 목록</h5>
                <div>
                    {stockList.map((item, index) => (
                        <div key={index}>
                            <p>인덱스: {item.index}, 색상: {item.colorNo}, 사이즈: {item.size}, 수량: {item.stack}, 상의 기장 : {item.top} , 하의 기장 :{item.bottom}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 버튼 박스 */}
            <div className="regi-btn-box">
                <button onClick={handleProductRegistration}>상품 등록</button>
            </div>
        </div>                
    </>
    );


}