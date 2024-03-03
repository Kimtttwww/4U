import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/common/Rightbar.css";


export default function Rightmenubar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [cateMain, setCateMain] = useState("");
  const [cateSub, setCateSub] = useState("");
  const [product, setProduct] = useState(null);

  const [selectedSeeThrough, setSelectedSeeThrough] = useState([]);
  const [selectedThickness, setSelectedThickness] = useState([]);
  const [selectedLine, setSelectedLine] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);

  useEffect(() => {
    axios.get("/product/category")
    .then(response => {setProduct(response.data)
      console.log(response.data);}
      )
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

//===================================================

  const handleClickSeeThrough = (value) => {
    if (selectedSeeThrough.includes(value)) {
     
      setSelectedSeeThrough(selectedSeeThrough.filter(item => item !== value));
    } else {
     
      setSelectedSeeThrough([...selectedSeeThrough, value]);
    }
  };

  const handleClickThickness = (value) => {
    if (selectedThickness.includes(value)) {
      setSelectedThickness(selectedThickness.filter(item => item !== value));
    } else {
      setSelectedThickness([...selectedThickness, value]);
    }
  };

  const handleClickLine = (value) => {
    if (selectedLine.includes(value)) {
      setSelectedLine(selectedLine.filter(item => item !== value));
    } else {
      setSelectedLine([...selectedLine, value]);
    }
  };

  const handleColor = (value) => {
    if(selectedColor.includes(value)){
      setSelectedColor(selectedColor.filter(item=> item !== value));
    } else {
      setSelectedColor([...selectedColor, value]);
    }
  }
  //==============================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // 나중
  const handleClick = () => {
    axios.get("/product/category")
    .then(response => setProduct(response.data))

  };

  return (
    <>
      <div
        className={`rightBar ${isSidebarOpen ? "open" : ""}`}
        onClick={handleToggleSidebar}
      >
        <Link>
          <i>&#128269;</i>
        </Link>
      </div>
      <Link>
        <i>&#x1F604;</i>
      </Link>
      <Link onClick={scrollToTop}>
        <i>&#x2B06;</i>
      </Link>
      <Link onClick={scrollToBottom}>
        <i>&#x2B07;</i>
      </Link>
      {isSidebarOpen && (
          <div className="sideBarContent">
          
            {/* <button onClick={handleClick}>cateSub 넘어가지나</button> */}
            <div>
            {product && (

  <div className="productContainer">
    {product.cateMain.map((product) => (
      <div key={product.mainName}>{product.cateMain} {product.mainName}</div>
    ))}
  </div>
)}
            </div>
            
            <div className="cateTitle">
              비침
            </div>
            <a
            className={`cateSeeThrough ${selectedSeeThrough.includes('withTransparency') ? 'active' : ''}`}
            onClick={() => handleClickSeeThrough('withTransparency')}
            >
            비침있음
            </a>
            <a
            className={`cateSeeThrough ${selectedSeeThrough.includes('withoutTransparency') ? 'active' : ''}`}
            onClick={() => handleClickSeeThrough('withoutTransparency')}
            >
            비침없음
            </a>
           
            <div className="cateTitle">
            두께
            </div>
            <a
        className={`cateSeeThrough ${selectedThickness.includes('thin') ? 'active' : ''}`}
        onClick={() => handleClickThickness('thin')}
      >
        얇음
      </a>
      <a
        className={`cateSeeThrough ${selectedThickness.includes('thick') ? 'active' : ''}`}
        onClick={() => handleClickThickness('thick')}
      >
        두꺼움
      </a>

      <div className="cateTitle">
            라인
            </div>
            <a
       className={`cateSeeThrough ${selectedLine.includes('exist') ? 'active' : ''}`}
       onClick={() => handleClickLine('exist')}
     >
       있음
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('notExist') ? 'active' : ''}`}
       onClick={() => handleClickLine('notExist')}
     >
       없음
     </a>

     <div className="cateTitle">
            색상
            </div>
            <a
       className={`cateSeeThrough ${selectedLine.includes('blue') ? 'active' : ''}`}
       onClick={() => handleClickLine('blue')}
     >
       블루
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('red') ? 'active' : ''}`}
       onClick={() => handleClickLine('red')}
     >
       레드
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('green') ? 'active' : ''}`}
       onClick={() => handleClickLine('green')}
     >
       그린
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('black') ? 'active' : ''}`}
       onClick={() => handleClickLine('black')}
     >
       블랙
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('ivory') ? 'active' : ''}`}
       onClick={() => handleClickLine('ivory')}
     >
       아이보리
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('purple') ? 'active' : ''}`}
       onClick={() => handleClickLine('purple')}
     >
       퍼플
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('white') ? 'active' : ''}`}
       onClick={() => handleClickLine('white')}
     >
       화이트
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('khaki') ? 'active' : ''}`}
       onClick={() => handleClickLine('khaki')}
     >
       카키
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('brown') ? 'active' : ''}`}
       onClick={() => handleClickLine('brown')}
     >
       브라운
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('gray') ? 'active' : ''}`}
       onClick={() => handleClickLine('gray')}
     >
       그레이
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('navy') ? 'active' : ''}`}
       onClick={() => handleClickLine('navy')}
     >
       네이비
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('beige') ? 'active' : ''}`}
       onClick={() => handleClickLine('beige')}
     >
       베이지
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('orange') ? 'active' : ''}`}
       onClick={() => handleClickLine('orange')}
     >
       오렌지
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('yellow') ? 'active' : ''}`}
       onClick={() => handleClickLine('yellow')}
     >
       옐로우
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('pink') ? 'active' : ''}`}
       onClick={() => handleClickLine('pink')}
     >
       핑크
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('violet') ? 'active' : ''}`}
       onClick={() => handleClickLine('violet')}
     >
       바이올렛
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('gold') ? 'active' : ''}`}
       onClick={() => handleClickLine('gold')}
     >
       골드
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('silver') ? 'active' : ''}`}
       onClick={() => handleClickLine('silver')}
     >
       실버
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('denim') ? 'active' : ''}`}
       onClick={() => handleClickLine('denim')}
     >
       데님
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('wine') ? 'active' : ''}`}
       onClick={() => handleClickLine('wine')}
     >
       와인
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('coffee') ? 'active' : ''}`}
       onClick={() => handleClickLine('coffee')}
     >
       커피
     </a>
     <a
       className={`cateSeeThrough ${selectedLine.includes('cream ') ? 'active' : ''}`}
       onClick={() => handleClickLine('cream')}
     >
       크림
     </a>

     <a
       className={`cateSeeThrough ${selectedLine.includes('indigoblue') ? 'active' : ''}`}
       onClick={() => handleClickLine('indigoblue')}
     >
       인디고블루
     </a>

     <a
       className={`cateSeeThrough ${selectedLine.includes('skyblue') ? 'active' : ''}`}
       onClick={() => handleClickLine('skyblue')}
     >
       스카이블루
     </a>


        </div>
        

       

  
  )}
  </>
  );
}
