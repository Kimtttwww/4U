import { useState, useEffect, useRef } from 'react';
import { AddressData } from 'react-daum-postcode';
import "../../css/member/SignUp.css";
import DaumPost from '../common/DaumPost';
import { useNavigate } from 'react-router-dom';
import {Alert, Modal, Overlay, Tooltip} from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import BuyerMyPage from './BuyerMyPage';

const MyEdit = () => {
    const onCompletePost = (data) => {
        // 'data'에는 선택한 주소 정보가 포함됩니다.
        const { address, zonecode } = data;

        // 선택한 주소 및 우편번호로 상태 변수 업데이트
        setInputAddressValue(address);
        setInputZipCodeValue(zonecode);

        // DaumPost 모달 닫기
        setModalState(false);
    };

    // 정보수정상태값 선언
    const [member, setMember] = useState(null);
    const [PassWord , setPassWord] = useState("");
    // 리다이렉트 문구
    const navigate = useNavigate();
    const [MemberInfo , setMemberInfo] = useState([]);
    // DAUM API
    const [modalState, setModalState] = useState(false);
    const [address, setInputAddressValue] = useState('');
    const [inputZipCodeValue, setInputZipCodeValue] = useState('');
    const [showTooltip, setShowTooltip] = useState({memberPwd: false, checkPwd: false, email: false, phone: false});
    const inputs = useRef([]);

    const handlePasswordCheck = async () => {

        setMember({...member});
    
        const loginMember = Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null;
        
        let Memberinfo = {
          "memberId" : loginMember.memberId, // 로그인된 멤버의 멤버 아이디를 가져옴
          "memberPwd" : member.memberPwd // 내가 친 패스워드를 가져옴
        }
    
        console.log(MemberInfo.memberPwd);
        console.log(MemberInfo.memberId);
        
        try {
          const response = await axios.post('/member/login', Memberinfo)
          setPassWord(response.data);
          console.log(response.data);
          if(response.data) {
            alert('비밀번호 일치');
            navigate('/buyer/mypage/myEdit');
          } else {
            alert('비밀번호 불일치');
            navigate('/buyer/mypage')
          }
        } catch (error) { 
          console.error('멤버 로드 오류:', error); // 오류 발생 시 콘솔에 오류 메시지 출력
        }
      };

    useEffect(() => {
        const loginMember = Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null;

        console.log(loginMember);
        if(loginMember) {
            axios.post("/order/loadMemberInfo", JSON.stringify(loginMember.memberNo), { headers: {'Content-type': 'application/json; charset=UTF-8'}})
            .then((data) => {
                let memberFull = data.data;

                if(memberFull.phone) {memberFull.phone = memberFull.phone.split("-").join("")}

                setMember({...memberFull, memberPwd: ""});
            }).catch(() => {
                console.log("조회 실패");
            });
        }
    }, []);

    // 다음 주소창 열리게 하기
    const toggleModal = () => {
        setModalState(!modalState);
    };

    // 모든 폼 유효성을 추적할 상태 추가
    const [isFormValid, setIsFormValid] = useState(false);



    // 회원 탈퇴
    const deleteMember = async () => {
        const confirmDelete = window.confirm("정말 회원을 삭제하시겠습니까?");
        if (confirmDelete) {
            await axios.put(`/member/deleteMember/${member.memberNo}`)
            .then(response =>{

                alert("회원 삭제 성공");
                Cookies.remove("loginMember");
                setMember(null);
                window.location.href = '/';

            }).catch( (error) =>{
                console.error('멤버 삭제 에러', error);
            });
        }
    };


    // 정보수정 눌렀을때 작동하는 방식
    const handleSignUp = () => {

        if(!setShowTooltip && inputs.current[2].value !== ""){
        axios.post("/member/editInfo", member)
        .then(response => {
            alert("정보 수정 성공");
            navigate("/");
        }).catch(error => {
            console.error("정보 수정 오류", error);
            alert("실패");
        });
        alert("정보수정 성공")
    } else{
        alert("수정을 올바르게 해주세요.")
    }

    }

    // 사용자가 변경을 하면 변경된 정보를 실시간으로 저장해둘 함수
    function changeMember(e) {
        if(member) {
            setMember({...member, [e.target.name]: e.target.value});
            // 키밸류 형태
            const regExp = {email: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, phone : /^[0-9]{0,11}$/}

            switch (e.target.name) {
                case 'memberPwd':
                    if(e.target.value?.length > 16) {
                        setShowTooltip({...showTooltip, [e.target.name]: '비밀번호는 16자 이하여야합니다.'});
                    } else if (e.target.value?.length < 8) {
                        setShowTooltip({...showTooltip, [e.target.name]: '비밀번호는 최소 8자 이상 16자 이하'});
                    } else if (e.target.value?.length === 0) {
                        setShowTooltip({...showTooltip, [e.target.name]: false});
                    } else {
                        setShowTooltip({...showTooltip, [e.target.name]: '사용가능한 비밀번호입니다.'});
                    }
                    break;
                case 'checkPwd':
                    if (inputs.current[0].value === inputs.current[1].value){
                        setShowTooltip({...showTooltip, [e.target.name]: '비밀번호가 일치합니다.'});
                    }else if (inputs.current[1].value.length === 0){
                        setShowTooltip({...showTooltip, [e.target.name]: false});
                    }else if (inputs.current[0].value !== inputs.current[1].value) {
                        setShowTooltip({...showTooltip, [e.target.name]: '비밀번호가 일치하지않습니다.'});
                    }
                    break;
                case 'email':
                    if (inputs.current[2].value.length === 0 || regExp.email.test(inputs.current[2].value)){
                        setShowTooltip({...showTooltip, [e.target.name]: false});
                    } else if (!regExp.email.test(inputs.current[2].value)) {
                        setShowTooltip({...showTooltip, [e.target.name]: "올바른 이메일 형식이 아닙니다."});
                    } 
                    break;
                case 'phone':
                    if (inputs.current[3].value.length === 0){
                        setShowTooltip({...showTooltip, [e.target.name]: "전화번호를 입력해주세요."});
                    } else if (regExp.phone.test(inputs.current[3].value)) 
                    setShowTooltip({...showTooltip, [e.target.name]: false});
                    else {
                        setShowTooltip({...showTooltip, [e.target.name]: "올바른 전화번호 방식이아닙니다."});
                    }

                    break;
            }


        }
    }

    console.log(showTooltip);
//==========================================================
    return (<>
<div className='form-container'>
<form>
  <fieldset>
    <legend>정보수정</legend>

    <div className='signUp-password'>
      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">비밀번호

        <input ref={(e) => {inputs.current[0] = e}} type="password" id="disabledTextInput"
            className="form-control" name="memberPwd"  onChange={changeMember} style={{ width: '250px' }}/>
        <Overlay target={inputs.current[0]} show={showTooltip.memberPwd} placement="bottom" >
            {(props) => (<Tooltip {...props}>{showTooltip.memberPwd}</Tooltip>)}
        </Overlay>

      </label>
      </div>


      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">비밀번호 확인

        <input ref={(e) => {inputs.current[1] = e}} type="password"
            className="form-control" name='checkPwd' onChange={changeMember} style={{ width: '250px' }}/>
        <Overlay target={inputs.current[1]} show={showTooltip.passwordCheck} placement="bottom">
            {(props) => (<Tooltip {...props}>{showTooltip.checkPwd}</Tooltip>)}
        </Overlay>
      </label>
      </div>
    </div>



    <div className="mb-3">
        <label for="disabledTextInput" className="form-label">이메일

        <input ref={(e) => {inputs.current[2] = e}} type="text" id="disabledTextInput0" name="email"
            value={member?.email} className="form-control" onChange={changeMember} style={{ width: '250px' }}/>
        <Overlay target={inputs.current[2]} show={showTooltip.email} placement="bottom">
        {(props) => (<Tooltip {...props}>{showTooltip.email}</Tooltip>)}
        </Overlay>
    </label>
    </div>

    <div className="mb-3">
        <label for="disabledTextInput" className="form-label">전화번호

        <input ref={(e) => {inputs.current[3] = e}} type="text" id="disabledTextInput0" name="phone"
            value={member?.phone} className="form-control" onChange={changeMember} style={{ width: '250px' }}/>
        <Overlay target={inputs.current[3]} show={showTooltip.phone} placement="bottom">
        {(props) => (<Tooltip {...props}>{showTooltip.phone}</Tooltip>)}
        </Overlay>
    </label>
    </div>

    <div>
        <label for="disabledTextInput" name="zipCode" className="form-label">우편번호</label>
      <div className="mb-3 signUp-postcode">

        <input type="text" id="disabledTextInput" className="form-control"readOnly value={member?.inputZipCodeValue} onChange={changeMember} placeholder='우편번호'

        style={{ width: '100px' }}/>
      <button type="button" onClick={toggleModal} className= "btn btn-primary address-btn">주소 찾기</button>
      </div>
    </div>

    <div className='signUp-address'>
      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">주소</label>
        <input type="text" id="disabledTextInput" name="address" className="form-control" readOnly value={member?.address} onChange={changeMember}
        style={{ width: '250px' }}/>

        {/* Daum 주소 API 컴포넌트 */}
        <Modal show={modalState} onHide={() => setModalState(!modalState)} dialog ClassName='DaumModal'>
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
        <input type="text" id="disabledTextInput" name="addressDetail" className="form-control"value={member?.addressDetail} onChange={changeMember} placeholder='상세 주소를 입력하세요.'
        style={{ width: '250px' }}/>

      </div>
    </div>


    <button type="button" className="btn btn-primary inroll-btn" onClick={handleSignUp}>정보수정</button>
    <button type= "button" className="btn btn-primary inroll-btn" onClick={deleteMember}>회원탈퇴</button>
  </fieldset>

</form>
</div>
        </>
    );
};
export default MyEdit;