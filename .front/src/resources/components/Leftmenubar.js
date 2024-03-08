import { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import Leftbar from "../css/common/Leftbar.css";
import { mainCateListAPI, subCateListAPI } from "../page/common/LeftbarAPI";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProdList from "../page/product/ProdList";


export default function Leftmenubar({ subCateClicked }) {

    const navi = useNavigate();
    const { mainNo, subNo } = useParams();
    const [toggle, setToggle] = useState(false);
    const [mainCateList, setMainCateList] = useState([]);
    const [subCateList, setSubCateList] = useState([]);
    const [rect, setRect] = useState({});
    const [hoverMainCate, setHoverMainCate] = useState(0);
    const [hoverSubCate, setHoverSubCate] = useState(0);




    // leftbar 스크롤감지로 위치이동
    const handleScroll = () => {
        const leftBar = document.querySelector('#leftBar');
        const bannerImg = document.querySelector('.swiper-wrapper');
        if (leftBar != null) {
            leftBar.style.left = "15px";
            setHoverMainCate(0);
            if (bannerImg != null) {
                if (window.scrollY >= 620) {
                    leftBar.style.display = 'block';
                    leftBar.style.position = 'fixed';
                    leftBar.style.top = `${140 + 15}px`;
                }
                else if (window.scrollY >= 0 && window.scrollY < 620) {
                    leftBar.style.display = 'block';
                    leftBar.style.position = 'relative';
                    leftBar.style.top = `649px`;
                }
            }
            else {
                leftBar.style.display = 'block';
                leftBar.style.position = 'fixed';
                leftBar.style.top = `${140 + 15}px`;
            }
        }
    };

    // 서브카테 위치조정
    const rectHandler = (idx) => {
        const rect = document.querySelector(`#mainCategory${idx}`).getBoundingClientRect();
        const obj = {
            top: rect.top,
            right: rect.right
        }
        setRect(obj);
    };

    const onIconClick = useCallback(() => {
        setToggle((p) => !p);
    }, []);

    // DB에서 CATE_MAIN 가져오기
    const loadMainDb = async () => {
        const mainCate = await mainCateListAPI();
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
            const subCate = await subCateListAPI(hoverMainCate);
            const obj = {
                mainCategory: hoverMainCate,
                subCategory: [...subCate],
            }
            setSubCateList([...subCateList, obj]);
        };
    };

    // cateMain No에 해당하는 cateSub가져오기
    const subCateHTML = () => {
        if (hoverMainCate > 0 && subCateList?.length > 0) {
            const objArr = subCateList?.filter((sub) => (sub.mainCategory == hoverMainCate));
            if (objArr?.length > 0)
                return objArr[0].subCategory;
        };
        return null;
    };


    const mouseEnterHandler = (mainNo) => {
        setHoverMainCate(mainNo);
    };

    const subMouseEnterHandler = (subNo) => {
        setHoverSubCate(subNo);
    };

    const subCateClickHandler = (subNo) => {
        return subCateClicked(subNo);
        // return subNo;
    };



    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        const leftBar = document.querySelector("#leftBar");
        const bannerImg = document.querySelector('.swiper-wrapper');
        if (bannerImg == null && leftBar != null) {
            leftBar.style.left = "15px";
            leftBar.style.display = 'block';
            leftBar.style.position = 'fixed';
            leftBar.style.top = `${140 + 15}px`;
        }
        loadMainDb();
        if (hoverMainCate > 0)
            rectHandler(hoverMainCate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (hoverMainCate > 0) {
            loadSubDb();
        };
    }, [hoverMainCate, hoverSubCate]);




    return (
        <>
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
                                        <p>4U</p>
                                        {
                                            mainCateList?.length && mainCateList.map((main, index) => (
                                                <div className="mainCateListItem"
                                                    key={main.cateMain}
                                                    id={`mainCategory${index}`}
                                                    onMouseEnter={() => {
                                                        mouseEnterHandler(main.cateMain);
                                                        rectHandler(index);
                                                    }}
                                                >
                                                    <Link to={`/product/list/${main.cateMain}`}
                                                        style={{
                                                            color: hoverMainCate == main.cateMain ? 'blue' : 'black',
                                                            fontWeight: hoverMainCate == main.cateMain ? 'bold' : '200'
                                                        }}>
                                                        {main.mainName}
                                                        {/* <a href={`/product/list/${main.cateMain}`}>{main.mainName}</a> */}
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div div className="subCateList"
                                    style={{ // left: `${rect.right}px`
                                        position: 'fixed', top: `${rect.top}px`, left: "120px"
                                    }}
                                    onMouseLeave={() => {
                                        setHoverSubCate(0);
                                        setHoverMainCate(0);
                                    }}>
                                    {
                                        subCateHTML()?.map((sub, index) => (
                                            <div className="subListEle" key={index}
                                                onClick={() => subCateClickHandler(sub.cateSub)}
                                                onMouseEnter={() => { subMouseEnterHandler(sub.cateSub); }}
                                                style={{
                                                    color: hoverSubCate === sub.cateSub ? 'red' : 'yellow',
                                                    fontWeight: hoverSubCate === sub.cateSub ? 'bold' : '200'
                                                }}
                                            >
                                                <Link to={`/product/list/${hoverMainCate}/${sub.cateSub}`} >{sub.subName}</Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}