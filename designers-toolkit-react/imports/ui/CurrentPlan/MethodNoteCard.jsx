import React, {useState, useEffect} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const MethodNoteCard = ({methodData, methodNote}) => {
    return(
        <div className="notes-box">
            <Row>
                <Col><img className="note-img" src={methodData.image}></img></Col>
            </Row>
            <Row>
                <Col><p className="note-header">{methodData.name}</p></Col>
            </Row>
            <Row md="auto">
                <Col><p className="note-text">{methodNote}</p></Col>
            </Row>
        </div>
    )
}

export default MethodNoteCard;