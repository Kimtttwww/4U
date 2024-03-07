import { Link } from "react-router-dom";
import "../css/common/Header.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

/** App의 header
 * @props props
 * 	@param {function} setShowLogin 로그인 모달창의 표시 여부 state's setter fn
 * 	@param {boolean} login 로그인 된 사용자 정보를 가지고 있을 state
 * 	@param {function} setLogin 로그인 된 사용자 정보를 가지고 있을 state's setter fn
 */
export default function Header(props) {

	const [scrolled, setScrolled] = useState(false);
	const [mobile, setMobile] = useState(false);

	//화면 크기 감지
	useEffect(() => {
		const handleResize = () => {
		  setMobile(window.innerWidth < 1200);
		};
			handleResize();
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}, []);

	//스크롤 감지
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
	  }, []);

	  //스크롤 감지
	  const handleScroll = () => {
		if (window.scrollY > 0) {
		  setScrolled(true);
		} else {
			setScrolled(false);
		}
	  };

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
            <div className={`header ${scrolled ? 'scrolled' : ''}`}>
                <div className='menubar'>
                    <div className="logo-container">
                        <Link to="/" className='logo' onClick={scrollToTop}><p>4U</p></Link>
					</div>
                    <div className="empty-container"></div>
                    <div className="loginMenu">
                    {login ? (
                        <>
                            <button className="header-logout" onClick={() => {
                                Cookies.remove("loginMember");
                                setLogin(null);
                            }}><img src="/photo/free-icon-arrow-10901692.png" />로그아웃</button>
                            <Link className="header-mypage" to={login.memberName === '관리자' ? "/sellerMypage/" : "/buyer/mypage/"}>{login.memberName}님의 마이페이지</Link>
                        </>
                    ) : (
                        <>
                            {mobile ? (
                                <>
                                    <Link className="header-signUp-icon" to="/member/SignUp"><img src="/photo/free-icon-join-5860890.png" />Sign up</Link>
                                    <button className="header-login-icon"><img src="/photo/free-icon-login-6681235.png" onClick={() => {setShowLogin(true)}} />Log in</button>
                                </>
                            ) : (
                                <>
                                    <Link className="header-signUp" to="/member/SignUp">회원가입</Link>
                                    <button className="header-login" onClick={() => {setShowLogin(true)}}>로그인</button>
                                </>
                            )}
                        </>
                    )}
                    </div>
                    
                </div>
            </div>
        </>
    )
}