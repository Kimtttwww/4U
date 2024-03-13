import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios'; // axios 추가
import { useNavigate } from "react-router-dom";
import "../../../css/cart/CartList.css";
import ProdDetail from "../../../modal/ProdDetail";

export default function CartList() {
    
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [product, setProduct] = useState(null);
    
    const navi = useNavigate();

    const handleProductClick = (item) => {
        const clickedProduct = cart.find(cartItem => cartItem.prodNo === item.prodNo);
        setProduct(clickedProduct);
        setShowDetail(true);  // 모달창 표시 설정 추가
    };


    useEffect(() => {
        const cookieValue = Cookies.get('cart'); // 쿠키에서 cart 값 가져오기
        if (cookieValue) {
            const decodedCookieValue = decodeURIComponent(cookieValue); // URL 디코딩
            const parsedCartItems = JSON.parse(decodedCookieValue); // JSON 문자열을 객체로 파싱
            const cartItemsWithCount = parsedCartItems.map(item => ({...item, count: item.count || 1})); // count 속성이 없는 경우 1로 설정
            setCartItems(cartItemsWithCount); // 상태 업데이트
        }

        
        // 장바구니 데이터 가져오기
        const fetchCart = async () => {
            try {
                const response = await axios.get("/product/cart/CartList");
                setCart(response.data);
            } catch (error) {
                console.error("장바구니 데이터를 가져오는 중 오류 발생:", error);
            }
        };
        
        fetchCart();
    }, []); // 마운트 시에만 실행되도록 빈 배열을 전달
    console.log(cartItems);

    const removeFromCart = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        if(updatedCartItems.length === 0) {
            Cookies.remove('cart');
        } else {
            Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });
        }
    };
    
    const increaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].count = (updatedCartItems[index].count || 1) + 1;
        setCartItems(updatedCartItems);
        Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });
    };
    
    const decreaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].count > 1) {
            updatedCartItems[index].count -= 1;
        }
        setCartItems(updatedCartItems);
        Cookies.set('cart', JSON.stringify(updatedCartItems), { expires: 7 });
    };

    const handleOrder = async () => {
        try {
            // 주문 처리 로직 작성
            navi("/order", { cartItems });
        } catch (error) {
            console.error('주문 처리 오류:', error);
        }
    };

    const totalAmount = cartItems.reduce((total, item) => {
        const product = cart.find(cartItem => cartItem.prodNo === item.prodNo);
        if (!product) return total; // 제품을 찾지 못한 경우 현재까지의 합계 반환
    
        const originalPrice = product.price;
        const discountRate = product.discountRate || 0; // 할인율이 없는 경우를 위해 기본값 0 설정
        const count = item.count || 1; // 수량이 지정되지 않은 경우를 위해 기본값 1 설정
        const discountedPrice = originalPrice * (1 - discountRate / 100) * count; // 할인된 가격 계산
    
        return total + discountedPrice; // 전체 합계에 할인된 가격 더하기
    }, 0);

    

    return (
        <>
        <div className="shopping-cart">
            <h2>장바구니</h2>
            <span className="list-totalPrice">총 결제 예상 금액 : {new Intl.NumberFormat('ko-KR').format(Math.floor(totalAmount / 10) * 10).toLocaleString()}원</span>
            <ul>
                {cartItems?.length && cartItems.map((item, index) => (
                    <li key={index}>
                        {/* <span className="list-number">{index}</span> */}
                        <div className="list-img-prodName" onClick={() => handleProductClick(item)}>
                            <img 
                                src={
                                    cart.find(cartItem => cartItem.prodNo === item.prodNo)
                                        ?.image.find(imageItem => imageItem.colorName === item.colorName)
                                        ?.imgName
                                } 
                                alt={item.index} 
                            />
                            
                            {/* cart에서 제품 찾기 */}
                            {cart.find(cartItem => cartItem.prodNo === item.prodNo) && (
                                <>
                                    <span className="list-prodName">{cart.find(cartItem => cartItem.prodNo === item.prodNo).prodName}</span>
                                    
                                </>
                            )}
                        </div>
                        <span className="list-price">
                            {(() => {
                            const product = cart.find(cartItem => cartItem.prodNo === item.prodNo);
                            const originalPrice = product?.price;
                            const count = item.count || 1;
                            const discountRate = product?.discountRate || 0;
                            const discountedPrice = originalPrice * (1 - discountRate / 100) * count;
                            
                            return (Math.floor(discountedPrice / 10) * 10).toLocaleString();
                            })()}원
                        </span>
                        <span className="list-size">{item.size}</span>
                        <span className="list-color">{item.colorName}</span>
                        <span className="list-count">{item.count || 1}</span>
                        <div className="list-count-btn">
                            <button onClick={() => increaseQuantity(index)}>+</button>
                            <button onClick={() => decreaseQuantity(index)}>-</button>
                        </div>
                        <button className="list-delete" onClick={() => removeFromCart(index)}>삭제</button>
                        </li>

                        ))}
                </ul>
                <button id="checkout-btn" onClick={handleOrder}>주문하기</button>
            {/* <p>장바구니 쿠키 상태: {JSON.stringify(cartItems)}</p>
            <p>장바구니 상태 : {JSON.stringify(cart)}</p> */}
        </div>

     {/* ProdDetail 컴포넌트에 필요한 props 전달 */}
     {showDetail && <ProdDetail showDetail={showDetail} setShowDetail={setShowDetail} product={product} />}
     </>
    );
    

}
