// import ReactModal from "react-modal";
// import { Modal, Button } from "bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';


export default function ChangeOption({ isOpen, closeModal }) {
    /* <!-- optionChange Modal --> */

    // const [isShow, setIsShow] = useState(false);

    // const show = () => setIsShow(true);
    // const close = () => setIsShow(false);
    console.log("sdfhj");

    return (
        <Modal isOpen={isOpen} >
            <div id="optionChangeModal" >
                <div >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="staticBackdropLabel">옵션변경</h3>
                            <Button type="button" className="btn-close" variant="info"
                            ></Button>
                        </div>
                        <div className="modal-body">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault1" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    white
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault2" />black
                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault2" />red
                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault2" />pink
                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                    id="flexRadioDefault2" />blue
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">저장</button>
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >


    )
}