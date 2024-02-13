// import ReactModal from "react-modal";
// import { Modal, Button } from "bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


export default function ChangeOption({ isOptionChange, closeModal }) {
    /* <!-- optionChange Modal --> */

    // const [isShow, setIsShow] = useState(false);

    // const show = () => setIsShow(true);
    // const close = () => setIsShow(false);


    return (
        <div isOpen={isOptionChange} >
            <div className="modal fade" id="optionChangeModal" data-bs-backdrop="static" data-bs-keyboard="false"
                tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="staticBackdropLabel">옵션변경</h3>
                            <Button type="button" className="btn-close" variant="info" data-bs-dismiss="modal" aria-label="Close"
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                onClick={closeModal}>취소</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >


    )
}