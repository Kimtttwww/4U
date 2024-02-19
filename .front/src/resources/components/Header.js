import { Link } from "react-router-dom";
import "../css/common/Header.css";

/** App의 header
 * @props props
 * 	@param {function} setShowLogin 로그인 모달창의 표시 여부 state's setter fn
 * 	@param {boolean} login 로그인 된 사용자 정보를 가지고 있을 state
 * 	@param {function} setLogin 로그인 된 사용자 정보를 가지고 있을 state's setter fn
 */
export default function Header(props) {

    // 로그인창 띄울떄 필요한 매개변수
	const {setShowLogin, login, setLogin} = props;
    
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
        };

    return (
        <>
            <div className="header">
                <div className='menubar'>
                    <div className="loginMenu">
                        {login ? (
                            <>
                                {/* 나중에 링크말고 다른걸로(btn, div, span 등) 바꿀 것 */}
                                <button onClick={() => {
                                    sessionStorage.removeItem("loginMember");
                                    setLogin("");
                                    }}>로그아웃</button>
                                <Link to={"/buyer/mypage/"}>{login.memberName}의 마이페이지</Link>
                            </>
                        ) : (
                            <>
                                {/* 나중에 링크말고 다른걸로(btn, div, span 등) 바꿀 것 */}
                                <button onClick={() => {setShowLogin(true)}}>로그인</button>
                                <Link to="/member/SignUp">회원가입</Link>
                            </>
                        )}
                    </div>

                    <div className="logo-container">
                        <Link to="/" className='logo' onClick={scrollToTop}><p>4U</p></Link>
                    </div>
                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="검색어를 입력하세요" />
                        <button className="search-button">
                            <img src="https://xexymix.jpg3.kr/xexymix/2020/main/menu_view.png" alt="Search Icon" className="search-icon" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}