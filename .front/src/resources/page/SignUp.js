import React, { useState, useEffect } from 'react';
import { AddressData } from 'react-daum-postcode';
import "../css/SignUp.css";
import DaumPost from './DaumPost';
const postCodeStyle = {
    width: '400px'
};


const SignUp = () => {
    // 회원가입창
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');


    const [isIdCheck, setIsIdCheck] = useState(false);
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    

    // DAUM API
    const [modalState, setModalState] = useState(false);
    const [inputAddressValue, setInputAddressValue] = useState('');
    const [inputZipCodeValue, setInputZipCodeValue] = useState('');

    // 다음 주소창 열리게 하기
    const toggleModal = () => {
        setModalState(!modalState);
    };

    const onCompletePost = (data: AddressData) => {    
        setModalState(false);    
        setInputAddressValue(data.address);
        setInputZipCodeValue(data.zonecode);
    };
    
    const handleIdCheck = () => {
       
    }

    const handleSignUp = () => {
        console.log("id" + id);
        console.log("password" + password);
        console.log("confirm" + confirm);
        console.log("address" + inputAddressValue);
        console.log("birthday" + birthday);
        console.log("phone" + phone);
        
    }
//========================================================== 
    return (
        <>
            <div className='signupTop'>
                <div className='signupTop-left'>
                    <p className='fontfont'>4U에 오신걸 환영합니다!</p>
                </div>
                <div className='signupTop-right'>
                    <img className='signupTopImgOne' src='https://atimg.sonyunara.com/files/attrangs/goods/155318/65aa44fd6a9b2.jpg'/>
                </div>
            </div>
        <div className='formBox'>
            <div className='formContainer'>
            <form>
                <label>
                    아이디:
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                    <button onClick={handleIdCheck}>중복 확인</button>
                    {isIdCheck && (
                       <>
                    {isIdAvailable ? (
                    <span style={{ color: 'green' }}>사용 가능한 아이디입니다!</span>
                            ) : (
                    <span style={{ color: 'red' }}>이미 사용 중인 아이디입니다!</span>
                            )}
                        </>
                    )}
                </label>
                <br />
                <label>
                    비밀번호:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    비밀번호 확인:
                    <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                </label>
                <br />
                <label>
                    생년월일:
                    <input type="text" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                </label>
                <br />
                <label>
                    이메일:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    전화번호:
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
                <br />
                <label>
                    주소:
                    <input type ="text" readOnly value={inputAddressValue} onChange = {(e) => setInputAddressValue(e.target.value)} />
                <button type="button" onClick={toggleModal}>주소 찾기</button>
                </label>

                <br />
            {/* Daum 주소 API 컴포넌트 */}
            {modalState && <DaumPost onCompletePost={onCompletePost}/>}
                <label>
                    상세주소:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='상세 주소를 입력하세요.' />
                </label>
                <br />
                <button type = "button" onClick={handleSignUp}>회원가입</button>
            </form>
            </div>
        </div>
        </>
    );
};
export default SignUp;