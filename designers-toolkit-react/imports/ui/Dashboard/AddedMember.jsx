import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";

const AddedMember = ({member, removeMember}) => {
    return(
        <Container>
            <Row>
                <Col>
                    <h5 className="blackHeader">{member}</h5>
                </Col>

                <Col>
                <img className="crossIcon" src="redCircleCross.svg" onClick={() => removeMember(member)}></img>
                </Col>
            </Row>
        </Container>
    );
};

export default AddedMember;