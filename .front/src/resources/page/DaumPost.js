import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

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
        <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} autoClose={false} />
      </div>
    </div>
  );
};

export default DaumApi;