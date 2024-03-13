import axios from "axios";
import "../../css/sellerMyPage/SellerOrderList.css";
import { useEffect, useState } from "react";

export default function SellerOrderList() {
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // 페이징 처리를 위한 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10); // 페이지당 주문 수, 필요에 따라 조정 가능
  
  const fetchOrder = async () => {
    try {
      const response = await axios.get('/order/sellerAllOrder');
      setOrder(response.data);
    } catch (error) {
      console.error('오더 정보 에러:', error);
    }
  };

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

  // 현재 페이지에 표시할 주문 목록 계산
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = order.slice(indexOfFirstOrder, indexOfLastOrder);

  // 페이지 번호를 클릭했을 때 실행될 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <th>주문수량</th>
              <th>구매자명</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr key={index}>
                <td>{order.orderNo}</td>
                <td>{order.orderDate}</td>
                <td>{order.prodName}</td>
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
      {/* 페이지네이션 UI */}
      <nav>
    <ul className="pagination">
        {/* 이전 버튼 */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <a onClick={() => currentPage > 1 && paginate(currentPage - 1)} className="page-link">
            이전
            </a>
        </li>

        {/* 페이지 번호들 */}
        {Array.from({ length: Math.ceil(order.length / ordersPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <a onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
            </a>
            </li>
        ))}

        {/* 다음 버튼 */}
        <li className={`page-item ${currentPage === Math.ceil(order.length / ordersPerPage) ? 'disabled' : ''}`}>
            <a onClick={() => currentPage < Math.ceil(order.length / ordersPerPage) && paginate(currentPage + 1)} className="page-link">
            다음
            </a>
        </li>
    </ul>
      </nav>
    </div>
  )
}
