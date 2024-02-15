import React, { Component, useState } from 'react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import "../css/Mainpage.css";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default () => {

  return (
    <>



      <div>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/goods/55939/63e9a881af788.jpg' /></SwiperSlide>
          <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/goods/134915/64e30982eded0.jpg' /></SwiperSlide>
          <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/goods/55939/1677981492_0.gif' /></SwiperSlide>
          <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/goods/134915/1699945833_0.gif' /></SwiperSlide>

        </Swiper>
      </div>

      <div className='container'>
        {/*==============================================================================================================================================*/}


        {/* <div className='adTop'>
     <div className='adTop-left'>
          <img className = 'adTopImg' src='https://atimg.sonyunara.com/files/attrangs/goods/157385/65979a5371357.jpg'/>
     </div>
     <div className='adTop-right'>
          2024 Spring 추천@ <br/> 데이트룩으로 좋아요~
     </div>
    </div>


    <div className='adTop'>
      <div className='adTop-leftTwo'>
      데일리룩 찾으세요? <br/>
      2024 Spring 베스트 추천해요
      </div>
      <div className='adTop-rightTwo'>
      <img className = 'adTopImg' src='https://atimg.sonyunara.com/files/attrangs/goods/158300/65bc5879cc42c.jpg'/>
      </div>
    </div> */}

        {/*==============================================================================================================================================*/}


        <h1>베스트 상품</h1>
        <div className='clothListBox'>

          <div className='clothList'>
            <img className='listImg' src='https://atimg.sonyunara.com/files/attrangs/goods/36694/632ad827b1ce0.jpg' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>


          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>


          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>



          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>


          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>


          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>

        </div>

        <h1>아우터</h1>
        <div className='clothListBox'>

          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>

          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>

          </div>
          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>

          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>

          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>

          <div className='clothList'>
            <img src='...' alt='제품 이미지' />
            <div className='clothContent'>
              <h2>상품 제목</h2>
              <p>상품 설명이나 가격 등의 내용</p>
              <p>가격: ₩100,000</p>
            </div>
          </div>

        </div>

      </div>

    </>
  );
};

