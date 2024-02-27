import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import CategorySearch from "../modal/CategorySearch";
import "../css/common/Rightbar.css";

export default function Rightmenubar(){

    const [isModalOpen, setCateModalOpen] = useState(false);

    const openCateModal = () => {
        setCateModalOpen(true);
    };

    const closeCateModal = () => {
        setCateModalOpen(false);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
        });
    };

    return (
        <div className="rightBar">
            {/* <Link to="/order/history">
                <img className="categoryImg" src="./photo/CategoryImg.png"/>
            </Link>
            <Link to="/order/history">
                <img className="categoryImg" src="./photo/couponImg.png"/>
            </Link> */}

            <Link to="" onClick={openCateModal}>
                <i>&#128269;</i>
            </Link>
            <Link to="">
                <i>&#x1F604;</i>
            </Link>
            <Link to="" onClick={scrollToTop}>
                <i>&#x2B06;</i>
            </Link>
            <Link to="" onClick={scrollToBottom}>
                <i>&#x2B07;</i>
            </Link>
            
            {/* 모달 */}
            <Modal show={isModalOpen} onHide={closeCateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>원하는 상품을 검색해 보세요</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CategorySearch />
                </Modal.Body>
            </Modal>
        </div>
    );
}
