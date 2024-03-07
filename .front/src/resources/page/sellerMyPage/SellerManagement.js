import { Link } from "react-router-dom";
import "../../css/sellerMyPage/SellerManagement.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SellerManagement() {

    const [product, setProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get('/product/sellerList');
            setProduct(response.data);
        } catch (error) {
            console.error('상품 정보 에러:', error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [])


    const changeNStatus = async (prodNo) => {
        try {
            const response = await axios.put(`/product/sellerListUpdate/${prodNo}`, { status: 'N' });
    
            if (response.status === 200) {
                const updatedProducts = await axios.get('/product/sellerList');
                setProduct(updatedProducts.data);
            }
        } catch (error) {
            console.error('상품 정보 업데이트 에러' ,error);
        }
    };

    const changeYStatus = async (prodNo) => {
        try {
            const response = await axios.put(`/product/sellerListYUpdate/${prodNo}`, { status: 'Y' });
    
            if (response.status === 200) {
                const updatedProducts = await axios.get('/product/sellerList');
                setProduct(updatedProducts.data);
            }
        } catch (error) {
            console.error('상품 정보 업데이트 에러' ,error);
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

      // 입력 항목에서 키 입력 이벤트 처리
    const handleKeyPress = (event) => {
        // event.key 또는 event.code를 사용하여 엔터 키를 체크
        if (event.key === 'Enter' || event.code === 'Enter') {
        handleSearch();
        }
    };

    const handleSearch = () => {
        const results = product.filter(product => 
            product.prodName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <div className="SellerManagement">
            <div>
                <h2>전체 상품관리</h2>
            </div>
            <div className="seller-search">
                <div>
                    <input 
                        type="text" 
                        className="seller-search-input" 
                        placeholder="상품을 검색하세요." 
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button type="submit" onClick={handleSearch}>검색</button>
                </div>
                <Link to={"/sellerMypage/management/registration"}>
                    <button>상품 등록</button>  
                </Link>
            </div>
            <article>
                <table>
                    <thead>
                        <tr>
                            <th>대분류</th>
                            <th>소분류</th>
                            <th>상품 등록일</th>
                            <th>상품명</th>
                            <th>정상가</th>
                            <th>할인가</th>
                            <th>총 주문 수량</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(searchTerm ? searchResults : product).map(product => (
                        <tr>
                            <td>{product.cateMain}:{product.mainName}</td>
                            <td>{product.cateSub}:{product.subName}</td>
                            <td>{product.uploadDate}</td>
                            <td>{product.prodName}</td>
                            <td>{product.price.toLocaleString()}</td>
                            <td>{product.discountRate === 0 ? "X" : (product.price * (1 - product.discountRate / 100)).toLocaleString()}</td>
                            <td>{product.ordered}</td>
                            <td>{product.status}</td>
                            <button onClick={() => changeYStatus(product.prodNo)}>Y</button>
                            <button onClick={() => changeNStatus(product.prodNo)}>N</button>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </article>
        </div>
    )
}