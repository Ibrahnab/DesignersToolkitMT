import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import {signIn, signOut} from "../actions/index";
import {connect} from "react-redux";

const SignedInView = () => {

    const user = useTracker(() => Meteor.user());

    const logout = () => Meteor.logout();

    return(
        <Container>
            <Row className='sectionContainer'>
              <Col>
                <h1 className="blackHeader"><em>Welcome back!</em></h1>
              </Col>
              
              <Col md='auto'>
                <button className="dashboardSignInButton" onClick={logout}>
                  <p className="buttonText">Sign Out</p>
                </button>
              </Col>
          </Row>
        </Container>
    )

};

export default SignedInView;