import { Link, useNavigate } from "react-router-dom"

export default function Home() {

    const navi = useNavigate();


    return (
        <>
            <div>안녕 ㅋㅋ</div>
            <Link to={'/orderPage'} >OrderPage</Link>
        </>


    )
}
