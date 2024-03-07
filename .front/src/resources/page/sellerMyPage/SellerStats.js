import axios from "axios";
import React, { useEffect, useState } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function SellerStats() {

    const [Order , setOrder] = useState([]);
    
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

    Object.keys(monthlyTotal).forEach(month => {
        monthlyTotal[month] = {
            '방문자 수': visitorsData[month] || 0,
            '총 판매액수': monthlyTotal[month]
        };
    });

    useEffect(() => {
        fetchOrder();
    }, []);


      const data = Object.keys(monthlyTotal).map(month => {
        return {
          name: month + '월',
          ...monthlyTotal[month]
        };
      });
      
      console.log(data);

    return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="방문자 수" stroke="#8884d8" />
      <Line type="monotone" dataKey="총 판매액수" stroke="#82ca9d" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
    )
}