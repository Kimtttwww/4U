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
              const response = await axios.get("/cart/CartList");
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

    const handleOrder = async () => {
        try {
            // 여기서 주문을 처리하고자 하는 로직을 작성
            // 예를 들어, 주문 정보를 서버로 전송하는 요청을 보낼 수 있습니다.
            const response = await axios.get('주문을 처리하는 엔드포인트 URL', { cart });
            console.log(response.data); // 주문 처리 결과를 콘솔에 출력하거나 상태 업데이트 등의 작업 수행
            // 주문이 성공적으로 처리되면 장바구니를 초기화하거나 사용자에게 알림을 표시할 수 있습니다.
            setCart([]);
            Cookies.remove('cart'); // 장바구니 쿠키 삭제
        } catch (error) {
            console.error('주문 처리 오류:', error);
            // 주문 처리 중 오류가 발생하면 사용자에게 오류 메시지를 표시할 수 있습니다.
        }
    };

    return (
        <div className="shopping-cart">
            <h2>장바구니</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <span>{item.prodNo}</span>
                        <span>{item.prodName}</span>
                        <button onClick={() => removeFromCart(index)}>삭제</button>
                    </li>
                ))}
            </ul>
            <button id="checkout-btn" onClick={handleOrder}>주문하기</button>
            <p>장바구니 상태: {JSON.stringify(cart)}</p>
        </div>
    );
}
