
import React, { Component, useContext, useState } from 'react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import "../../css/common/Mainpage.css";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router";
import Leftmenubar from '../../components/Leftmenubar';
import Rightmenubar from '../../components/Rightmenubar';
import ProdDetail from '../../modal/ProdDetail';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { checkDiscount } from './ProdDetailAPI';


const blinkStyle = {
  animation: 'blinker 1s linear infinite'
};

// 베스트
export default () => {
  const [showDetail, setShowDetail] = useState(false);
  const [product, setProduct] = useState(null);
  const [prodList, setProdList] = useState([]);

  const handleProductClick = product => {
    setProduct(product);  // 클릭한 상품으로 product 상태 업데이트
    setShowDetail(true);  // 모달창 띄우기
  };

  // leftBar에서 subCate 선택시 스타일부여
  const subCateClicked = (subNo) => {
  };

  // 베스트
  useEffect(() => {
    axios.get("/product/bestProducts")
      .then((result) => {
        setProdList(result.data);
        // console.log(result.data);
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
        // console.log(result.data);
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
        // console.log(result.data);
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
        // console.log(result.data);
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
        // console.log(result.data);
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
        // console.log(result.data);
      }).catch((error) => {
        console.log(error);
        alert("상품을 불러오는 중 문제가 발생했습니다");
      });
  }, []);

  return (<>
    <Leftmenubar subCateClicked={subCateClicked} />
    <Rightmenubar />

    <div className='Mainpage'>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide className='custom-slide'><img className='bannerImg' src="https://atimg.sonyunara.com/files/attrangs/new_banner/1709541751_0.gif" /></SwiperSlide>
        <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/new_banner/1709165319_0.jpg' /></SwiperSlide>
        <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/new_banner/1709198337_0.jpg' /></SwiperSlide>
        <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/new_banner/1709026227_0.jpg' /></SwiperSlide>
        <SwiperSlide className='custom-slide'><img className='bannerImg' src='https://atimg.sonyunara.com/files/attrangs/new_banner/1709686504_0.jpg' /></SwiperSlide>

      </Swiper>
    </div>
    <br />

    <div className='container'>
      {/* ===========================================베스트 스타일==================================================== */}

      <h2 style={{ textAlign: "center", color: "pink", ...blinkStyle }}>민구가 선점한 제일 핫해!!!</h2>
      <h1 style={{ textAlign: "center", fontFamily: "JalnanGothic" }}>Best Style</h1>

      <div className='clothListBox'>
        {prodList?.length ? prodList.map((prod) => {
          return (
            <div className='clothList' onClick={() => handleProductClick(prod)}>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
              <div className='clothContent'>
                <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold" }}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px" }}>{prod.prodCap}</p>
                <p> 가격: {checkDiscount(prod)}</p>
              </div>
            </div>
          );
        }) : <div>선택한 상품이 없습니다</div>}
      </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
    </div>

    {/* =============================================아우터====================================================== */}

    <div className='container'>
      <h1 style={{ textAlign: "center", fontFamily: "JalnanGothic" }}>Outer</h1>

      <div className='clothListBox'>
        {outerList?.length ? outerList.map((prod) => {
          return (
            <div className='clothList' onClick={() => handleProductClick(prod)}>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
              <div className='clothContent'>
                <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold" }}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px" }}>{prod.prodCap}</p>
                <p> 가격: {checkDiscount(prod)}</p>
              </div>
            </div>
          );
        }) : <div>선택한 상품이 없습니다</div>}
      </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
    </div>


    {/* ===================================================상의============================================================= */}

    <div className='container'>
      <h1 style={{ textAlign: "center", fontFamily: "JalnanGothic" }}>Top</h1>

      <div className='clothListBox'>
        {topList?.length ? topList.map((prod) => {
          return (
            <div className='clothList' onClick={() => handleProductClick(prod)}>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
              <div className='clothContent'>
                <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold" }}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px" }}>{prod.prodCap}</p>
                <p> 가격: {checkDiscount(prod)}</p>
              </div>
            </div>
          );
        }) : <div>선택한 상품이 없습니다</div>}
      </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
    </div>

    {/* ===================================================하의============================================================= */}

    <div className='container'>
      <h1 style={{ textAlign: "center", fontFamily: "JalnanGothic" }}>Bottom</h1>

      <div className='clothListBox'>
        {bottomList?.length ? bottomList.map((prod) => {
          return (
            <div className='clothList' onClick={() => handleProductClick(prod)}>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
              <div className='clothContent'>
                <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold" }}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px" }}>{prod.prodCap}</p>
                <p> 가격: {checkDiscount(prod)}</p>
              </div>
            </div>
          );
        }) : <div>선택한 상품이 없습니다</div>}
      </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
    </div>


    {/* ===================================================언더웨어============================================================= */}
    <div className='container'>
      <h1 style={{ textAlign: "center", fontFamily: "JalnanGothic" }}>UnderWear</h1>

      <div className='clothListBox'>
        {underList?.length ? underList.map((prod) => {
          return (
            <div className='clothList' onClick={() => handleProductClick(prod)}>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
              <div className='clothContent'>
                <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold" }}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px" }}>{prod.prodCap}</p>
                <p> 가격: {checkDiscount(prod)}</p>
              </div>
            </div>
          );
        }) : <div>선택한 상품이 없습니다</div>}
      </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
    </div>


    {/* ===================================================악세서리============================================================= */}
    <div className='container'>
      <h1 style={{ textAlign: "center", fontFamily: "JalnanGothic" }}>Accessories</h1>

      <div className='clothListBox'>
        {accList?.length ? accList.map((prod) => {
          return (
            <div className='clothList' onClick={() => handleProductClick(prod)}>
              <img src={prod.image.find((img) => img.imgType === 1)?.imgName} alt={prod.prodName} className="prod-img" />
              <div className='clothContent'>
                <h2 className='clothName' style={{ fontSize: "19px", fontWeight: "bold" }}>{prod.prodName}</h2>
                <p style={{ fontSize: "12px" }}>{prod.prodCap}</p>
                <p> 가격: {checkDiscount(prod)}</p>
              </div>
            </div>
          );
        }) : <div>선택한 상품이 없습니다</div>}
      </div> {/* 이 부분에 닫는 태그를 추가했습니다. */}
    </div>

    {/* ProdDetail 컴포넌트에 필요한 props 전달 */}
    {showDetail && <ProdDetail showDetail={showDetail} setShowDetail={setShowDetail} product={product} />}

  </>);
};