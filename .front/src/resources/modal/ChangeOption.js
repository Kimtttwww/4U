import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { loadProdDetilAPI } from '../page/order/OrderAPI';
import { object } from 'prop-types';


export default function ChangeOption({ show, closeModal, orderProd }) {

    const [dbResponse, setDbResponse] = useState([]);
    const [checkColor, setCheckColor] = useState();
    const [checkSize, setCheckSize] = useState();
    const [checkIndex, setCheckIndex] = useState();
    const [prodColor, setProdColor] = useState([]);
    const [prodSize, setProdSize] = useState([]);

    // let prodNo = orderProd.prodNo;
    const colorHandler = (e) => {
        const newColor = e.target.value;
        setCheckColor(e.target.value);
    };

    const sizeHandler = (e) => {
        if (e.target.value == "none")
            return;
        setCheckSize(e.target.value)
    };

    // 최종 마무리 변경 !! 버튼까지 눌러서 변경 완벽하게 끝남; 여기서 변경된 변수들로 인덱스 찾아서 넣어놔야 함;
    const optionChange = (e) => {
        orderProd.colorName = checkColor;
        orderProd.size = checkSize;

        closeModal(false);
    };

    // DB에서 prodNo의 상품데이터 가져오기
    const getDBData = async (data) => {
        if (Object.keys(orderProd).length > 0) {
            const response = await loadProdDetilAPI(orderProd.prodNo);
            setDbResponse([...response]);
        }
    };

    // 옵션변경 prodNo의 모든 colorName 가져오기(중복제거)
    const getProdColor = () => {
        setProdColor(Array.from(new Set(dbResponse?.map((obj) => obj.colorName))));
    };

    // 선택한 컬러에 맞는 사이즈 가져오기
    const getProdSizeFromColor = async (data) => {
        setProdSize(dbResponse?.filter((obj) => obj.colorName == checkColor));
    };

    // 선택한 색상/사이즈에 맞는 인덱스 가져오기
    const getProdIndex = (key) => {
        let index = null;
        for (let item of dbResponse) {
            if (item.colorName == checkColor && item.size == checkSize) {
                index = item[key];
                break;
            }
        }
        orderProd.index = index;
    };


    useEffect(() => {
        if (!orderProd || orderProd == undefined) {
            console.log("option이 비어있어요!!!");
        }
        getDBData();
    }, [orderProd]);

    useEffect(() => {
        if (dbResponse?.length > 0) {
            // 데이터를 가지고 왔을때.. 필요한 컬러를 가져온다..'
            getProdColor();

            // 기본 값 컬러 가져와 주기..
            setCheckColor(orderProd.colorName);
            setCheckSize(orderProd.size);
        };
    }, [dbResponse]);

    useEffect(() => {
        if (checkColor) {
            // 컬러가 선택이 되면 checkColor가 바뀌고 checkColor의 사이즈를 가져온다.
            // checkColor가 바뀌면 prodNo에 맞는 color로 prodColor 바꿔준다
            getProdSizeFromColor();
        };
    }, [checkColor]);

    useEffect(() => {
        if (checkSize) {
            getProdIndex('index');
        };
    }, [checkColor, checkSize]);



    return (
        <Modal show={show}  >
            <div id="optionChangeModal" >
                <div >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5"
                                id="staticBackdropLabel">옵션변경</h3>
                        </div>
                        <div className="modal-body optionBody" >
                            <div className="form-check-1">
                                <span>선택한 색상 : {orderProd.colorName}</span>
                            </div>
                            <div className="form-check-2">
                                <span>변경할 색상</span>
                                {
                                    prodColor?.map((color, index) => (
                                        <span key={index}>
                                            <input type="radio" name="changeColor"
                                                onChange={colorHandler}
                                                value={color}
                                                checked={color == checkColor} // 선택한 색상과 일치하는지 확인
                                            />
                                            {color}
                                        </span>
                                    ))
                                }

                            </div>
                            <hr />
                            <div className="form-check-3">
                                <span>선택한 사이즈 : {orderProd.size}</span>
                            </div>
                            <div className="form-check-4">
                                <span>변경할 사이즈 </span>
                                <select onChange={sizeHandler} >
                                    <option value="none" >{"사이즈 선택"}</option>
                                    {
                                        prodSize?.map((sizes, index) => (
                                            <option key={index} value={sizes.size}>{sizes.size}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button type="button" className="btn btn-primary" onClick={optionChange}>변경</Button>
                            <Button type="button" className="btn btn-secondary" onClick={closeModal}>취소</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >

    )
}