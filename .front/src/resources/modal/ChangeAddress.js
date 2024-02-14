import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ChangeAddress({ show, closeModal }) {


    const [기존입력값, 기존입력값변경] = useState({
        receiver: '고길동',
        receiverPhone: '11-122-33',
        address: '요리',
        addressDetail: '조리'
    },);
    const [changeAdd, setChangeAdd] = useState({
        receiver: '',
        receiverPhone: '',
        address: '',
        addressDetail: ''
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setChangeAdd({ ...changeAdd, [name]: value })

    }
    // console.log(changeAdd);

    const changeAddress = () => {


        const { receiver, receiverPhone, address, addressDetail } = changeAdd;

        기존입력값변경([기존입력값], changeAdd);

        closeModal(false);

    }
    console.log(기존입력값);
    return (

        <Modal show={show}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">배송정보 변경</h5>
                    </div>
                    <div className="modal-body">
                        <div className="modal-body-text">
                            <span>수령자명</span>
                            <span>연락처</span>
                            <span>배송지주소</span>
                        </div>
                        <div className="modal-body-input">
                            <input type="text" id="receiver1" name="receiver" value={changeAdd.receiver} onChange={changeHandler} />
                            <input type="text" name="receiverPhone" value={changeAdd.receiverPhone} onChange={changeHandler} />
                            <input type="text" name="address" value={changeAdd.address} onChange={changeHandler} />
                            <input type="text" name="addressDetail" value={changeAdd.addressDetail} onChange={changeHandler} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary"
                            onClick={() => changeAddress()}>변경</button>
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>취소</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}