import { useEffect, useRef, useState } from "react";
import "../../css/product/ProdReview.css";
import axios from "axios";
import { Button, Col, FloatingLabel, Form, InputGroup, Row } from "react-bootstrap";
import Cookies from "js-cookie";

/**
 * 해당 상품의 리뷰들
 * @props props
 * 	@param {number} prodNo 해당 상품의 상품 번호
 */
export default function ProdReview(props) {
	
	const {prodNo} = props;
	const [loginMember, setLoginMember] = useState(Cookies.get("loginMember") ? JSON.parse(Cookies.get("loginMember")) : null);
	const [reviewList, setReviewList] = useState([]);
	const [isBuyed, setIsBuyed] = useState(false);
	const [review, setReview] = useState({});
	const [validated, setValidated] = useState(false);
	const [printRatingVar, setPrintRatingVar] = useState(-1);
	const [counter, setCounter] = useState(0);
	const ratingImages = useRef([]);
	const reviewInputs = useRef([]);

	useEffect(() => {
		if(loginMember) {
			axios.get("/product/review/check?prodNo=" + prodNo + "&memberNo=" + loginMember?.memberNo)
			.then((data) => {setIsBuyed(data.data)})
			.catch((error) => {
				console.log(error);
				alert("상품의 리뷰를 불러오는 중 문제가 발생했습니다");
			});
		}

		selectReviewList();
	}, []);

	/**
	 * 해당 상품의 리뷰 목록 조회
	 */
	function selectReviewList() {
		axios.get("/product/review/" + prodNo)
		.then((data) => {
			setReviewList(data?.data);
		}).catch((error) => {
			console.log(error);
			alert("리뷰를 불러오는 중 문제가 발생했습니다");
		});
	}

	/**
	 * 각 리뷰별 평점 출력 fn
	 * @param {number} rating 해당 리뷰의 평점
	 * @returns 평점을 표현하는 태그들
	 */
	function printRating(rating) {
		let element = [];
		if(!rating) rating = 0;

		for (let i = 0; i < 5; i++) {
			if(rating <= -100) {
				if(i + 1 <= Math.abs(rating / 100)) {
					element.push(<img key={i} ref={(e) => ratingImages.current[i] = e} id={"img" + i} onClick={writeReview} src="/photo/point.svg" alt={i+1+"점"} />);
				} else {
					element.push(<img key={i} ref={(e) => ratingImages.current[i] = e} id={"img" + i} onClick={writeReview} src="/photo/noPoint.svg" alt={i+1+"점"} />);
				}
			} else if(rating < 0) {
				element.push(<img key={i} ref={(e) => ratingImages.current[i] = e} id={"img" + i} onClick={writeReview} src="/photo/noPoint.svg" alt={i+1+"점"} />);
			} else {
				if(i + 1 <= rating) {
					element.push(<img key={i} src="/photo/point.svg" alt={i+1+"점"} />);
				} else {
					element.push(<img key={i} src="/photo/noPoint.svg" alt={i+1+"점"} />);
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
	function printMember(review) {return review.height && review.weight ? (<p>{review.height}cm / {review.weight}kg</p>) : ""}
	
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
		
		if (!isBuyed) {
			alert("상품 구매자만 리뷰 작성 가능합니다");
			return;
		}

		if(e.target.id.includes("img")) {	// 평점 변경한 경우
			const num = Number(e.target.id.charAt(e.target.id.length - 1));
			setReview({...review, rating: num + 1});
			
			ratingImages.current.forEach((img, i) => {
				if(i <= num) {img.src = '/photo/point.svg'
				} else {img.src = '/photo/NoPoint.svg'}
			});
		} else{	// 리뷰내용, 기타 정보 변경한 경우
			setReview({...review, [e.target.id]:e.target.value});
		}
	}

	/**
	 * 리뷰 등록 조건 체크 밎 리뷰 등록 및 리뷰 수정 fn
	 * @param {SyntheticBaseEvent} e 이벤트 객체
	 */
	function handleSubmit(e) {
		e.preventDefault();	// 페이지 이동을 막음(추정)
		e.stopPropagation();	// ???

		if(!loginMember) {
			alert("로그인 후 이용 가능합니다");
			return;
		}

		if (!isBuyed) {
			alert("상품 구매자만 리뷰 작성 가능합니다");
			return;
		}
		
		if (e.currentTarget.checkValidity()) {	// 필수 작성 여부 체크
			if(!reviewInputs.current[1].value) {	// 신규 리뷰
				axios.post("/product/review", {...review, prodNo, memberNo:loginMember.memberNo})
				.then((data) => {
					if(data) alert("리뷰가 작성되었습니다");
					else alert("리뷰 등록 중 문제가 발생했습니다");
				}).catch((error) => {
					console.log(error);
					alert("리뷰 작성 중 문제가 발생했습니다");
				});

				selectReviewList();
			} else {	// 리뷰 수정
				let rating = ratingImages.current.findIndex((e) => e.src.split("/").reverse()[0].includes("no"));

				let updReview = {
					reviewNo: reviewInputs.current[1].value,
					prodNo, memberNo:loginMember.memberNo,
					rating: rating < 0 ? 5 : rating,
					reviewContent: reviewInputs.current[0].value,
					height: reviewInputs.current[2].value,
					weight: reviewInputs.current[3].value,
					top: reviewInputs.current[4].value,
					bottom: reviewInputs.current[5].value,
					isTrueToSize: reviewInputs.current[6].value
				}
				
				axios.put("/product/review", updReview)
				.then((data) => {
					if(data) alert("리뷰가 수정되었습니다");
					else alert("리뷰 변경 중 문제가 발생했습니다");
				}).catch((error) => {
					console.log(error);
					alert("리뷰 수정 중 문제가 발생했습니다");
				});

				cancleEditReview();
			}
			
			e.target.reset();
			setReview({});
			setCounter(counter + 1);
		}

		setValidated(!e.currentTarget.checkValidity());
	}

	// 리뷰 수정 밑작업 fn
	function subEditReview(review) {
		reviewInputs.current[0].value = review.reviewContent;
		reviewInputs.current[1].value = review.reviewNo;
		reviewInputs.current[2].value = review.height === 0 ? "" : review.height;
		reviewInputs.current[3].value = review.weight === 0 ? "" : review.weight;
		reviewInputs.current[4].value = review.top;
		reviewInputs.current[5].value = review.bottom;
		reviewInputs.current[6].value = review.isTrueToSize;
		reviewInputs.current[7].innerText = "수정";
		
		setPrintRatingVar(!review.rating ? 1 : review.rating * -100);
		setCounter(counter + 1);
	}

	// 리뷰 수정 취소 fn
	function cancleEditReview() {
		reviewInputs.current[1].value = "";
		reviewInputs.current[7].innerText = "작성";
		setReview({});
		setValidated(false);
		setPrintRatingVar(-1);
	}

	// 리뷰 삭제 fn
	function deleteReview(e) {
		axios.delete("/product/review/" + reviewInputs.current[1].value)
		.then((data) => {
			if(data) {
				alert("리뷰가 삭제되었습니다");
				e.target.form.reset();
				setPrintRatingVar(-1);
			} else alert("리뷰 삭제 중 문제가 발생했습니다");
			setCounter(counter + 1);
		}).catch((error) => {
			console.log(error);
			alert("리뷰 제거 중 문제가 발생했습니다");
		});
	}

	return (<>
		<h2>구매 후기</h2>

		<section className="review-list">
			{reviewList.length ? reviewList.map((review) => (
				<article key={review.reviewNo} className="review">
					<figure>
						<picture className="ratingBox">
							{printRating(review?.rating)}
						</picture>
						<figcaption className="review-content">
							{review?.reviewContent}
						</figcaption>
						<label style={{display: (review.memberNo == loginMember.memberNo ? "inline": "none")}}
							onClick={() => subEditReview(review)}>편집</label>
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
			)) : ""}
		</section>

		<Form className="review-write" validated={validated} onSubmit={handleSubmit} noValidate>
			<section>
				<figure className="ratingBox">
					{printRating(printRatingVar)}
				</figure>
				<Row>
					<InputGroup hasValidation>
						<Form.Group as={Col} controlId="reviewContent">
							<Form.Control as={"textarea"} ref={(e) => reviewInputs.current[0] = e} onChange={writeReview} rows={5} style={{resize: "none"}} disabled={!isBuyed} required/>
							<Form.Control.Feedback type="invalid" tooltip>필수 항목입니다</Form.Control.Feedback>
						</Form.Group>
					</InputGroup>
				</Row>
				<input type="hidden" ref={(e) => reviewInputs.current[1] = e}/>
			</section>
			<section>
				<Row>
					<FloatingLabel as={Col} controlId="height" label="키">
						<Form.Control type="number" ref={(e) => reviewInputs.current[2] = e} onChange={writeReview} placeholder="키" disabled={!isBuyed} />
					</FloatingLabel>
					<FloatingLabel as={Col} controlId="weight" label="몸무게">
						<Form.Control type="number" ref={(e) => reviewInputs.current[3] = e} onChange={writeReview} placeholder="몸무게" disabled={!isBuyed} />
					</FloatingLabel>
				</Row>
				<Row>
					<FloatingLabel as={Col} controlId="top" label="상의 기장">
						<Form.Control type="number" ref={(e) => reviewInputs.current[4] = e} onChange={writeReview} placeholder="상의 기장" disabled={!isBuyed} />
					</FloatingLabel>
					<FloatingLabel as={Col} controlId="bottom" label="하의 기장">
						<Form.Control type="number" ref={(e) => reviewInputs.current[5] = e} onChange={writeReview} placeholder="하의 기장" disabled={!isBuyed} />
					</FloatingLabel>
				</Row>
				<Row>
					<InputGroup as={Col} hasValidation>
							<Form.Select ref={(e) => reviewInputs.current[6] = e} id="isTrueToSize" onChange={writeReview} disabled={!isBuyed}>
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
						<Button ref={(e) => reviewInputs.current[7] = e} type="submit">작성</Button>
					</InputGroup>
					<InputGroup as={Col}>
						<Button type="reset" variant="secondary" onClick={cancleEditReview}>취소</Button>
					</InputGroup>
					<InputGroup as={Col}>
						<Button type="button" variant="danger" onClick={deleteReview} style={{display: (printRatingVar > -100 ? "none" : "inline")}}>삭제</Button>
					</InputGroup>
				</Row>
			</section>
		</Form>
	</>);
}