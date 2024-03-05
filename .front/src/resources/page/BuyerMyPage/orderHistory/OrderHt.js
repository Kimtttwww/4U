import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../css/order/OrderHt.css";
import Cookies from "js-cookie";

export default function OrderHt() {
	 const [orders, setOrders] = useState([]);
	 const [ogOrders, setOgOrders] = useState([]);
	 const [totalPrice, setTotalPrice] = useState(0);
	 const [showOrders, setShowOrders] = useState(false); // orders를 보여줄지 여부를 관리하는 상태
	 const [selectedOrder, setSelectedOrder] = useState(null); // 선택된 주문 번호를 저장하는 상태

	 const [loginMember, setLoginMember] = useState(Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null);


	useEffect(() => {
		axios.get(`http://localhost:3000/order/history?memberNo=${loginMember.memberNo}`)
		.then(response => {
			setOrders(response.data);
		}).catch(err => console.log(err));
	}, [loginMember]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
					const response = await axios.get(`http://localhost:3000/order/oghistory?memberNo=${loginMember.memberNo}`);
					setOgOrders(response.data);
			} catch (error) {
					console.error('Error fetching orders:', error);
			}
		};

		fetchOrders();
	}, [loginMember]);

	useEffect(() => {
		calculateTotalPrice(orders);
	}, [orders]);

	const calculateTotalPrice = (orderList) => {
		let total = 0;
		orderList.forEach((order) => {
			total += order.price * order.count;
		});
		setTotalPrice(total);
	};

	const toggleShowOrders = (orderNo) => {
		setShowOrders(!showOrders); // 상태를 반전시킴
		setSelectedOrder(orderNo); // 선택된 주문 번호 설정
	};

	 return (
		  <>
				<div className="orderContainer">
					 <th className="totalOrder">총 주문 수량 : {orders.length}</th>
					 <th className="totalPrice">총 구매 금액 : {totalPrice.toLocaleString()}원</th>
					 <table className="orderTable">
						  <thead className="orderHead">
								<tr>
									 <th>주문 번호</th>
									 <th>주문일</th>
									 <th>주문자</th>
									 <th>주문수량</th>
									 <th style={{ width: "300px" }}>주문금액</th>
								</tr>
						  </thead>
						  <tbody className="orderBody">
								{ogOrders.map((ogOrder) => (
									 <React.Fragment key={ogOrder.orderNo}>
									 <tr onClick={() => toggleShowOrders(ogOrder.orderNo)}>
										  <td>{ogOrder.orderNo}</td>
										  <td>{ogOrder.orderName}</td>
										  <td>{ogOrder.orderDate}</td>
										  <td>{ogOrder.totalCount}</td>
										  <td>{ogOrder.totalPrice}</td>
									 </tr>
									 {showOrders && selectedOrder === ogOrder.orderNo && (
										  <tr>
										  <td colSpan="5">
												{orders.filter((order) => order.orderNo === ogOrder.orderNo).map((filteredOrder) => (
													 <div className="orderDetailContainer" key={filteredOrder.orderNo}>
														  <p>주문번호 : {filteredOrder.orderNo}</p>
														  <p>주문자명 : {filteredOrder.orderName}</p>
														  <p>수신자 : {filteredOrder.receiver}</p>
														  <p>수신자 연락처 : {filteredOrder.receivePhone}</p>
														  <p>상품 명 : {filteredOrder.prodName}</p>
														  <p>수량 : {filteredOrder.count}</p>
														  <p>수령지 : {filteredOrder.address}</p>
														  <p>수령지 상세 : {filteredOrder.addressDetail}</p>
														  <p>우편번호 : {filteredOrder.zipCode}</p>
														  <p>배송메모 : {filteredOrder.message}</p>
														  <p>사용한 쿠폰 : {filteredOrder.couponNo}</p>
														  <p>사용한 포인트 : {filteredOrder.point}</p>
														  <p>결제 금액 : {filteredOrder.price}</p>
														  <p>결제 수단 : {filteredOrder.payment}</p>
													 </div>
												))}
										  </td>
										  </tr>
									 )}
									 </React.Fragment>
								))}
								</tbody>
					 </table>
				</div>
		  </>
	 );
}
