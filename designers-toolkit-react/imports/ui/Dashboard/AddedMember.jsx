import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";

const AddedMember = ({member, removeMember, teamOwner}) => {

    const user = Meteor.user();

    function checkOwner(){
        if(teamOwner == user.username || user.username == member){
            return (

                <Col>
                    <img className="crossIcon" src="redCircleCross.svg" onClick={() => removeMember(member)}></img>
                </Col>
            );
        }
        return;
    }

    return(
        <Container>
            <Row>
                <Col>
                    <h5 className="blackHeader">{member}</h5>
                </Col>

                {checkOwner()}
                
            </Row>
        </Container>
    );
};

export default AddedMember;