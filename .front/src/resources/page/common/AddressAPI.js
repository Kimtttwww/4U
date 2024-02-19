import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import DaumPost from "../DaumPost"

const postCodeStyle = {
    width: '100%',
    height: '600px'
};

const DaumApi = ({ onCompletePost }) => {
    const [modalOpen, setModalOpen] = useState(true);

    const closeModal = () => {
        setModalOpen(false);
        onclose();
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

export default DaumApi;