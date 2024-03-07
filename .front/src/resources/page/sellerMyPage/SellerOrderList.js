import axios from "axios";
import "../../css/sellerMyPage/SellerOrderList.css";
import { useEffect, useState } from "react";

export default function SellerOrderList (){

    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchOrder = async () => {
        try {
            const response = await axios.get('/order/sellerAllOrder');
            setOrder(response.data);
        } catch (error) {
            console.error('오더 정보 에러:', error);
        }
    };

    console.log(order);

    useEffect(() => {
        fetchOrder();
    }, [])

    useEffect(() => {
		calculateTotalPrice(order);
	}, [order]);

	const calculateTotalPrice = (orderList) => {
		let total = 0;
		orderList.forEach((order) => {
			total += order.price * order.count;
		});
		setTotalPrice(total);
	};

    

    return (
            <div className="SellerOrderList">
                <div>
                    <h2>최근 주문 내역</h2>
                </div>
                <article>
                    <table>
                        <thead>
                            <tr>
                                <th>주문번호</th>
                                <th>주문일</th>
                                <th>상품명</th>
                                <th>옵션</th>
                                <th>주문수량</th>
                                <th>구매자명</th>
                            </tr>
                        </thead>
                        <tbody>
                        {order.map((order) => (
                        <tr>
                            <td>{order.orderNo}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.prodName}</td>
                            <td>{order.details}</td>
                            <td>{order.count}</td>
                            <td>{order.orderName}</td>
                        </tr>
                        ))}
                            <tr>
                                <td colSpan={5}></td>
                            </tr>
                            <tr className="order-total">
                                <td>주문 총 수량</td>
                                <td colSpan={2}>{order.length}개</td>
                                <td>주문 총 금액</td>
                                <td colSpan={2}>\{totalPrice.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </div>
    )
}