import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../../css/qna/ListQna.css';

export default function ListQna() {
    const sessionLoginMember = window.sessionStorage.getItem("loginMember");
    const [loginMember, setLoginMember] = useState(sessionLoginMember ? JSON.parse(sessionLoginMember) : null);
    const [listQna, setListQna] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [showAnswerBox, setShowAnswerBox] = useState(false);
    const [newQnaTitle, setNewQnaTitle] = useState('');
    const [newQnaContent, setNewQnaContent] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        if (sessionLoginMember) {
            setLoginMember(JSON.parse(sessionLoginMember));
        }
    }, []);

    useEffect(() => {
        fetchQnaList();
    }, []);

    const fetchQnaList = async () => {
        try {
            const response = await axios.get('/qna/listqna');
            setListQna(response.data);
        } catch (error) {
            console.error('Error fetching Q&A list:', error);
        }
    };

    const toggleAnswer = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    const handleNewQnaTitleChange = (e) => {
        setNewQnaTitle(e.target.value);
    }

    const handlenewQnaContentChange = (e) => {
        setNewQnaContent(e.target.value);
    }

    const handleNewQnaSubmit = async () => {
        try {
            const response = await axios.post('/qna/newqna',{
                qnaTitle : newQnaTitle,
                qnaContent : newQnaContent,
                memberNo: loginMember.memberNo
            });
            console.log('새글:', response.data);
            setNewQnaTitle('');
            setNewQnaContent('');
            setShowModal(false);
            fetchQnaList(); // 새로운 질문 추가 후 목록을 다시 불러옴
        } catch (error) {
            console.error('새글 에러', error);
        }
    };

    const handleAnswerChange = (e) => {
        setAnswerText(e.target.value);
    };

    const handleAnswerSubmit = async (index) => {
        try {
            const response = await axios.post('/qna/addanswer', {
                qnaNo: listQna[index].qnaNo,
                answerText: answerText
            });
            console.log('답변 제출 결과:', response.data);
            setAnswerText('');
            setExpandedIndex(null);
            fetchQnaList(); // 답변 추가 후 목록을 다시 불러옴
        } catch (error) {
            console.error('답변 제출 에러:', error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = listQna.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listQna.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    return (
        <div className='qnaContainer'>
            <h1>Q&A 목록</h1>
            {loginMember !== null ? <button onClick={toggleModal}>작성</button> : null}

            <Modal show={showModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>작성하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='newQnaModal'>
                            <input type='text' placeholder='제목을 입력하세요.' value={newQnaTitle} className='qnaTitle' onChange={handleNewQnaTitleChange}/>
                            <textarea placeholder='내용을 입력하세요.' value={newQnaContent} className='qnaContent' onChange={handlenewQnaContentChange}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleNewQnaSubmit()}>작성</Button>
                    <Button variant="secondary" onClick={toggleModal}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            <ul className='qnaList'>
                {currentItems.map((qna, index) => (
                    <li key={index} onClick={() => toggleAnswer(index)}>
                        <h2>{qna.qnaTitle}</h2>
                        <p>{qna.qnaContent}</p>
                        <p>작성자: {qna.memberId}</p>
                        <p>작성일자: {qna.createDate}</p>
                        <div className="answerStatus">
                            {qna.qnaAnswer ? <p>답변 완료</p> : <p>답변 대기</p>}
                            {loginMember.memberName === '장현진' && qna.qnaAnswer === null && (
                                <button onClick={() => setShowAnswerBox(!showAnswerBox)}>답변</button>
                            )}
                        </div>
                        {qna.qnaAnswer !== null && (
                            <div className={`answerBox ${expandedIndex === index ? 'expanded' : ''}`}>
                                <p>{qna.qnaAnswer}</p>
                                <p>{qna.answerDate}</p>
                            </div>
                        )}
                        {qna.qnaAnswer === null && (
                            <div className={`answerBox ${expandedIndex === index ? 'expanded' : ''}`}>
                                <textarea value={answerText} onChange={handleAnswerChange}  onClick={(e) => e.stopPropagation()} />
                                <button onClick={() => handleAnswerSubmit(index)}>제출</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={() => prevPage()}>이전</button>
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)}>
                        {number}
                    </button>
                ))}
                <button onClick={() => nextPage()}>다음</button>
            </div>
        </div>
    );
}
