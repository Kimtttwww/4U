import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';


export default function ChangeOption({ show, closeModal }) {
    /* <!-- optionChange Modal --> */

    console.log("sdfhj");

    return (
        <Modal show={show} >
            <div id="optionChangeModal" >
                <div >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="staticBackdropLabel">옵션변경</h3>
                        </div>
                        <div className="modal-body">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="color"
                                    id="flexRadioDefault1" checked />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    white
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="flexRadioDefault2" />black
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="flexRadioDefault2" />red
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="flexRadioDefault2" />pink
                                <input className="form-check-input" type="radio" name="changeColor"
                                    id="flexRadioDefault2" />blue
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button type="button" className="btn btn-primary">저장</Button>
                            <Button type="button" className="btn btn-secondary" onClick={closeModal}>취소</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >


    )
}