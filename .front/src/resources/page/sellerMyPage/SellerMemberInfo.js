import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/sellerMyPage/SellerMemberInfo.css'

export default function SellerMemberInfo() {
    const [members, setMembers] = useState([]); // 멤버 정보를 저장할 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색어를 저장할 상태
    const [selectedMember, setSelectedMember] = useState(null); // 선택된 멤버 정보를 저장할 상태

    // 멤버 정보를 가져오는 함수
    const fetchMembers = async () => {
        try {
            const response = await axios.get('/member/selectAllMember');
            setMembers(response.data);
        } catch (error) {
            console.error('멤버 정보 가져오기 에러', error);
        }
    };
    console.log(members)

    const deleteMember = async (memberNo) => {
        const confirmDelete = window.confirm("정말 멤버를 삭제하시겠습니까?");
        if (confirmDelete) {
            try {
                await axios.put(`/member/deleteMember/${memberNo}`);
                // setMembers(members.filter(member => member.id !== memberId));
            } catch (error) {
                console.error('멤버 삭제 에러', error);
            }
        }
    };

    const updateMember = async (selectedMember) => {
        try {
            await axios.post(`/member/sellerUpdateMem`, selectedMember, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }); 
            alert("멤버 수정 완료");
            window.location.reload();
            fetchMembers();
        } catch (error) {
            console.error('멤버 정보 수정 에러', error);
        }
    };

    // 멤버 정보를 검색하는 함수
    const searchMembers = () => {
        // 여기에 검색을 실행하는 로직을 구현합니다.
        // 예: setMembers(members.filter(member => member.name.includes(searchTerm)));
        setMembers(members.filter(member => member.memberName.includes(searchTerm)))
    };

    // 검색어가 변경되었을 때 실행하는 함수
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 컴포넌트가 마운트될 때 멤버 정보를 가져옴
    useEffect(() => {
        fetchMembers();
    }, []);

    // 멤버 정보를 보여주는 함수
    const handleMemberClick = (member) => {
        setSelectedMember(member);
    };
    const handlePasswordChange = (event) => {
        setSelectedMember({ ...selectedMember, memberPwd: event.target.value });
    }; 
    const handleNameChange = (event) => {
        setSelectedMember({ ...selectedMember, memberName: event.target.value });
    }; 
    const handleAddressChange = (event) => {
        setSelectedMember({ ...selectedMember, address: event.target.value });
    };
    const handleAddressDetailChange = (event) => {
        setSelectedMember({ ...selectedMember, addressDetail: event.target.value });
    };
    const handleZipCodeChange = (event) => {
        setSelectedMember({ ...selectedMember, zipCode: event.target.value });
    };
    // const handleBirthdayChange = (event) => {
    //     setSelectedMember({...selectedMember, birthday: event.target.value});
    // }
    const handleEmailChange = (event) => {
        setSelectedMember({...selectedMember, email: event.target.value});
    }
    const handleGradeNoChange = (event) => {
        setSelectedMember({...selectedMember, gradeNo: event.target.value});
    }
    const handleMemberIdChange = (event) => {
        setSelectedMember({...selectedMember, memberId: event.target.value});
    }
    const handlePhoneChange = (event) => {
        setSelectedMember({...selectedMember, phone: event.target.value});
    }
    const handlePointChange = (event) => {
        setSelectedMember({...selectedMember, point: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateMember(selectedMember);
    };

          // 입력 항목에서 키 입력 이벤트 처리
    const handleKeyPress = (event) => {
        // event.key 또는 event.code를 사용하여 엔터 키를 체크
        if (event.key === 'Enter' || event.code === 'Enter') {
        searchMembers();
        }
    };

    return (
        <>
        <div div className='sellerMemberList'>
            <input type="text" value={searchTerm} onChange={handleSearchChange} onKeyPress={handleKeyPress}/>
            <button onClick={searchMembers}>검색</button>
            {members.map(member => (
                <div key={member.memberNo}>
                    <h6 onClick={() => handleMemberClick(member)}>{member.memberNo}.{member.memberName}</h6>
                    <button onClick={() => deleteMember(member.memberNo)}>삭제</button>
                </div>
            ))}
            
            {selectedMember && (
                <div className='sellerUpdateMember'>
                <form onSubmit={handleSubmit}>
                    <label>
                        비밀번호 :
                        <input type='password' onChange={handlePasswordChange}/>
                    </label>
                    <label>
                        이름:
                        <input type="text" value={selectedMember.memberName} onChange={handleNameChange} />
                    </label>
                    <label>
                        주소:
                        <input type="text" value={selectedMember.address} onChange={handleAddressChange} />
                    </label>
                    <label>
                        상세 주소:
                        <input type="text" value={selectedMember.addressDetail} onChange={handleAddressDetailChange} />
                    </label>
                    <label>
                        우편 번호:
                        <input type="text" value={selectedMember.zipCode} onChange={handleZipCodeChange} />
                    </label>
                    {/* <label>
                        생일:
                        <input type="date" value={selectedMember.birthday} onChange={handleBirthdayChange} />
                    </label> */}
                    <label>
                        이메일:
                        <input type="text" value={selectedMember.email} onChange={handleEmailChange} />
                    </label>
                    <label>
                        등급:
                        <input type="text" value={selectedMember.gradeNo} onChange={handleGradeNoChange} />
                    </label>
                    <label>
                        아이디:
                        <input type="text" value={selectedMember.memberId} onChange={handleMemberIdChange} />
                    </label>
                    <label>
                        전화번호:
                        <input type="text" value={selectedMember.phone} onChange={handlePhoneChange} />
                    </label>
                    <label>
                        포인트:
                        <input type="text" value={selectedMember.point} onChange={handlePointChange} />
                    </label>
                    <label>
                        할인율:
                       {selectedMember.pointRate}
                    </label>
                    <p>상태: {selectedMember.status}</p>
                    <button type="submit">수정 완료</button>
                </form>
                </div>
            )}

        </div>
        </>
    );
}
