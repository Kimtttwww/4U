import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios'; // axios 추가
import { useNavigate } from "react-router-dom";
import "../../../css/cart/CartList.css";

export default function CartList() {
    
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const history = useNavigate();


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
            history.push("/order", { cartItems });
        } catch (error) {
            console.error('주문 처리 오류:', error);
        }
    };

    const totalAmount = cartItems.reduce((total, item) => {
        const product = cart.find(cartItem => cartItem.prodNo === item.prodNo);
        return total + (product?.price * item.count);
    }, 0);

    return (
        <div className="shopping-cart">
            <h2>장바구니</h2>
            <span>총 결제 예상 금액 : {new Intl.NumberFormat('ko-KR').format(totalAmount)}원</span>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        <span>{index}</span>
                        <img 
                            src={
                                cart.find(cartItem => cartItem.prodNo === item.prodNo)
                                    ?.image.find(imageItem => imageItem.colorName === item.colorName)
                                    ?.imgName
                            } 
                            alt={item.index} 
                        />
                        <span>사이즈 : {item.size}</span>
                        <span>상품 색상 : {item.colorName}</span>
                        {/* cart에서 제품 찾기 */}
                        {cart.find(cartItem => cartItem.prodNo === item.prodNo) && (
                            <>
                                <span>상품 명 : {cart.find(cartItem => cartItem.prodNo === item.prodNo).prodName}</span>
                                <span>
                                    {
                                        new Intl.NumberFormat('ko-KR').format(
                                            cart.find(cartItem => cartItem.prodNo === item.prodNo).price * item.count || 1
                                        )
                                    }원
                                </span>
                            </>
                        )}
                        <span>상품 수량 : {item.count || 1}</span>
                        <button onClick={() => increaseQuantity(index)}>+</button>
                        <button onClick={() => decreaseQuantity(index)}>-</button>
                        <button onClick={() => removeFromCart(index)}>삭제</button>
                    </li>
                ))}
            </ul>
            <button id="checkout-btn" onClick={handleOrder}>주문하기</button>
            <p>장바구니 쿠키 상태: {JSON.stringify(cartItems)}</p>
            <p>장바구니 상태 : {JSON.stringify(cart)}</p>
        </div>
    );
    

}
