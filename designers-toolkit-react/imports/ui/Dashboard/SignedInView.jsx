import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import {signIn, signOut} from "../actions/index";
import {connect} from "react-redux";
import ProjectBox from "./ProjectBox";
import TeamsBox from "./TeamsBox";

const SignedInView = () => {

    const user = useTracker(() => Meteor.user());

    const logout = () => Meteor.logout();

    return(
        <Container>
            <Row d-flex className='signedInHeader'>
              <Col md="">
                <h1 className="blackHeader"><em>Welcome back!</em></h1>
              </Col>
              
              <Col md='auto'>
              <h3 className="blackHeader">Signed in as <em>{user.username}</em></h3>
                <button className="dashboardSignInButton" onClick={logout}>
                  
                  <p className="buttonText">Sign Out</p>
                </button>
              </Col>
            </Row>
          <hr></hr>
          <Row>
                {/* Teams */}
                <Col>
                    <Row>
                        <Col>
                            <h3 className="blackHeader">Teams</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TeamsBox/>
                        </Col>
                    </Row>
                
                </Col>

                {/* Separating lines */}
                <Col md={1}><div className = "dashboardVL signedIn"></div></Col>

                {/* Projects */}
                <Col>
                    <Row>
                        <Col>
                            <h3 className="blackHeader">Projects</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ProjectBox></ProjectBox>
                        </Col>
                    </Row>
                    
                </Col>
          </Row>
        </Container>
    )

};

export default SignedInView;