import React, { useState } from 'react';
import DaumPostcode, { AddressData } from 'react-daum-postcode';

const postCodeStyle = {
    width: '400px'
};

const SignUp = () => {
    const [modalState, setModalState] = useState(false);
    const [inputAddressValue, setInputAddressValue] = useState('');
    const [inputZipCodeValue, setInputZipCodeValue] = useState('');

    const onCompletePost = (data: AddressData) => {
        setModalState(false);
        setInputAddressValue(data.address);
        setInputZipCodeValue(data.zonecode);
    };

    return (
        <>
            {/* 회원가입 페이지 프론트*/}
            <DaumPostcode
                style={postCodeStyle}
                onComplete={onCompletePost}
            />
        </>
    );
};

export default SignUp;
