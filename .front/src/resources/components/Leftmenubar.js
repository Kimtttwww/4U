import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import Leftbar from "../css/components/Leftbar.css";
import { mainCateAPI, subCateAPI } from "../page/common/LeftbarAPI";




export default function Leftmenubar() {
    console.log("자바스크립트 시작!");
    const [toggle, setToggle] = useState(false);
    const [mainCateList, setMainCateList] = useState([]);
    const [subCateList, setSubCateList] = useState([]);
    const [rect, setRect] = useState({});
    const [hoverMainCate, setHoverMainCate] = useState(0);
    const [hoverSubCate, setHoverSubCate] = useState(0);


    // leftbar 스크롤감지로 위치이동
    const handleScroll = () => {
        // const position = (500 < window.scrollY ? (500 + window.scrollY) : 500);
        // const position = (800 > window.scrollY ? window.scrollY - 800 : 150);

        const leftBar = document.querySelector('#leftBar');
        if (leftBar != null) {
            leftBar.style.left = "15px";

            if (window.scrollY >= 620) {
                leftBar.style.display = 'block';
                leftBar.style.position = 'fixed';
                leftBar.style.top = `${90 + 15}px`;
            }
            else if (window.scrollY > 0 && window.scrollY < 620) {
                leftBar.style.display = 'block';
                leftBar.style.position = 'relative';
                leftBar.style.top = `649px`;
            }
        }
    };

    const onIconClick = useCallback(() => {
        setToggle((p) => !p);
    }, []);

    // DB에서 CATE_MAIN 가져오기
    const loadMainDb = async () => {
        const mainCate = await mainCateAPI();
        setMainCateList(mainCate);
    };

    // CATE_MAIN이 hover된적이 없으면 API호출하여 DB에서 데이터 가져와서 useState()에 저장하기
    const loadSubDb = async () => {

        if (hoverMainCate == 0)
            return;

        let isExist = [];
        if (subCateList?.length > 0)
            isExist = subCateList?.filter((item) => (item.mainCategory == hoverMainCate));

        if (isExist?.length == 0) {
            const subCate = await subCateAPI({ "cateMain": hoverMainCate });
            const obj = {
                mainCategory: hoverMainCate,
                subCategory: [...subCate],
            }
            setSubCateList([...subCateList, obj]);
        }
    }

    // cateMain에 해당하는 cateSub가져오기
    const subCateHTML = () => {
        if (hoverMainCate > 0 && subCateList?.length > 0) {
            const objArr = subCateList?.filter((sub) => (sub.mainCategory == hoverMainCate));
            if (objArr?.length > 0)
                return objArr[0].subCategory;
        }
        return null;
    }

    const mouseEnterHandler = (mainNo) => {
        setHoverMainCate(mainNo);
    };

    const subMouseEnterHandler = (subNo) => {
        setHoverSubCate(subNo);
    }

    const rectHandler = (idx) => {
        const rect = document.querySelector(`#mainCategory${idx}`).getBoundingClientRect();

        const obj = {
            top: rect.top,
            right: rect.right
        }
        setRect(obj);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        loadMainDb();
        if (hoverMainCate > 0)
            rectHandler(hoverMainCate);
    }, []);

    useEffect(() => {
        if (hoverMainCate > 0) {
            loadSubDb();
        }
    }, [hoverMainCate])


    return (
        <div className="leftCateListAll" >
            <div id="leftBar" className={toggle ? "faBarsShow" : "faBarClose"}>
                <div className="leftBarIcon">
                    <FontAwesomeIcon className="fontIcon"
                        icon={toggle ? faClose : faBars}
                        onClick={onIconClick} />
                </div>

                <div>
                    <div className={toggle ? "leftshow" : "lefthide"}>
                        <div className="leftCateList">
                            <div className="leftCateItem">
                                <div className="mainCateList">
                                    {
                                        mainCateList?.map((main, index) => (
                                            <div className="mainCateList"
                                                key={main.cateMain}
                                                id={`mainCategory${index}`}
                                                onMouseEnter={() => {
                                                    mouseEnterHandler(main.cateMain);
                                                    rectHandler(index);
                                                }}
                                                onMouseLeave={() => {
                                                    if (hoverSubCate == 0) {
                                                        setHoverMainCate(0);
                                                    }
                                                }}>
                                                <div>{main.mainName}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div div className="subCateList"
                                style={{
                                    position: 'fixed', top: `${rect.top}px`, left: `${rect.right - 10}px`
                                }}
                                onMouseLeave={() => {
                                    setHoverSubCate(0);
                                    setHoverMainCate(0);
                                }}>
                                {
                                    subCateHTML()?.map((sub, index) => (
                                        <div className="subListEle" key={index}
                                            onMouseEnter={
                                                () => {
                                                    subMouseEnterHandler(sub.cateSub);
                                                }}>
                                            <a>{sub.subName}</a>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}