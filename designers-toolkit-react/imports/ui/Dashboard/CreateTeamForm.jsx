import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";

const CreateTeamForm = ({handleClose}) => {

    const submitNewAccount = e => {
        e.preventDefault();

        if(newPassword === confirmNewPassword) {
            Accounts.createUser({
                username: newUsername,
                password: newPassword
            }, function(error){
                console.log(error.reason);
                setErrorMessage(error.reason);  
            })
        }
    }

    const findUser = (submittedUser) => {
        
    }

    return(
        <div className="popup-box">
            <div className="box">
            <Container className="CreateProjectForm">
                <form className="login-form">
                    <Row className="mt-3 justify-content-md-center">
                        <Col md="auto"><h5 className="blackHeader">Create a new team</h5></Col>
                    </Row>
                    <Row className="mt-3">
                        <Col><h5 className="blackHeader">Invite user</h5></Col>
                        <Col><input type="text" className="text-line" /></Col>
                    </Row>

                    {/* <Row className="mt-3">
                        <Col><h5 className="blackHeader">Invite team members</h5></Col>
                        <Col><input type="text" class="text-line" /></Col>
                    </Row> */}

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader">Team members</h5></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Understand </h5></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Understand </h5></Col>
                        <Col><div className="crossBtn">X</div></Col>
                    </Row>
                    <Row className="mt-5 justify-content-md-center">
                        <Col md='auto'>
                            <button className="dashboardSignInButton"><p className="buttonText">Create</p></button>
                        </Col>
                        <Col md='auto'>
                            <button className="dashboardSignInButton cancel" type="button" onClick={() => handleClose()}><p className="buttonText cancel">Cancel</p></button>
                        </Col>
                    </Row>


                </form>

            </Container>
            </div>
        </div>
    );
};

export default CreateTeamForm;