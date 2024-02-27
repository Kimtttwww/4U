import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import DaumPost from "./DaumPost"
import { AddressData } from 'react-daum-postcode';



export default function AddressAPI({ onCompletePost }) {

    const postCodeStyle = {
        width: '100%',
        height: '600px'
    };

    const [modalOpen, setModalOpen] = useState(true);

    const closeModal = (data: AddressData) => {
        setModalOpen(false);
    };

    return (
        <div className={`daumApiModal ${modalOpen ? 'open' : 'closed'}`}>
            <div className="modalContent">
                {/* 팝업 내용 */}
                <Modal.Header closeButton>
                    <Modal.Title>내 주소 찾기</Modal.Title>
                </Modal.Header>
                <Modal.Body className='DaumModalBody'>
                    <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} autoClose={false} />
                </Modal.Body>
            </div>
        </div>
    );
};

