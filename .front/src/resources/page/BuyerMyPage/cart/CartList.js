import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import "../../../css/cart/CartList.css"

export default function CartList() {

   // 장바구니 상태
const [cart, setCart] = useState([]);

// 쿠키에서 장바구니 데이터 읽기
useEffect(() => {
  const cartDataString = Cookies.get('cart');
  if (cartDataString) {
    const cartData = JSON.parse(cartDataString);
    setCart(cartData);
  }
}, []);

// 장바구니에 상품 추가
const addToCart = (item) => {
  const updatedCart = [...cart, item];
  setCart(updatedCart);
  Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 }); // 7일 동안 유지되는 쿠키 설정
};
  
// 장바구니에서 상품 제거
const removeFromCart = (index) => {
  const updatedCart = cart.filter((_, i) => i !== index);
  setCart(updatedCart);
  Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
};

  return (

  <div className="shopping-cart">
    <h2>장바구니</h2>
    <ul>
      {cart.map((item, index) => (
        <li key={index}>
          <span>{item.name}</span>
          <button onClick={() => removeFromCart(index)}>삭제</button>
        </li>
      ))}
    </ul>
    <button onClick={() => addToCart({ name: '새 상품', price: 10 })}>
      장바구니에 상품 추가
    </button>
    <button id="checkout-btn">주문하기</button>
  </div>

  );
}
