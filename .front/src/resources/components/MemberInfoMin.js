import axios from "axios";
import { useEffect, useState } from "react"

export default function MemberInfoMin(props) {
	
	const {loginMember, setLoginMember, showMemberInfo, setShowMemberInfo} = props;
	const [gradeList, setGradeList] = useState([]);
	

	useEffect(() => {
		axios.get("/member/grade")
		.then((data) => {
			let gList = data.data;
			
			if(loginMember) {
				let {gradeNo} = loginMember;
				let member = {
					address: loginMember.address,			addressDetail: loginMember.addressDetail,
					birthday: loginMember.birthday,		createDate: loginMember.createDate,
					email: loginMember.email,				memberId: loginMember.memberId,
					memberName: loginMember.memberName,	memberNo: loginMember.memberNo,
					memberPwd: loginMember.memberPwd,	phone: loginMember.phone,
					point: loginMember.point,				pointRate: loginMember.pointRate,
					status: loginMember.status,			zipCode: loginMember.zipCode,
					grade: gradeNo ? gList.find((grade) => grade.gradeNo === loginMember.gradeNo) : loginMember.grade
				}
				setLoginMember(member);
			}
			
			setGradeList(gList);
		}).catch((error) => {
			console.log(error);
			alert("회원등급 조회 중 에러가 발생했습니다");
		});
	}, []);

	/**
	 * 회원의 다음 등급 안내 출력 fn
	 * @returns 회원의 다음 등급을 안내하는 태그들
	 */
	function printTargetGrade() {
		let currentGradeIndex;
		let nextGradeName;

		if(gradeList) {
			currentGradeIndex = gradeList.findIndex((grade) => grade.gradeNo === loginMember?.grade?.gradeNo);
			nextGradeName = currentGradeIndex === 5 || currentGradeIndex === gradeList.length - 1 ? gradeList[currentGradeIndex]?.gradeName : gradeList[currentGradeIndex + 1]?.gradeName;
		}

		return(<>
			<h5>{nextGradeName} 까지 [{}]</h5>
		</>);
	}

	return(<>
		<div className="sideBarContent">
			<h2>{loginMember.memberName} 님 환영합니다 !!!</h2>
			
			<h5>현재 등급 : {loginMember?.grade?.gradeName}</h5>
			{printTargetGrade()}
		</div>
	</>)
}