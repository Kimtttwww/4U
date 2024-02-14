import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/Topbar.css";

export default function Topbar() {

    const [login, setLogin] = useState(false);

    return (
        <div className="header">
            <div className='menubar'>
                <div className="loginMenu">
                    {login ? (
                        <>
                            <Link to={""}>로그아웃</Link>
                            <Link to={""}>마이페이지</Link>
                        </>
                    ) : (
                        <>
                            <Link to={""}>로그인</Link>
                            <Link to={""}>회원가입</Link>
                        </>
                    )}
                </div>

                <div className="search-container">
                    <input type="text" className="search-input" placeholder="검색어를 입력하세요" />
                    <button className="search-button">
                        <img src="/images/search-icon.png" alt="Search Icon" className="search-icon" />
                    </button>
                </div>
            </div>
            <div className="logo-container">
                <Link to={"/"} className='logo'>4U</Link>
            </div>

        </div>
    )
}