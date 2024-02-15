import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

const postCodeStyle = {
  width: '400px',
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
        <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} autoClose={false} />

        {/* 팝업 닫기 버튼 */}
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
};

export default DaumApi;