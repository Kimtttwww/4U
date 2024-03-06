import React, { useState, useEffect } from 'react';
import { AddressData } from 'react-daum-postcode';
import "../../css/member/SignUp.css";
import DaumPost from '../common/DaumPost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';
import { isFor } from '@babel/types';


const MyEdit = () => {

    // 회원가입상태값 선언
  
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
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
    const [isIdValid, setIsIdValid] = useState(false);
    const [isIdCheckClicked, setIsIdCheckClicked] = useState(false);
    const [isNameValid, setIsNameValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
        
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



     
    // 모든 폼 유효성을 추적할 상태 추가
    const [isFormValid, setIsFormValid] = useState(false);
    // 유효성 검사 상태 확인 및 유효성 업데이트
    useEffect(()=> {
        setIsFormValid(
            passwordError === '사용가능한 비밀번호입니다.' &&
            passwordCheck.includes('일치합') &&
            phone !== "" &&
            address !== "" &&
            addressDetail !== ""
        );
    }, [passwordError, passwordCheck, isIdValid, phone, address, zipCode, addressDetail]);

    
    

    // 회원가입 눌렀을때 작동하는 방식
    const handleSignUp = () => {
        if (isFormValid){
        let member = {
            memberPwd : password,
            address,
            addressDetail,
            zipCode : inputZipCodeValue,
            email,
            phone
        }
        console.log(member);
        axios
        .post("http://localhost:3000/member/editInfo", member)
        .then(response => {
          alert("정보 수정 성공");
          navigate("/");
        })
        .catch(error => {
          console.error("정보 수정 오류", error);
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
    <legend>정보수정</legend>



    <div className='signUp-password'>
      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">비밀번호
        <input type="password" id="disabledTextInput" className="form-control"  onChange={(e) => {setPassword(e.target.value); handlePasswordChange(e)}}
        style={{ width: '250px' }}/>
      {passwordError && (
      <span style={{ color: passwordError.includes('사용가능') ? 'green' : 'red' }}>{passwordError}</span>
      )}
      </label>
      </div>


      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">비밀번호 확인
        <input type="password" class = "form-control" value={confirm} onChange={(e) => {setConfirm(e.target.value); handlePasswordCheck(e)}}
        style={{ width: '250px' }}/>
      {passwordCheck && (
      <span style={{color: passwordCheck.includes('일치합') ? 'green' : 'red'}}>{passwordCheck}</span>
      )}
      </label>
      </div>
    </div>

    

    <div className="mb-3">
      <label for="disabledTextInput" className="form-label">이메일
      <input type="text" id="disabledTextInput" className="form-control"value={email} onChange={(e) => setEmail(e.target.value)} 
      style={{ width: '250px' }}/>
    </label>
    </div>

    <div className="mb-3">
      <label for="disabledTextInput" className="form-label">전화번호
      <input type="text" id="disabledTextInput" className="form-control"value={phone} onChange={(e) => setPhone(e.target.value)} 
      style={{ width: '250px' }}/>
    </label>
    </div>

    <div>
        <label for="disabledTextInput" className="form-label">우편번호</label>
      <div className="mb-3 signUp-postcode">
        <input type="text" id="disabledTextInput" className="form-control"readOnly value={inputZipCodeValue} onChange={(e) => setzipCode(e.target.value)} placeholder='우편번호' 
        style={{ width: '100px' }}/>
      <button type="button" onClick={toggleModal} className= "btn btn-primary address-btn">주소 찾기</button>
      </div>
    </div>
      
    <div className='signUp-address'>
      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">주소</label>
        <input type="text" id="disabledTextInput" className="form-control" readOnly value={address} onChange = {(e) => setInputAddressValue(e.target.value)} 
        style={{ width: '250px' }}/>
        
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

      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">상세주소</label>
        <input type="text" id="disabledTextInput" className="form-control"value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} placeholder='상세 주소를 입력하세요.'
        style={{ width: '250px' }}/>
      </div>
    </div>


    <button type="submit" className="btn btn-primary inroll-btn" onClick={handleSignUp} disabled = {!isFormValid }>정보수정</button>
  </fieldset>
        
</form>
</div>
        </>
    );
};
export default MyEdit;