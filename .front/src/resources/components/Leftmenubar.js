import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import Leftbar from "../css/components/Leftbar.css"

export default function Leftmenubar() {

    const [toggle, setToggle] = useState(false);
    const [barPosition, setBarPosition] = useState(500);
    const [clickLeftBar, setClickLeftBar] = useState(false);

    const handleScroll = () => {
        // const position = (500 < window.scrollY ? (500 + window.scrollY) : 500);
        const position = (800 > window.scrollY ? window.scrollY - 800 : 150);
        setBarPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);

    const leftmenu = document.querySelector(".leftmain-area");

    //     useEffect(() => {
    //         if (toggle) {
    //         });
    //     }
    //     setClickLeftBar()
    // },[toggle])

    const onIconClick = useCallback(() => {

        // leftmenu.addEventListener('click', function () {
        //     leftmenu.style.width = '50px';
        // })

        setToggle((p) => !p);


    }, []);

    return (
        // <div className="leftmain-area" style={{ top: barPosition }}>

        <div className={toggle ? "faCloseShow" : "faBarsShow"}
            style={{ top: barPosition }}>
            <div>
                <FontAwesomeIcon
                    icon={toggle ? faClose : faBars}
                    onClick={onIconClick}
                />
            </div >

            <div className={toggle ? "leftshow" : "lefthide"}>
                <div className="leftmenu-best">베스트</div>
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
                <div className="leftmenu-acc">ACC</div>
            </div>
        </div>


    )
}