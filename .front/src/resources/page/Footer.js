import { Link } from "react-bootstrap/lib/Navbar"
import "../css/Footer.css";

export default function Footer(){

	return(
		<div className="footer">
		<div className="footer-text1">
			<Link to="">STORE (주)4U</Link>
		
			<Link to="">OWNER · 송다연</Link>
		
			<Link to="">COMPANY REG.NO  ·  120-80-90690</Link>
		
			<Link to="">NETWORK REG.NO  · 제 2014-경기성남-2239호 · CHECK</Link>
		</div>
		<div className="footer-text2">
			<Link to="">ADDRESS · 13646 경기도 성남시 수정구 위례광장로 21-9 (창곡동) 위례우남역 KCC 웰츠타워 41층 4001호</Link>
		
			<Link to="">MASTER · 강민구 · attize@naver.com</Link>
		</div>
		<div className="footer-text3">
			<p>4U</p> 
			<p> Copyrightⓒ 4U. ALL RIGHTS RESERVED</p>
		</div>
	</div>
	)
}