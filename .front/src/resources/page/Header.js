import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Header.css";

export default function Header(props) {

    // 로그인창 띄울떄 필요한 매개변수
    const {setShowLogin} = props;

    const [login, setLogin] = useState(false);
    
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "instant"
            });
        };
    
    return (
        <div className="header">
            <div className='menubar'>
                <div className="loginMenu">
                    {login ? (
                        <>
                            <button type='button'>로그아웃</button>
                            <Link to={""}>마이페이지</Link>
                        </>
                    ) : (
                        <>
                            <button type='button' className='login' onClick={() => {setShowLogin(true)}}>로그인</button>
                            <Link to={""} className='enroll'>회원가입</Link>
                        </>
                    )}
                </div>

            <div className="logo-container">
                <Link to="/" className='logo' onClick={scrollToTop}>4U</Link>
            </div>
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="검색어를 입력하세요" />
                    <button className="search-button">
                        <img src="https://xexymix.jpg3.kr/xexymix/2020/main/menu_view.png" alt="Search Icon" className="search-icon" />
                    </button>
                </div>
            </div>

        </div>
    )
}