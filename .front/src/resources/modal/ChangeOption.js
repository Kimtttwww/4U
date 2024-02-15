import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Order from '../page/order/Order';
import { Route, Routes } from 'react-router-dom';


export default function ChangeOption({ show, closeModal, sendColor }) {
    /* <!-- optionChange Modal --> */

    // const [sendColor, setSendColor] = useState(false);
    const [applyColor, setApplyColor] = useState('');
    const [checkColor, setCheckColor] = useState('');

    const optionHandler = (e) => {
        setCheckColor(e.target.value)
    }

    const applyChange = () => {
        sendColor(checkColor);
    }


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
                                {/* <input className="form-check-input" type="radio" name="color"
                                    id="flexRadioDefault1" /> */}
                                {/* <label className="form-check-label" htmlFor="flexRadioDefault1"> */}
                                선택한 색상 : white
                                {/* </label> */}
                            </div>
                            <div className="form-check-2">
                                변경할 색상
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="optionChange-black" onChange={optionHandler} value={"black"} /> black
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="optionChange-red" onChange={optionHandler} value={"red"} /> red
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="optionChange-pink" onChange={optionHandler} value={"pink"} /> pink
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="optionChange-blue" onChange={optionHandler} value={"blue"} /> blue
                            </div>
                        </div>
                        {/* <Order show={sendColor} applyColor={applyColor} /> */}
                        <div className="modal-footer">
                            <Button type="button" className="btn btn-primary" onClick={applyChange}>변경</Button>
                            <Button type="button" className="btn btn-secondary" onClick={closeModal}>취소</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >



    )
}