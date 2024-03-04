import { useParams } from "react-router"
import Leftmenubar from "../../components/Leftmenubar";
import "../../css/common/Leftbar.css"
import { createContext, useContext, useEffect, useState } from "react";
import { mainCateListAPI } from "../common/LeftbarAPI";
import ProdDetail from "../../modal/ProdDetail";
import { loadMainProdAPI } from "./CateAPI";

const MainContext = createContext();

export default function MainCateList({ mainData }) {

    const { mainNo } = useParams();
    const [mainName, setMainName] = useState();
    const [prodBycateMain, setProdBycateMain] = useState([]);
    const [mainCateList, setMainCateList] = useState([]);
    const [prodList, setProdList] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [product, setProduct] = useState();

    // DB에서 mainCate No에 대한 상품들 가져오기
    const getMainCateNo = async () => {
        const response = await loadMainProdAPI(mainNo);
        setProdBycateMain([...prodBycateMain, ...response]);
    };

    console.log("mainData ??", mainData);
    // DB에서 CATE_MAIN 가져오기
    const loadMainDb = async () => {
        const mainCate = await mainCateListAPI();
        setMainCateList(mainCate);
    };



    useEffect(() => {
        getMainCateNo();
        loadMainDb();
    }, []);

    useEffect(() => {
        const nameBymainNo = mainCateList?.find(item => item.cateMain == mainNo);
        if (nameBymainNo) {
            setMainName(nameBymainNo.mainName);
        };
    }, [mainCateList]);

    return (
        // <MainContext.Provider value={prodBycateMain}>
        <div>
            {mainData}
        </div>

        // </MainContext.Provider>
    );
};
export const useMainCate = () => useContext(MainContext);