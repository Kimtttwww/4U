import { Link } from "react-router-dom";
import Rightbar from "../css/common/Rightbar.css";

export default function Rightmenubar(){
    
    return (
        
        <div className="rightBar">

            <div className="">
            <Link to="/order/history">
                <img className="categoryImg" src="./photo/CategoryImg.png"/>
            </Link>
            </div>
            <div className="">
            <Link to="/order/history">
                <img className="categoryImg" src="./photo/couponImg.png"/>
            </Link>
            </div>

        </div>
        
    )

}