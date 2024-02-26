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
		axios.get("/product/review/" + prodNo)
		.then((data) => {
			setReviewList(data?.data);
			console.log(data?.data);
		}).catch((error) => {
			console.log(error);
			alert("리뷰를 불러오는 중 문제가 발생했습니다");
		});
	}, []);

	function printRating(rating) {
		let element = "";
		for (let i = 0; i < 5; i++) {
			if(i <= rating) {
				element += (<img src="/photo/point.svg" alt={i+"점"} />);
			} else {
				element += (<img src="/photo/noPoint.svg" alt={i+"점"} />);
			}
		}
		return element;
	}

	return (<>
		<h2>구매 후기</h2>

		<section className="review-list">
			{reviewList.length && reviewList.map((review) => {
				return(
					<article className="review">
						<picture className="ratingBox">
							{printRating(review.rating)}
						</picture>
						<span>작성자명</span>
						<span>선택적 입력사항</span>
						<span>작성일자</span>
						<textarea className="review-content"></textarea>
					</article>
				)
			}) }
		</section>

		<section className="review-write">
			
		</section>

		<space>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
			<br/><br/><br/><br/><br/>
		</space>
	</>);
}