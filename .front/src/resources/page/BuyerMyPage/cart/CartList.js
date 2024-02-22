import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios'; // axios 추가
import "../../../css/cart/CartList.css";

export default function CartList() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
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
    }, []);

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        Cookies.set('cart', encodeURIComponent(JSON.stringify(updatedCart)), { expires: 7 });
    };

    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
        setCart(updatedCart);
        Cookies.set('cart', encodeURIComponent(JSON.stringify(updatedCart)), { expires: 7 });
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
        }
        setCart(updatedCart);
        Cookies.set('cart', encodeURIComponent(JSON.stringify(updatedCart)), { expires: 7 });
    };

    const handleOrder = async () => {
        try {
            // 주문 처리 로직 작성
        } catch (error) {
            console.error('주문 처리 오류:', error);
        }
    };

    return (
        <div className="shopping-cart">
            <h2>장바구니</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <span>{index}</span>
                        <img src={item.detail[0].imgName} alt={item.prodName} />
                        <span>{item.detail[0].size}</span>
                        <span>{item.prodName}</span>
                        <span>{item.price}</span>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => increaseQuantity(index)}>+</button>
                        <button onClick={() => decreaseQuantity(index)}>-</button>
                        <button onClick={() => removeFromCart(index)}>삭제</button>
                    </li>
                ))}
            </ul>
            <button id="checkout-btn" onClick={handleOrder}>주문하기</button>
            <p>장바구니 상태: {JSON.stringify(cart)}</p>
        </div>
    );
}
