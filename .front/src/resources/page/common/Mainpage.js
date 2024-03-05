
import React, { Component, useState } from 'react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import "../../css/common/Mainpage.css";
import axios from "axios";
import { useEffect } from "react";

import Leftmenubar from '../../components/Leftmenubar';
import Rightmenubar from '../../components/Rightmenubar';

// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';



export default () => {
  const [prodList, setProdList] = useState([]);

  useEffect(() => {
    axios.get("/product/bestProducts")
    .then((result) => {
      setProdList(result.data);
      console.log(result.data);
    }).catch((error) => {
      console.log(error);
      alert("상품을 불러오는 중 문제가 발생했습니다");
    });
  }, []);
  return (
  <>
      <Leftmenubar /> 
      <Rightmenubar />

    


      <div>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/goods/55939/63e9a881af788.jpg' /></SwiperSlide>
          <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/goods/134915/64e30982eded0.jpg' /></SwiperSlide>
          <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/goods/55939/1677981492_0.gif' /></SwiperSlide>
          <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/goods/134915/1699945833_0.gif' /></SwiperSlide>

        </Swiper>
      </div>

      <div className='container'>
        <h1>베스트 상품</h1>
        
        <div className='clothListBox'>
        {prodList?.length ? prodList.map((prod) =>{
          return (
            <div className='clothList'>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
              <div className='clothContent'>
                <h2>{prod.prodName}</h2>
                <p>{prod.prodCap}</p>
                <p>{prod.price}</p>
              </div>
            </div>
          );
        })  : <div>선택한 상품이 없습니다</div>}
        </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
      </div>

    </>
  );
};