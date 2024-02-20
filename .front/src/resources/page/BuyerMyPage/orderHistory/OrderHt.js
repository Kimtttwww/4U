import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/order/OrderHt.css";


export default function OrderHt() {
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0); // 총 구매 금액 상태 추가

    const totalOrders = orders.length;

    useEffect(() => {
        axios
            .get("http://localhost:3000/order/history")
            .then(
                (response) => {
                    console.log(response)
                    setOrders(response.data); //채팅방 목록페이지 조회
                }
            )
            .catch((err) => console.log(err))
    }, [])

     // 총 구매 금액을 계산하는 함수
     const calculateTotalPrice = (orderList) => {
        let total = 0;
        orderList.forEach((order) => {
            total += order.price; // 각 주문의 상품 금액을 더함
        });
        setTotalPrice(total); // 총 구매 금액 상태 업데이트
    };

    return (
        <>
        <div className="orderContainer">
            <th className="totalOrder">총 주문 수량 : {totalOrders}</th>
            <th className="totalPrice">총 구매 금액 : {totalPrice}원</th> {/* 총 구매 금액 표시 */}
            <table className="orderTable">
                <thead className="orderHead">
                    <tr>
                        <th>주문 번호</th>
                        <th>상품명</th>
                        <th>주문일</th>
                        <th>주문자</th>
                        <th style={{ width: "300px" }}>상품금액</th>
                    </tr>
                </thead>
                <tbody className="orderBody">
                    {orders.map((order) => (
                        <tr key={order.orderNo}>
                            <td>{order.orderNo}</td>
                            <td>{order.prodName}</td>
                            <td>{order.orderDate}</td>
                            <td>{order.orderName}</td>
                            <td>{order.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}
