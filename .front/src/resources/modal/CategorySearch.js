import "../css/common/CategorySearch.css";

export default function CategorySearch () {
    

    return(
        <div className="CategorySearch">
            <div className="cateInput-box">
                <input type="text" placeholder="?????"/>
            </div>

            <div>
                <h3>색상</h3>
            </div>
            <div>
                <h3>사이즈</h3>
            </div>
            <div>
                {/* DB: 옷감 종류 */}
                <h3>소재</h3>
                <div>
                    <input TYPE='radio' id='r1' name='FABRIC1' value='FABRIC1' />
                    <label for='r1'>면/코튼</label>
                    <input TYPE='radio' id='r2' name='FABRIC2' value='FABRIC2' />
                    <label for='r2'>마/린넨</label>
                    <input TYPE='radio' id='r3' name='FABRIC3' value='FABRIC3' />
                    <label for='r3'>울/캐시미어</label>
                </div>
            </div>
            <div>
                {/* DB: 옷의 안감 */}
                <h3>안감</h3>
            </div>
            <div>
                {/* DB: 옷의 비침 정도 */}
                <h3>비침</h3>
            </div>
            <div>
                {/* DB: 옷감 두께 */}
                <h3>두께</h3>
            </div>
            <div>
                {/* DB: 옷감의 디자인 (패턴) */}
                <h3>패턴</h3>
            </div>
            <div>
                {/* DB: 옷의 라인타입 */}
                <h3>라인</h3>
            </div>
            <div>
                {/* DB: 옷의 맞는 계절 */}
                <h3>계절감</h3>
            </div>


        </div>
    )
}