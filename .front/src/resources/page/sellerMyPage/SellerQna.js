import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/qna/ListQna.css';
import Cookies from 'js-cookie';

export default function SellerQna() {
    const [loginMember, setLoginMember] = useState(Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null);
	const [expandedIndex, setExpandedIndex] = useState(null);
	const [showAnswerBox, setShowAnswerBox] = useState(false);
	const [answerText, setAnswerText] = useState('');
    const [listQna, setListQna] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = listQna.slice(indexOfFirstItem, indexOfLastItem);

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(listQna.length / itemsPerPage); i++) {
		pageNumbers.push(i);
	}

    const toggleAnswer = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
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

	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const nextPage = () => setCurrentPage(currentPage + 1);
	const prevPage = () => setCurrentPage(currentPage - 1);



    useEffect(() => {
		fetchQnaList();
	}, []);

    const fetchQnaList = async () => {
        try {
            const response = await axios.get('/sellerqna/list');
            setListQna(response.data);
        } catch (error) {
            console.error('Error fetching Q&A list:', error);
        }
    };



    return (
        <>
            <ul className='qnaList'>
            {currentItems.map((qna, index) => (
                <li key={index} onClick={() => toggleAnswer(index)}>
                    <h2>{qna.qnaTitle}</h2>
                    <p>{qna.qnaContent}</p>
                    <p>작성자: {qna.memberId}</p>
                    <p>작성일자: {qna.createDate}</p>
                    <div className="answerStatus">
                        {qna.qnaAnswer ? <p>답변 완료</p> : <p>답변 대기</p>}
                        {loginMember.memberNo === 1 && qna.qnaAnswer === null && (
                            <button onClick={() => setShowAnswerBox(!showAnswerBox)}>답변</button>
                        )}
                    </div>
                    {qna.qnaAnswer !== null && (
                        <div className={`answerBox ${expandedIndex === index ? 'expanded' : ''}`}>
                            <p>{qna.qnaAnswer}</p>
                            <p>{qna.answerDate}</p>
                        </div>
                    )}
                    {loginMember.memberNo === 1 && qna.qnaAnswer === null && (
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
    </>
    )
}