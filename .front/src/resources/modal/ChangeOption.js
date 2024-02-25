import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { loadProdDetilAPI } from '../page/order/OrderAPI';


export default function ChangeOption({ show, closeModal, sendColor, sendSize, option }) {
    /* <!-- optionChange Modal --> */

    const [dbResponse, setDBResponse] = useState(null);
    const [checkColor, setCheckColor] = useState("");
    const [checkSize, setCheckSize] = useState("");
    const [prodColor, setProdColor] = useState([]);
    const [prodSize, setProdSize] = useState([]);


    const colorHandler = (e) => {
        setCheckColor(e.target.value)
    };
    const sizeHandler = (e) => {
        setCheckSize(e.currentTarget.value)
    };

    const optionChange = (e) => {
        sendColor(checkColor);
        sendSize(checkSize);
        closeModal(false);
    };
    const getDBData = async (data) => {
        const response = await loadProdDetilAPI(option.prodNo);
        setDBResponse(response);
    }
    const getProdColor = async (data) => {

        setProdColor(Array.from(new Set(dbResponse?.map((obj) => obj.colorName))));

    };

    const getProdSizeFromColor = async (data) => {
        console.log("???");
        console.log(checkColor);
        console.log(dbResponse?.filter((obj) => obj.colorName == checkColor));
        setProdSize(dbResponse?.filter((obj) => obj.colorName == checkColor));
    };


    useEffect(() => {
        getDBData();
    }, []);

    useEffect(() => {

        if (dbResponse?.length > 0) {
            // 데이터를 가지고 왔을때.. 필요한 컬러를 가져온다..'
            getProdColor();

            // 기본 값 컬러 가져와 주기..
            setCheckColor(`${option.colorName}`);
        }
    }, [dbResponse])

    useEffect(() => {
        if (checkColor) {
            // 컬러가 선택이 되면,, 그때 사이즈를 가져온다.
            getProdSizeFromColor();
        }
    }, [checkColor]);


    return (
        <Modal show={show}  >
            <div id="optionChangeModal" >
                <div >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="staticBackdropLabel">옵션변경</h3>
                        </div>
                        <div className="modal-body optionBody" >
                            <div className="form-check-1">
                                <span>선택한 색상 : {option.colorName}</span>
                            </div>
                            <div className="form-check-2">
                                <span>변경할 색상</span>
                                {console.log(prodColor)}
                                {
                                    prodColor?.map((prodcolor, index) => (
                                        <span key={index}>
                                            <input type="radio" name="changeColor"
                                                onChange={colorHandler} value={`${prodcolor}`} checked={prodcolor == checkColor} />
                                            {prodcolor}
                                        </span>
                                    ))
                                }
                            </div>
                            <hr />
                            <div className="form-check-3">
                                <span>선택한 사이즈 : {option.size}</span>
                            </div>
                            <div className="form-check-4">
                                <span>변경할 사이즈 </span>
                                <select onChange={sizeHandler} value={checkSize}>
                                    {
                                        prodSize?.map((prodsize, index) => (
                                            <option key={index} value={prodsize.size}>{prodsize.size}</option>
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