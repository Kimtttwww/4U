import React, { useEffect, useState } from 'react';

const sessionLoginMember = window.sessionStorage.getItem("loginMember");
const [loginMember, setLoginMember] = useState(sessionLoginMember ? JSON.parse(sessionLoginMember) : null);

useEffect(() => {
    // 세션에 로그인 정보가 있는 경우 상태 업데이트
    if (sessionLoginMember) {
        setLoginMember(JSON.parse(sessionLoginMember));
    }
}, []); // 마운트될 때 한 번만 실행되도록 빈 배열을 전달합니다.

export default function detailQna() {
    return (
        <>
        <table>
            <tr>
                <th className="w-px160">제목</th>
                <td colSpan="5" className="left">{vo.title}</td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>{vo.name}</td>
                <th className="w-px120">작성일자</th>
                <td className="w-px120">{vo.writedate}</td>
                <th className="w-px80">조회수</th>
                <td className="w-px80">{vo.readcnt}</td>
            </tr>
            <tr>
                <th>내용</th>
                <td colSpan="5" className="left">{vo.content}</td>
            </tr>
        </table>

        <div className="btnSet">
            <a className="btn-fill" href="list.qna">목록으로</a>
            {/* 관리자인 경우 수정 삭제 가능 */}
            {loginMember && loginMember.memberId === 'admin' && (
            <>
                <a className="btn-fill" href={`modify.qna?id=${vo.id}`}>수정</a>
                <a className="btn-fill" onClick={() => { if (window.confirm('정말 삭제하시겠습니까?')) window.location.href = `delete.qna?id=${vo.id}` }}>삭제</a>
            </>
            )}

            {/* 로그인이 된 경우 답글 쓰기 가능 */}
            {!isEmpty(loginMember) && (
                <a className="btn-fill" href={`reply.qna?id=${vo.id}`}>답글 쓰기</a>
            )}
        </div>
    </>
    );
}
