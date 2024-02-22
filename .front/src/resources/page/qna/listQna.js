import React from 'react';

export default function QnaList() {
    
    // const sessionLoginMember = window.sessionStorage.getItem("loginMember");
    // const [loginMember, setLoginMember] = useState(sessionLoginMember ? JSON.parse(sessionLoginMember) : null);
    
    // useEffect(() => {
    //     // 세션에 로그인 정보가 있는 경우 상태 업데이트
    //     if (sessionLoginMember) {
    //         setLoginMember(JSON.parse(sessionLoginMember));
    //     }
    // }, []); // 마운트될 때 한 번만 실행되도록 빈 배열을 전달합니다.

    // return (
    //     <div>
    //         <form method="post" action="list.qna" id="list">
    //             <input type="hidden" name="curPage" value="1" />

    //             <div id="list-top">
    //                 <div>
    //                     <ul>
    //                         <li>
    //                             <select name="search" className="w-px80">
    //                                 <option value="all" selected={page.search === 'all'}>전체</option>
    //                                 <option value="title" selected={page.search === 'title'}>제목</option>
    //                                 <option value="content" selected={page.search === 'content'}>내용</option>
    //                                 <option value="writer" selected={page.search === 'writer'}>작성자</option>
    //                             </select>
    //                         </li>
    //                         <li><input value={page.keyword} type="text" name="keyword" className="w-px300" /></li>
    //                         <li><button type="submit" className="btn-fill">검색</button></li>
    //                     </ul>
    //                     <ul>
    //                         {(loginMember && loginMember.memberId === 'admin') && <li><a className="btn-fill" href="new.qna">글쓰기</a></li>}
    //                     </ul>
    //                 </div>
    //             </div>
    //         </form>

    //         <table>
    //             <thead>
    //                 <tr>
    //                     <th className="w-px60">번호</th>
    //                     <th>제목</th>
    //                     <th className="w-px100">작성자</th>
    //                     <th className="w-px120">작성일자</th>
    //                     <th className="w-px60">첨부파일</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {page.list.map(vo => (
    //                     <tr key={vo.id}>
    //                         <td>{vo.no}</td>
    //                         <td className="left">
    //                             {[...Array(vo.indent)].map((_, index) => (
    //                                 <React.Fragment key={index}>
    //                                     {index + 1 === vo.indent ? <img src="img/re.gif" /> : '\u00A0\u00A0'}
    //                                 </React.Fragment>
    //                             ))}
    //                             <a href={`detail.qna?id=${vo.id}`}>{vo.title}</a>
    //                         </td>
    //                         <td>{vo.writer}</td>
    //                         <td>{vo.writedate}</td>
    //                         <td>
    //                             {!vo.filename ? null : (
    //                                 <a href={`download.qna?id=${vo.id}`}>
    //                                     <img title={vo.filename} className="file-img" src="img/attach.png" />
    //                                 </a>
    //                             )}
    //                         </td>
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>
    // );
}
