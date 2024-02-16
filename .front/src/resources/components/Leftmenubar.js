import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import Leftbar from "../css/components/Leftbar.css";
import { mainCateAPI, subCateAPI } from "../page/common/LeftbarAPI";

export default function Leftmenubar() {

    const [toggle, setToggle] = useState(false);
    const [barPosition, setBarPosition] = useState(500);
    const [mainCateList, setMainCateList] = useState([]);
    const [subCateList, setSubCateList] = useState([]);
    const [hoverdMenu, sethoverdMenu] = useState(null);

    // leftbar 스크롤감지로 위치이동
    const handleScroll = () => {
        // const position = (500 < window.scrollY ? (500 + window.scrollY) : 500);
        const position = (800 > window.scrollY ? window.scrollY - 800 : 150);
        setBarPosition(position);
    };

    // DB에서 CATE_MAIN 가져오기
    const loadMainDb = async () => {
        const mainCate = await mainCateAPI();
        // console.log(mainCate);
        setMainCateList(mainCate);
    };

    // console.log(subCateList);

    const mouseEnterHandler = (mainNo) => {

        console.log(mainNo);

        // DB에서 CATE_SUB 가져오기
        const loadSubDb = async () => {
            let tempArr = [];
            for (const item of mainCateList) {
                const subCate = await subCateAPI({ "cateMain": mainNo });
                tempArr.push(subCate);
            }
            setSubCateList([...tempArr]);

        };


        // setIsHoverd(mainNo);
    }
    // const mouseLeaveHandler = () => {
    //     setIsHoverd(null);
    // }


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        loadMainDb();
    }, []);

    // useEffect(() => {
    //     if (mainCateList) {
    //         loadSubDb();
    //     }
    // }, [mainCateList]);

    const leftmenu = document.querySelector(".leftmain-area");



    const onIconClick = useCallback(() => {
        setToggle((p) => !p);
    }, []);






    return (
        // <div className="leftmain-area" style={{ top: barPosition }}>

        <div className={toggle ? "faCloseShow" : "faBarsShow"}
            style={{ top: barPosition }}>
            <div>
                <FontAwesomeIcon
                    icon={toggle ? faClose : faBars}
                    onClick={onIconClick} />
            </div >
            <div className={toggle ? "leftshow" : "lefthide"}>
                {mainCateList?.map((main) => (
                    <div key={main.cateMain} onMouseEnter={() => mouseEnterHandler(main.cateMain)}>
                        {main.mainName}

                        {/* {mainCateList ? console.log(mainIndex) : null} */}
                    </div>
                ))}
            </div>
            <div>
                {subCateList?.map((sub) => (
                    <div key={sub.cateMain}>{sub.subName}

                        {/* {subCateList ? console.log(subCateList) : null} */}
                    </div>

                ))}
            </div>
            {/* <div className="leftmenu-best">베스트</div>
                <div className="leftmenu-new">NEW</div>

                <div className="outer">
                    <span className="leftmenu-outer">아우터</span>
                    <div className="leftsub-outer">
                        <div>패딩</div>
                        <div>코트</div>
                        <div>자켓</div>
                    </div>
                </div>
                <div className="top">
                    <div className="leftmenu-top">상의</div>
                    <div className="leftsub-top">
                        <div>원피스</div>
                        <div>맨투맨</div>
                        <div>니트</div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="leftmenu-bottom">하의</div>
                    <div className="leftsub-bottom">
                        <div>청바지</div>
                        <div>스커트</div>
                        <div>밴딩</div>
                    </div>
                </div>
                <div className="leftmenu-underwear">언더웨어</div>
                <div className="leftmenu-acc">ACC</div> */}

        </div>


    )
}