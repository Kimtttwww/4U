import { useEffect, useRef, useState } from "react"
import "../../css/product/ProdReview.css"
import axios from "axios";

/**
 * 해당 상품의 리뷰들
 * @props props
 * 	@param {number} prodNo 해당 상품의 상품 번호
 */
export default function ProdReview(props) {
	
	const {prodNo} = props;
	const [reviewList, setReviewList] = useState([]);
	const [review, setReview] = useState({});
	const ratingImages = useRef([]);
	

	useEffect(() => {
		// 해당 상품의 리뷰 목록 조회
		axios.get("/product/review/" + prodNo)
		.then((data) => {
			setReviewList(data?.data);
			console.log("reviewList", data?.data);
		}).catch((error) => {
			console.log(error);
			alert("리뷰를 불러오는 중 문제가 발생했습니다");
		});
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
			if(i + 1 <= rating) {
				element.push(<img src="/photo/point.svg" alt={i+1+"점"} />);
			} else {
				element.push(<img src="/photo/noPoint.svg" alt={i+1+"점"} />);
			}
		}
		return element;
	}

	/**
	 * 각 리뷰별 작성자 정보 출력 fn
	 * @returns 작성자 정보를 표현하는 태그들
	 */
	function printMember() {return review.height && review.weight ? (<p>{review.height} / {review.weight}</p>) : ""}
	
	/**
	 * 각 리뷰별 기타 정보 출력 fn
	 * @returns 기타 정보를 표현하는 태그들
	 */
	function printOther() {
		let element = [];

		if(review.top) element.push(<p>상의 {review.top}</p>);
		if(review.bottom) element.push(<p>하의 {review.bottom}</p>);
		if(review.isTrueToSize) element.push(<p>{review.isTrueToSize}</p>);

		return element;
	}

	return (<>
		<h2>구매 후기</h2>

		<section className="review-list">
			{reviewList.length && reviewList.map((review) => (
				<article key={review.reviewNo} className="review">
					<figure>
						<picture className="ratingBox">
							{printRating(review.rating)}
						</picture>
						<figcaption className="review-content">
							{review?.reviewContent}
						</figcaption>
					</figure>
					<aside className="reviewer">
						<div>
							<p>{review.memberName} / {review.createDate.split(" ")[0]}</p>
							{printMember()}
						</div>
						<div>
							{printOther()}
						</div>
					</aside>
				</article>
			)) }
		</section>

		<section className="review-write">
			{/* 리뷰 작성 영역 작업하기 */}
		</section>

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