import React from 'react';
import "../css/Error.css";

export default function Error() {

    return (
        
        <div data-rsssl="1">
            <div className="error404">
            <img className='errorImg' src='https://mblogthumb-phinf.pstatic.net/MjAxODA1MTFfMjQy/MDAxNTI2MDE5MjM1ODM5.FqVVsURk7BkFJ48buY4SgFWhDPGYLmWn5Ig7EoyHse0g.fn4mJ3cdBRMth9Y2LUc9Tsf158wcmOY49PgxZ_q8btIg.PNG.alswh007/3.png?type=w800' />
                <div className="error404_container">
                    <div className="error404_container_inner">
                        <div className="wrap">
                            <p>
                                <span className="glitch" data-text="죄송합니다.">죄송합니다.</span>
                                <span className="glitch" data-text="현재 찾을수 없는 페이지를 요청하셨습니다.">현재 찾을수 없는 페이지를 요청하셨습니다.</span>
                            </p>
                            <p className="error404_large">
                                <span className="glitch" data-text="주소를 잘못 입력 하셨거나,">주소를 잘못 입력 하셨거나,</span>
                                <span className="glitch" data-text="이전에 찾아놨던 페이지의 주소가 변경, 삭제되신것 같습니다.">이전에 찾아놨던 페이지의 주소가 변경, 삭제되신것 같습니다.</span>
                            </p>
                            <a lang="en" href="http://localhost:3000/"><span className="glitch" data-text="메인 페이지로 이동">메인 페이지로 이동</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}