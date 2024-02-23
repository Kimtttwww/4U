import { useState, useEffect } from 'react';

export default function newQna() {

    // const sessionLoginMember = window.sessionStorage.getItem("loginMember");
    // const [loginMember, setLoginMember] = useState(sessionLoginMember ? JSON.parse(sessionLoginMember) : null);

    // useEffect(() => {
    //     // 세션에 로그인 정보가 있는 경우 상태 업데이트
    //     if (sessionLoginMember) {
    //         setLoginMember(JSON.parse(sessionLoginMember));
    //     }
    // }, []); // 마운트될 때 한 번만 실행되도록 빈 배열을 전달합니다.

    // return (
    //     <>
    //     <h3>신규 QNA</h3>

    //     <form action="insert.qna" method="post" enctype="multipart/form-data">
    //         <table>
    //             <tr>
    //                 <th class="w-px160">제목</th>
    //                 <td><input type="text" name="title" class="need" /></td>
    //             </tr>
    //             <tr>
    //                 <th>작성자</th>
    //                 <td>{loginMember.memberId}</td>
    //             </tr>
    //             <tr>
    //                 <th>내용</th>
    //                 <td><textarea name="content" class="need"></textarea></td>
    //             </tr>
    //         </table>
    //     </form>
    //     <div class="btnSet">
    //         <a class="btn-fill" onclick="if(necessary()) $('form').submit()">저장</a>
    //         <a class="btn-empty" href="list.qna">취소</a>
    //     </div>

    // <script type="text/javascript" src="js/need_check.js?v=<%=new java.util.Date().getTime() %>"></script>
    // <script type="text/javascript" src="js/file_attach.js"></script>
    //     </>
    // );
}