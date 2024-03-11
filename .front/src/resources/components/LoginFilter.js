import { Link, Outlet, useNavigate } from "react-router-dom";

export default function LoginFilter(props) {
	
	const {loginMember} = props;
	const nav = useNavigate();

	if (!loginMember) {
		nav('/');
		alert("로그인 후 이용 가능합니다");
	}

	return(<Outlet />);
}