import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Topbar.css";

export default function Header(props) {

    // 로그인창 띄울떄 필요한 매개변수
    const {setShowLogin} = props;

    const [login, setLogin] = useState(false);

    return (
        <div className="header">
            <div className='menubar'>
                <div className="loginMenu">
                    {login ? (
                        <>
                            <Link to="">로그아웃</Link>
                            <Link to="">마이페이지</Link>
                        </>
                    ) : (
                        <>
                            {/* 나중에 링크말고 다른걸로(btn, div, span 등) 바꿀 것 */}
                            <Link to="" onClick={() => {setShowLogin(true)}}>로그인</Link>
                            <Link to="">회원가입</Link>
                        </>
                    )}
                </div>

                <div class="search-container">
                    <input type="text" class="search-input" placeholder="검색어를 입력하세요" />
                    <button class="search-button">
                        <img src="/images/search-icon.png" alt="Search Icon" class="search-icon" />
                    </button>
                </div>
            </div>
            <div className="logo-container">
                <Link to="/" className='logo'>4U</Link>
            </div>

        </div>
    )
}