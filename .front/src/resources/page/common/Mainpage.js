
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

const blinkStyle = {
  animation: 'blinker 1s linear infinite'
};


// 베스트
export default () => {
  const [prodList, setProdList] = useState([]);

  useEffect(() => {
    axios.get("/product/bestProducts", null)
    .then((result) => {
      setProdList(result.data);
      console.log(result.data);
    }).catch((error) => {
      console.log(error);
      alert("상품을 불러오는 중 문제가 발생했습니다");
    });
  }, []);

  // 아우터
    const [outerList, setOuterList] = useState([]);
  
    useEffect(() => {
      axios.get("/product/outerProducts", null)
      .then((result) => {
        setOuterList(result.data);
        console.log(result.data);
      }).catch((error) => {
        console.log(error);
        alert("상품을 불러오는 중 문제가 발생했습니다");
      });
    }, []);

  // 탑
  const [topList, setTopList] = useState([]);
  
  useEffect(() => {
    axios.get("/product/topProducts", null)
    .then((result) => {
      setTopList(result.data);
      console.log(result.data);
    }).catch((error) => {
      console.log(error);
      alert("상품을 불러오는 중 문제가 발생했습니다");
    });
  }, []);

    // 하의
    const [bottomList, setBottomList] = useState([]);
  
    useEffect(() => {
      axios.get("/product/bottomProducts", null)
      .then((result) => {
        setBottomList(result.data);
        console.log(result.data);
      }).catch((error) => {
        console.log(error);
        alert("상품을 불러오는 중 문제가 발생했습니다");
      });
    }, []);

      // 언더웨어
      const [underList, setUnderList] = useState([]);
  
      useEffect(() => {
        axios.get("/product/underProducts", null)
        .then((result) => {
          setUnderList(result.data);
          console.log(result.data);
        }).catch((error) => {
          console.log(error);
          alert("상품을 불러오는 중 문제가 발생했습니다");
        });
      }, []);

         // 악세서리
         const [accList, setAccList] = useState([]);
  
         useEffect(() => {
           axios.get("/product/accProducts", null)
           .then((result) => {
             setAccList(result.data);
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
          <SwiperSlide className='custom-slide'><img className='bannerImg' src= "/photo/main.png" /></SwiperSlide>
          <SwiperSlide className='custom-slide'><img className='bannerImg' src= 'https://atimg.sonyunara.com/files/attrangs/new_banner/1709165319_0.jpg' /></SwiperSlide>
          <SwiperSlide className='custom-slide'><img className='bannerImg' src= 'https://atimg.sonyunara.com/files/attrangs/new_banner/1709198337_0.jpg' /></SwiperSlide>
          <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/new_banner/1709026227_0.jpg' /></SwiperSlide>
          <SwiperSlide className='custom-slide'><img className='bannerImg' src='/photo/itsme.png'/></SwiperSlide>

        </Swiper>
      </div>
      <br/>

      <div className='container'>
        

  {/* ===========================================베스트 스타일==================================================== */}       

        <h2 style= {{textAlign: "center", color: "pink", ...blinkStyle}}>민구가 선점한 제일 핫해!!!</h2>
        <h1 style={{ textAlign: "center", fontFamily: "cursive"}}>Best Style</h1>
        
        <div className='clothListBox'>
        {prodList?.length ? prodList.map((prod) =>{
          return (
            <div className='clothList'>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img"/>
              <div className='clothContent'>
              <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold"}}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px"}}>{prod.prodCap}</p>
                <p> 가격: {prod.price}</p>
              </div>
            </div>
          );
        })  : <div>선택한 상품이 없습니다</div>}
        </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
      </div>

 {/* =============================================아우터====================================================== */}

      <div className='container'>
        <h1 style = {{ textAlign: "center", fontFamily: "cursive"}}>Outer</h1>
        
        <div className='clothListBox'>
        {outerList?.length ? outerList.map((prod) =>{
          return (
            <div className='clothList'>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img"/>
              <div className='clothContent'>
              <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold"}}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px"}}>{prod.prodCap}</p>
                <p> 가격: {prod.price}</p>
              </div>
            </div>
          );
        })  : <div>선택한 상품이 없습니다</div>}
        </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
      </div>


 {/* ===================================================상의============================================================= */}

 <div className='container'>
        <h1 style = {{ textAlign: "center", fontFamily: "cursive"}}>Top</h1>
        
        <div className='clothListBox'>
        {topList?.length ? topList.map((prod) =>{
          return (
            <div className='clothList'>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img"/>
              <div className='clothContent'>
              <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold"}}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px"}}>{prod.prodCap}</p>
                <p> 가격: {prod.price}</p>
              </div>
            </div>
          );
        })  : <div>선택한 상품이 없습니다</div>}
        </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
      </div>

{/* ===================================================하의============================================================= */}

      <div className='container'>
        <h1 style = {{ textAlign: "center", fontFamily: "cursive"}}>Bottom</h1>
        
        <div className='clothListBox'>
        {bottomList?.length ? bottomList.map((prod) =>{
          return (
            <div className='clothList'>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img"/>
              <div className='clothContent'>
              <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold"}}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px"}}>{prod.prodCap}</p>
                <p> 가격: {prod.price}</p>
              </div>
            </div>
          );
        })  : <div>선택한 상품이 없습니다</div>}
        </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
      </div>


{/* ===================================================언더웨어============================================================= */}
      <div className='container'>
        <h1 style = {{ textAlign: "center", fontFamily: "cursive"}}>UnderWear</h1>
        
        <div className='clothListBox'>
        {underList?.length ? underList.map((prod) =>{
          return (
            <div className='clothList'>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img"/>
              <div className='clothContent'>
              <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold"}}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px"}}>{prod.prodCap}</p>
                <p> 가격: {prod.price}</p>
              </div>
            </div>
          );
        })  : <div>선택한 상품이 없습니다</div>}
        </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
      </div>


{/* ===================================================악세서리============================================================= */}
      <div className='container'>
        <h1 style = {{ textAlign: "center", fontFamily: "cursive"}}>Accessories</h1>
        
        <div className='clothListBox'>
        {accList?.length ? accList.map((prod) =>{
          return (
            <div className='clothList'>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img"/>
              <div className='clothContent'>
              <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold"}}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px"}}>{prod.prodCap}</p>
                <p> 가격: {prod.price}</p>
              </div>
            </div>
          );
        })  : <div>선택한 상품이 없습니다</div>}
        </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
      </div>

    </>
  );
};