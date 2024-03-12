import axios from "axios";
import "../../css/sellerMyPage/SellerReview.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function SellerReview (){

    const [loginMember, setLoginMember] = useState(Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null);
    const [notice, setNotice] = useState([]);

    const fetchNotice = async () => {
        try {
            const response = await axios.get(`/member/notice/${loginMember.memberNo}`);
            setNotice(response.data);
        } catch (error) {
            console.error('노티스 정보 에러:', error);
        }
    };

    console.log(notice);

    const handleDelete = async (noticeNo) => {
        try {
            const response = await axios.delete(`/member/noticeDelete/${noticeNo}`);
            if (response.status === 200) {
                const updatedNotice = notice.filter(n => n.noticeNo !== noticeNo);
                setNotice(updatedNotice);
            }
        } catch (error) {
            console.error('알림 삭제 에러', error);
        }
    };


    useEffect(() => {
        fetchNotice();
    }, [])

    console.log(notice);

    return(
        <div className="SellerReview">
            <div>
                <h2>리뷰 관리 (알림)</h2>
            </div>
            <article>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>내용</th>
                            <th>날짜</th>
                            <th>-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notice.map((notice) => (
                            <tr key={notice.noticeNo}>
                                <td>{notice.noticeNo}</td>
                                <td>{notice.memberName}({notice.memberId}){notice.noticeMessage}</td>
                                <td>24-01-28 16:15</td>
                                <td><button onClick={() => handleDelete(notice.noticeNo)}>삭제</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </article>
        </div>
    )
}