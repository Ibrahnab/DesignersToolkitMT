import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";

const ProjectBox = () =>{
    return(
        <div className="projectBox">
            <Row>
                <Col className="justify-content-md-center d-flex">
                    <img className="cardImg" src="projectDiamonds.svg"></img>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="blackHeader cardHeader">Master thesis VT22</h5>
                </Col>
            </Row>
            
        </div>
    );
}

export default ProjectBox;