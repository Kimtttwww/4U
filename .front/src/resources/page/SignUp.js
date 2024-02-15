import React, { useState, useEffect } from 'react';
import { AddressData } from 'react-daum-postcode';
import "../css/signUp/SignUp.css";
import DaumPost from './DaumPost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const postCodeStyle = {
    width: '400px'
};

const SignUp = () => {
    // 회원가입상태값 선언
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirm, setConfirm] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [zipCode, setzipCode] = useState('');

    // 리다이렉트 문구
    const navigate = useNavigate();

    // DAUM API
    const [modalState, setModalState] = useState(false);
    const [address, setInputAddressValue] = useState('');
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
    
    const [isIdCheck, setIsIdCheck] = useState(false);
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    
    // 아이디 중복검사
    const handleIdCheck = async () => {
          const response = await axios.post('http://localhost:8080/member/checkDuplicateId', {
            memberId: id,
          }).then((result)=>{
            if(result){
                alert("중복아이디있습니다.");
                return;
            } else{
                
            }
          }).catch(console.log);
      };

    // 아이디 유효성검사 ======================================


    const idRegexs = {
        idRegex: /^[a-zA-Z][a-zA-Z0-9]{2,19}$/
    };

    const [idError, setidError] = useState('');
    
    const handleIdChange = (e) =>{
        const newId = e.target.value;
        
    if(!idRegexs.idRegex.test(newId)){
        setidError('영문자로 시작하는 3~20자의 영문, 숫자만 사용 가능합니다.');
    } else{
        setidError('');
    }
    }


    
    // 비밀번호 유효성 검사 ======================================

    const [passwordError, setPasswordError] = useState('');
    
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;

        if (newPassword.length === 0) {
            setPasswordError('');
          } else if (newPassword.length < 8) {
            setPasswordError('비밀번호는 최소 8자 이상 16자 이하');
          } else if (newPassword.length > 16) {
            setPasswordError('비밀번호는 16자 이하여야합니다.');
          } else {
            setPasswordError('사용가능한 비밀번호입니다.');
          }
    }

    // 비밀번호 확인이 비밀번호랑 일치하는지 =======================
    
    const [passwordCheck, setPasswordCheck] = useState('');

    const handlePasswordCheck = (e) => {
        const newPassword = e.target.value;

      if (password === newPassword) {
            setPasswordCheck('비밀번호가 일치합니다.');
        } else if(newPassword.length == 0) {
            setPasswordCheck('');
        }
            else{
            setPasswordCheck('비밀번호가 일치하지 않습니다.');
        } 
     
    }

    // 생년월일은 형식에 맞게 =========================

    const birthdayRegex = /^\d{4}\d{2}\d{2}$/;
    const [birthdayCheck , setBirthdayCheck] = useState('');
    const [birthdayError , setBirthdayError] = useState('');

    const handleBirthdayCheck = (e) => {
        const newBirthday = e.target.value;
        
            if(newBirthday.length === 0){
                setBirthdayError('');
                setBirthdayCheck('');
                return;
            }

            if(!birthdayRegex.test(newBirthday)){
                setBirthdayError('생년월일은 YYYYMMDD 형식으로 입력해주세요.');
                setBirthdayCheck('');
            } else{
                setBirthdayCheck('');
                setBirthdayError('굿');
            }
        

    };

    // 회원가입 눌렀을때 작동하는 방식
    const handleSignUp = () => {
        let member = {
            memberId :id ,
            memberPwd : password,
            memberName : name,
            address,
            addressDetail,
            zipCode : inputZipCodeValue,
            birthday,
            email,
            phone
        }
        axios
        .post("http://localhost:3000/member/SignUp", member)
        .then(response => {
            alert("회원가입 성공");
            navigate("/");
        })
        .catch(error => {
            console.error("회원가입 에러", error);
        });
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
            <form className='signUpForm'>
                <label>
                    아이디:
                    <input type="text" value={id} onChange={(e) => {setId(e.target.value); handleIdChange(e)}} />
                    <button type='button' onClick={handleIdCheck}>중복 확인</button>
                    {isIdCheck && (
                       <>
                    {isIdAvailable ? (
                    <span style={{ color: 'green' }}>사용 가능한 아이디입니다!</span>
                            ) : (
                    <span style={{ color: 'red' }}>이미 사용 중인 아이디입니다!</span>
                            )}
                        </>
                    )}
                    {idError && (
                <span style={{ color: 'red' }}>{idError}</span>
                    )}
                </label>
                <br />
                <label>
                    이름:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    비밀번호:
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value); handlePasswordChange(e)}} />
                </label>
                <br/>
                {passwordError && (
                 <span style={{ color: passwordError.includes('사용가능') ? 'green' : 'red' }}>{passwordError}</span>
                )}
                <br />
                
                <label>
                    비밀번호 확인:
                    <input
                    type="password"
                    value={confirm}
                    onChange={(e) => {setConfirm(e.target.value); handlePasswordCheck(e)}}
                />
                </label>
                <br />
                {passwordCheck && (
                    <span style={{color: passwordCheck.includes('일치합') ? 'green' : 'red'}}>{passwordCheck}</span>
                )}

             <label>
                    생년월일:
                    <input type="text" value={birthday} onChange={(e) => {setBirthday(e.target.value); handleBirthdayCheck(e)}} />
                </label>
                {birthdayError && (
                <span style={{ color: 'red' }}>{birthdayError}</span>
                )}
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
                    <input type ="text" readOnly value={address} onChange = {(e) => setInputAddressValue(e.target.value)} />
                <button type="button" onClick={toggleModal}>주소 찾기</button>
                </label>

                <br />
            {/* Daum 주소 API 컴포넌트 */}
            {modalState && <DaumPost onCompletePost={onCompletePost}
            />}
                <label>
                    상세주소:
                    <input type="text" value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} placeholder='상세 주소를 입력하세요.' />
                </label>
                <label>
                    우편번호
                    <input type="text" readOnly value={inputZipCodeValue} onChange={(e) => setzipCode(e.target.value)} placeholder='우편번호' />
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