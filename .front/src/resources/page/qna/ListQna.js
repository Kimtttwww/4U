import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/qna/ListQna.css';

export default function ListQna() {
    
    const sessionLoginMember = window.sessionStorage.getItem("loginMember");
    const [loginMember, setLoginMember] = useState(sessionLoginMember ? JSON.parse(sessionLoginMember) : null);

    useEffect(() => {
        // 세션에 로그인 정보가 있는 경우 상태 업데이트
        if (sessionLoginMember) {
            setLoginMember(JSON.parse(sessionLoginMember));
        }
    }, []); // 마운트될 때 한 번만 실행되도록 빈 배열을 전달합니다.

    const [listQna, setListQna] = useState([]); // Q&A 목록을 저장할 상태

    useEffect(() => {
        // 페이지가 로드될 때 Q&A 목록을 서버에서 가져오는 함수 호출
        fetchQnaList();
    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    // Q&A 목록을 가져오는 함수
    const fetchQnaList = async () => {
        try {
            const response = await axios.get('/qna/listqna'); // 서버로 GET 요청
            setListQna(response.data); // 서버에서 받은 데이터로 Q&A 목록 상태 업데이트
            console.log(listQna);
        } catch (error) {
            console.error('Error fetching Q&A list:', error);
        }
    };

    const [expandedIndex, setExpandedIndex] = useState(null);
    
    const toggleAnswer = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };


    return (
        <div className='qnaContainer'>
            <h1>Q&A 목록</h1>
            <ul className='qnaList'>
                {listQna.map((qna, index) => (
                    <li key={index} onClick={() => toggleAnswer(index)}>
                        <h2>{qna.qnaTitle}</h2>
                        <p>{qna.qnaContent}</p>
                        <p>작성자: {qna.memberId}</p>
                        <p>작성일자: {qna.createDate}</p>
                        <div className="answerStatus">
                            {qna.qnaAnswer ? <p>답변 완료</p> : <p>답변 대기</p>}
                            {loginMember.grade === 99 ? <button>답변</button> : null}
                        </div>
                        <div className={`answerBox ${expandedIndex === index ? 'expanded' : ''}`}>
                            <p>{qna.qnaAnswer}</p>
                            <p>{qna.answerDate}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
