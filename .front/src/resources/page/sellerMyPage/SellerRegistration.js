import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/sellerMyPage/SellerRegistration.css";

export default function SellerRegistration() {

    const [palettes, setPalettes] = useState([]);
    const [images, setImages] = useState([]);
    const [newImage , setNewImage] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    const [price, setPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState('');
    const [stockList, setStockList] = useState([]);

    const [product, setProduct] = useState({
        name: '',
        description: '',
        design: '',
        lineType: '',
        season: ''
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    }

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
            const newImages = [...images, { src: imageUrl.trim(), option: selectedOption, color: selectedColor }];
            console.log("New image: ", newImages[newImages.length - 1]);
            setImages(newImages);
        }
    };

    const handleAddImage = () => {
        // 이미지 URL이 비어 있는지 확인하고, 비어 있으면 추가하지 않음
        if (!images[images.length - 1].src || !selectedOption || !selectedColor) {
            alert('이미지 URL, 색상, 옵션을 모두 선택해주세요.');
            return;
        }
        
        // 새 이미지 추가 처리
        const newImages = [...images];
        setNewImage(newImages);
    };



    const handleAdd = () => {
        if (!price || !discountPrice || !color || !size || !quantity) {
            alert('모든 필드를 채워주세요.');
            return;
        }

        setStockList(prevList => [...prevList, {
            price: price,
            discountPrice: discountPrice,
            color: color,
            size: size,
            quantity: quantity
        }]);

        setPrice('');
        setDiscountPrice('');
        setColor('');
        setSize('');
        setQuantity('');
    };

    


    return (
    <>
            <div className="SellerRegistration">
                <h2>상품 등록</h2>

                <div className="regi-name-box">
                    <input type="text" name="name" placeholder="상품명을 입력해 주세요." onChange={handleChange} />
                    <textarea name="description" placeholder="상품에 대한 설명을 적어 주세요." onChange={handleChange} />
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
                        <input type="text" name="opacity" onChange={handleChange} />
                    </div>
                    <div>
                        <h5>옷감 종류:</h5>
                        <input type="text" name="fabric" onChange={handleChange} />
                    </div>
                    <div>
                        <h5>디자인(패턴):</h5>
                        <input type="text" name="design" onChange={handleChange} />
                    </div>
                    <div>
                        <h5>라인 타입:</h5>
                        <input type="text" name="lineType" onChange={handleChange} />
                    </div>
                    <div>
                        <h5>계절감:</h5>
                        <input type="text" name="season" onChange={handleChange} />
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
                                <img src={image.src} alt={`Uploaded ${index}`} />
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
                            <img src={image.src} alt={`Added ${index}`} />
                            <p>사진용도: {image.option}</p>
                            <p>색상: {image.color}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>


            {/* 상품 가격 박스 */}
            <div className="regi-price-box">
                <div>
                    <h5>판매가(KRW)</h5>
                    <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="KRW" />
                </div>
                <div>
                    <h5>할인가(KRW)</h5>
                    <input type="text" value={discountPrice} onChange={e => setDiscountPrice(e.target.value)} placeholder="KRW" />
                </div>
            </div>

            {/* 옵션 체크 박스 */}
            <div className="regi-option-box">
                <div>
                    <h5>색상:</h5>
                    <div>
                        <select name="color" id="colorSelect" value={color} onChange={e => setColor(e.target.value)}>
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
                        <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder='수량 입력.'/>
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
                            <p>판매가: {item.price}, 할인가: {item.discountPrice}, 색상: {item.color}, 사이즈: {item.size}, 수량: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 버튼 박스 */}
            <div className="regi-btn-box">
                <button>상품 등록</button>
            </div>
        </div>                
    </>
    );


}