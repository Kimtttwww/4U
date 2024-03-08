import axios from "axios";
import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import '../../css/sellerMyPage/SellerStats.css'

export default function SellerStats() {

    const [Order , setOrder] = useState([]);
    const [members, setMembers] = useState([]); // 멤버 정보를 저장할 상태
    
    const visitorsData = {
        '01': 4000,
        '02': 3000,
        '03': 2000,
        '04': 2780,
        // ...
      };

    const fetchOrder = async () => {
        try {
            const response = await axios.get('/order/selectAllOrder');
            setOrder(response.data);
        } catch (error) {
            console.error('오더 정보 에러:', error);
        }
    };


    let monthlyTotal = Order.reduce((acc, order) => {
        let month = order.orderDate.split("-")[1];
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += order.totalPrice;
        return acc;
      }, {});

      let monthlyMembers = members.reduce((acc, member) => {
        let month = new Date(member.createDate).getMonth() + 1; // 월 정보를 얻습니다.
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += 1; // 해당 월에 가입한 멤버 수를 증가시킵니다.
        return acc;
      }, {});

    Object.keys(monthlyTotal).forEach(month => {
        monthlyTotal[month] = {
            '방문자 수': visitorsData[month] || 0,
            '총 판매액수': monthlyTotal[month]
        };
    });

    Object.keys(monthlyMembers).forEach(month => {
      if (!monthlyTotal[month]) {
        monthlyTotal[month] = {};
      }
      monthlyTotal[month]['멤버 수'] = monthlyMembers[month];
    });




      const data = Object.keys(monthlyTotal).map(month => {
        return {
          name: month + '월',
          ...monthlyTotal[month]
        };
      });

      const fetchMembers = async () => {
        try {
            const response = await axios.get('/member/selectAllMember');
            setMembers(response.data);
        } catch (error) {
            console.error('멤버 정보 가져오기 에러', error);
        }
    };

    useEffect(() => {
      fetchOrder();
      fetchMembers();
  }, []);

    return (
      <>
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Line yAxisId="left" type="monotone" dataKey="총 판매액수" stroke="#82ca9d" />
      <Line yAxisId="right" type="monotone" dataKey="멤버 수" stroke="#FF0000" />
    </LineChart>

    <LineChart width={600} height={300} data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="방문자 수" stroke="#8884d8" />
    </LineChart>
      </>
    )
}