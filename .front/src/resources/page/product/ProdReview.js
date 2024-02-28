import { useEffect, useRef, useState } from "react";
import "../../css/product/ProdReview.css";
import axios from "axios";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";

/**
 * 해당 상품의 리뷰들
 * @props props
 * 	@param {number} prodNo 해당 상품의 상품 번호
 */
export default function ProdReview(props) {
	
	const {prodNo} = props;
	const [loginMember, setLoginMember] = useState(null);
	const [reviewList, setReviewList] = useState([]);
	const [isBuyed, setIsBuyed] = useState(false);
	const [review, setReview] = useState({});
	const [validated, setValidated] = useState(false);
	const ratingImages = useRef([]);

	useEffect(() => {
		let strLoginMember = sessionStorage.getItem("loginMember");
		
		// 해당 상품의 리뷰 목록 조회
		axios.get("/product/review/" + prodNo)
		.then((data) => {
			setReviewList(data?.data);
		}).catch((error) => {
			console.log(error);
			alert("리뷰를 불러오는 중 문제가 발생했습니다");
		});
		
		if(strLoginMember) {
			strLoginMember = JSON.parse(strLoginMember);
			setLoginMember(strLoginMember);

			axios.get("/product/review/check", {prodNo, memberNo: strLoginMember?.memberNo})
			.then((data) => {setIsBuyed(data.data)})
			.catch((error) => {
				console.log(error);
				alert("정보를 불러오는 중 문제가 발생했습니다");
			});
		}
	}, []);

	/**
	 * 각 리뷰별 평점 출력 fn
	 * @param {number} rating 해당 리뷰의 평점
	 * @returns 평점을 표현하는 태그들
	 */
	function printRating(rating) {
		let element = [];
		if(!rating) rating = 0;

		for (let i = 0; i < 5; i++) {
			if(rating < 0) {
				element.push(<img ref={(e) => ratingImages.current[i] = e} onClick={writeReview} id={"img" + i} src="/photo/noPoint.svg" alt={i+1+"점"} />);
			} else {
				if(i + 1 <= rating) {
					element.push(<img src="/photo/point.svg" alt={i+1+"점"} />);
				} else {
					element.push(<img src="/photo/noPoint.svg" alt={i+1+"점"} />);
				}
			}
		}
		return element;
	}

	/**
	 * 각 리뷰별 작성자 정보 출력 fn
	 * @param {object} review 하나씩 꺼내 반복중인 리뷰
	 * @returns 작성자 정보를 표현하는 태그들
	 */
	function printMember(review) {return review.height && review.weight ? (<p>{review.height} / {review.weight}</p>) : ""}
	
	/**
	 * 각 리뷰별 기타 정보 출력 fn
	 * @param {object} review 하나씩 꺼내 반복중인 리뷰
	 * @returns 기타 정보를 표현하는 태그들
	 */
	function printOther(review) {
		let element = [];

		if(review.top) element.push(<p>상의 {review.top}</p>);
		if(review.bottom) element.push(<p>하의 {review.bottom}</p>);
		if(review.isTrueToSize) element.push(<p>{review.isTrueToSize}</p>);

		return element;
	}

	/**
	 * 리뷰 작성 내용 반영 fn
	 * @param {SyntheticBaseEvent} e 이벤트 객체
	 */
	function writeReview(e) {
		if(!loginMember) {
			alert("로그인 후 이용 가능합니다");
			return;
		}

		if(e.target.id.includes("img")) {
			const num = Number(e.target.id.charAt(e.target.id.length - 1));
			setReview({...review, rating: num + 1});
			
			ratingImages.current.forEach((img, i) => {
				if(i <= num) {img.src = '/photo/point.svg'
				} else {img.src = '/photo/NoPoint.svg'}
			});
		} else{
			setReview({...review, [e.target.id]:e.target.value});
		}
	}

	/**
	 * 리뷰 등록 조건 체크 밎 리뷰 등록 fn
	 * @param {SyntheticBaseEvent} e 이벤트 객체
	 * @todo 나중에 리뷰 입력 검사 fn으로 개조 예정
	 */
	function handleSubmit(event) {
		event.preventDefault();	// 페이지 이동을 막음(추정)
		event.stopPropagation();	// ???

		if(!loginMember) {
			alert("로그인 후 이용 가능합니다");
			return;
		}
		
		if (event.currentTarget.checkValidity()) {	// 필수 작성 여부 체크
			const {rating, reviewContent} = review;

			if(rating && reviewContent) {
				
			}


			setReview({});
		}
		
		setValidated(true);
	};

	return (<>
		<h2>구매 후기</h2>

		<section className="review-list">
			{reviewList.length && reviewList.map((review) => (
				<article key={review.reviewNo} className="review">
					<figure>
						<picture className="ratingBox">
							{printRating(review?.rating)}
						</picture>
						<figcaption className="review-content">
							{review?.reviewContent}
						</figcaption>
					</figure>
					<aside className="reviewer">
						<div>
							<p>{review.memberName} / {review.createDate.split(" ")[0]}</p>
							{printMember(review)}
						</div>
						<div>
							{printOther(review)}
						</div>
					</aside>
				</article>
			)) }
		</section>

		<Form className="review-write" validated={validated} onSubmit={handleSubmit} noValidate>
			<section>
				<figure className="ratingBox">
					{printRating(-1)}
				</figure>
				<Row>
					<InputGroup hasValidation>
						<Form.Group as={Col} controlId="reviewContent">
						<Form.Control as={"textarea"} onChange={writeReview} rows={4} style={{resize: "none"}} disabled={!isBuyed} required />
						<Form.Control.Feedback type="invalid" tooltip>필수 항목입니다</Form.Control.Feedback>
						</Form.Group>
					</InputGroup>
				</Row>
			</section>
			<section>
				<Row>
					<Form.Group as={Col} controlId="height">
						<Form.Control type="number" onChange={writeReview} placeholder="키" disabled={!isBuyed} />
					</Form.Group>
					<Form.Group as={Col} controlId="weight">
						<Form.Control type="number" onChange={writeReview} placeholder="몸무게" disabled={!isBuyed} />
					</Form.Group>
				</Row>
				<Row>
					<Form.Group as={Col} controlId="top">
						<Form.Control type="number" onChange={writeReview} placeholder="상의 기장" disabled={!isBuyed} />
					</Form.Group>
					<Form.Group as={Col} controlId="bottom">
						<Form.Control type="number" onChange={writeReview} placeholder="하의 기장" disabled={!isBuyed} />
					</Form.Group>
				</Row>
				<Row>
					<InputGroup as={Col} hasValidation>
							<Form.Select id="isTrueToSize" onChange={writeReview} disabled={!isBuyed}>
								<option value={""}>- 선택 -</option>
								<option>정사이즈에요</option>
								<option>정사이즈보다 커요</option>
								<option>정사이즈보다 작아요</option>
						</Form.Select>
						<Form.Control.Feedback>모두 선택 항목입니다</Form.Control.Feedback>
					</InputGroup>
				</Row>
				<Row>
					<InputGroup as={Col}>
						<Button type="submit">작성</Button>
					</InputGroup>
				</Row>
			</section>
		</Form>

		<space>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
		</space>
	</>);
}