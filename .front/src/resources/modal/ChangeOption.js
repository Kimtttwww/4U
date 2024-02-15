import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';


export default function ChangeOption({ show, closeModal }) {
    /* <!-- optionChange Modal --> */

    const [checkColor, setCheckColor] = useState({
        color: ""
    })

    const optionHandler = (e) => {
        setCheckColor({
            color: e.target.value
        })
    }
    const changeColor = () => {

    }
    console.log(checkColor);

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
                                    id="optionChange-black" onChange={optionHandler} /> black
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="optionChange-red" onChange={optionHandler} /> red
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="optionChange-pink" onChange={optionHandler} /> pink
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="optionChange-blue" onChange={optionHandler} /> blue
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button type="button" className="btn btn-primary" onClick={changeColor}>변경</Button>
                            <Button type="button" className="btn btn-secondary" onClick={closeModal}>취소</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >


    )
}