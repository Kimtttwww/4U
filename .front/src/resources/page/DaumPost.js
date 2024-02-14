import DaumPostcode, { AddressData } from 'react-daum-postcode';
import { useState } from 'react';
const postCodeStyle = {
    width: '400px'
};

const DaumApi = ({onCompletePost}) => {


    return (<DaumPostcode style={postCodeStyle} onComplete={onCompletePost} autoClose={false}/>)
}

export default DaumApi;