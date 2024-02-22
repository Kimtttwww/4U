import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';


export default function ChangeOption({ show, closeModal, sendColor, sendSize }) {
    /* <!-- optionChange Modal --> */

    const [checkColor, setCheckColor] = useState('');
    const [checkSize, setCheckSize] = useState('');

    const sizeOption = [
        { key: 0, value: "색상선택" },
        { key: 1, value: "S" },
        { key: 2, value: "M" },
        { key: 3, value: "L" },
    ];

    const colorHandler = (e) => {
        setCheckColor(e.target.value)
    };
    const sizeHandler = (e) => {
        setCheckSize(e.currentTarget.value)
    };

    const optionChange = () => {
        sendColor(checkColor);
        sendSize(checkSize);
        closeModal(false);
    };



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
                                <span>선택한 색상 : white</span>
                            </div>
                            <div className="form-check-2">
                                <span>변경할 색상</span>
                                <input type="radio" name="changeColor"
                                    onChange={colorHandler} value={"black"} /> black
                                <input type="radio" name="changeColor"
                                    onChange={colorHandler} value={"red"} /> red
                                <input type="radio" name="changeColor"
                                    onChange={colorHandler} value={"pink"} /> pink
                                <input type="radio" name="changeColor"
                                    onChange={colorHandler} value={"blue"} /> blue
                            </div>
                            <hr />
                            <div className="form-check-3">
                                <span>선택한 사이즈 : M</span>
                            </div>
                            <div className="form-check-4">
                                <span>변경할 사이즈 </span>
                                <select onChange={sizeHandler} value={checkSize}>
                                    {
                                        sizeOption.map((size, index) => (
                                            <option key={index} value={size.value}>{size.value}</option>
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