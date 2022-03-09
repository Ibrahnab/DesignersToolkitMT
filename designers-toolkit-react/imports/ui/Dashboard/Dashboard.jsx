import React, {useState} from "react";
import {AccountSide} from './AccountSide';
import {RoamMode} from './RoamMode';
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import {signIn, signOut} from "../actions/index";
import {connect} from "react-redux";
import loggedReducer from "../reducers/loggedReducer"

export const Dashboard = ({isLogged, signIn, signOut}) => {

    const user = useTracker(() => Meteor.user());
  
    const [signup, setState] = useState(false);

    const pull_data = (data) => {
      setState(!data);
    }

    return (
    <div>
      <Container>
        <Row className='dashboardRowHeader'>
          <div>
          <h1>{isLogged} </h1>
          </div>
          <Col><RoamMode/></Col>
          <Col md={1}><div className = "dashboardVL"></div></Col>
            
          <Col md ={{offset:1}}>
            <Row>
              <AccountSide/>
            </Row>
            
            </Col>
        </Row>
      </Container>
    </div>
    )  
}; 

const mapDispatchToProps = dispatch => {
  return {
      signIn: () => dispatch(signIn()),
      signOut: () => dispatch(signOut())
  };
};

const mapStateToProps = (state) => {
  return {
    isLogged: state.loggedReducer.loggedIn
  };
};

  /*<Col><AccountSide/></Col>
        <Col><RoamMode/></Col>*/