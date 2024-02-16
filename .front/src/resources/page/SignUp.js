import React, { useState, useEffect } from 'react';
import { AddressData } from 'react-daum-postcode';
import "../css/signUp/SignUp.css";
import DaumPost from './DaumPost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';
import { isFor } from '@babel/types';

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
    
    const handleModalOpen = () => {
        setModalState(true);
    };

    const handleModalClose = () => {
        setModalState(false);
    }


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
   

    // 아이디 중복검사 ============================================
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

    
    // 아이디 유효성검사 ============================================


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

    // 이메일은 @가 무조건 들어가게 ===================================



     
    // 모든 폼 유효성을 추적할 상태 추가
    const [isFormValid, setIsFormValid] = useState(false);
    // 유효성 검사 상태 확인 및 유효성 업데이트
    useEffect(()=> {
        setIsFormValid(
            idError === '' &&
            passwordError === '사용가능한 비밀번호입니다.' &&
            passwordCheck.includes('일치합') &&
            birthdayError === '굿'
        );
    }, [idError, passwordError, passwordCheck, birthdayError]);


    // 회원가입 눌렀을때 작동하는 방식
    const handleSignUp = () => {
        if (isFormValid){
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
    } else{
        alert("양식을 올바르게 작성해주세요.");
    }
    }
//========================================================== 
    return (
        <>
<div className='form-container'>
<form>
  <fieldset>
    <legend>회원가입</legend>


    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">아이디:
      <input type="text" value={id} className = "form-control" onChange={(e) => {setId(e.target.value); handleIdChange(e)}} 
      style={{ width: '300px' }}/> 
    {idError && (
        <span style={{ color: 'red' }}>{idError}</span>
        )}
    <button type="submit" class="btn btn-primary">중복확인</button>
      </label>
    </div>


    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">이름:</label>
      <input type="text" value={name} className='form-control' onChange={(e) => setName(e.target.value)} 
      style={{ width: '300px' }}/>
    </div>


    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">비밀번호:
      <input type="text" id="disabledTextInput" class="form-control"  onChange={(e) => {setPassword(e.target.value); handlePasswordChange(e)}}
      style={{ width: '300px' }}/>
    {passwordError && (
    <span style={{ color: passwordError.includes('사용가능') ? 'green' : 'red' }}>{passwordError}</span>
    )}
    </label>
    </div>


    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">비밀번호 확인:
      <input type="password" class = "form-control" value={confirm} onChange={(e) => {setConfirm(e.target.value); handlePasswordCheck(e)}}
      style={{ width: '300px' }}/>
    {passwordCheck && (
    <span style={{color: passwordCheck.includes('일치합') ? 'green' : 'red'}}>{passwordCheck}</span>
    )}
    </label>
    </div>

    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">생년월일:
      <input type="text" id="disabledTextInput" class="form-control"value={birthday} onChange={(e) => {setBirthday(e.target.value); handleBirthdayCheck(e)}} 
      style={{ width: '300px' }}/>
      {birthdayError && (
    <span style={{ color: 'red' }}>{birthdayError}</span>)}
    </label>
    </div>

    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">이메일:
      <input type="text" id="disabledTextInput" class="form-control"value={email} onChange={(e) => setEmail(e.target.value)} 
      style={{ width: '300px' }}/>
    </label>
    </div>

    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">전화번호:
      <input type="text" id="disabledTextInput" class="form-control"value={phone} onChange={(e) => setPhone(e.target.value)} 
      style={{ width: '300px' }}/>
    </label>
    </div>

    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">주소:</label>
      <input type="text" id="disabledTextInput" class="form-control" readOnly value={address} onChange = {(e) => setInputAddressValue(e.target.value)} 
      style={{ width: '300px' }}/>
      <button type="button" onClick={toggleModal} class= "btn btn-primary">주소 찾기</button>
      {/* Daum 주소 API 컴포넌트 */}
      <Modal show={modalState} onHide={handleModalClose} dialogClassName='DaumModal'>
        <Modal.Header closeButton>
        <Modal.Title>내 주소 찾기</Modal.Title>
         </Modal.Header>
        <Modal.Body className='DaumModalBody'>
         <DaumPost onCompletePost={onCompletePost} />
         </Modal.Body>
     </Modal>
    </div>

    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">상세주소:</label>
      <input type="text" id="disabledTextInput" class="form-control"value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} placeholder='상세 주소를 입력하세요.'
      style={{ width: '300px' }}/>
    </div>

    <div class="mb-3">
      <label for="disabledTextInput" class="form-label">우편번호:
      <input type="text" id="disabledTextInput" class="form-control"readOnly value={inputZipCodeValue} onChange={(e) => setzipCode(e.target.value)} placeholder='우편번호' 
      style={{ width: '300px' }}/>
    </label>
    </div>
    <button type="submit" class="btn btn-primary" onClick={handleSignUp} disabled = {!isFormValid}>회원가입</button>
  </fieldset>
</form>
</div>
        </>
    );
};
export default SignUp;