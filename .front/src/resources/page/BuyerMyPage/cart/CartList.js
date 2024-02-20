import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import "../../../css/cart/CartList.css";

export default function CartList() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // 장바구니 데이터 가져오기
        const cartDataString = Cookies.get('cart');
        if (cartDataString) {
            const decodedCartDataString = decodeURIComponent(cartDataString);
            const cartData = JSON.parse(decodedCartDataString);
            setCart(cartData);
        }
    }, []); // 의존성 배열 비워둠: 컴포넌트 마운트 시 한 번만 실행

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        Cookies.set('cart', encodeURIComponent(JSON.stringify(updatedCart)), { expires: 7 });
    };

    return (
        <div className="shopping-cart">
            <h2>장바구니</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <span>{item.prodNo}</span>
                        <button onClick={() => removeFromCart(index)}>삭제</button>
                    </li>
                ))}
            </ul>
            <button id="checkout-btn">주문하기</button>
            <p>장바구니 상태: {JSON.stringify(cart)}</p>
        </div>
    );
}
