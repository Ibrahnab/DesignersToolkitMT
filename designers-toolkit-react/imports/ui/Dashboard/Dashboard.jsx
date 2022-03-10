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
import SignedInView from './SignedInView'

const Dashboard = ({loggedIn, signIn, signOut}) => {

    const user = useTracker(() => Meteor.user());

    const logout = () => Meteor.logout();
  
    const [signup, setState] = useState(false);

    const pull_data = (data) => {
      setState(!data);
    }

    return (
    <div>
      <Container>
        {!user &&
          <Row className='dashboardRowHeader'>
            <Col><RoamMode/></Col>
            <Col md={1}><div className = "dashboardVL"></div></Col>
            
            <Col md ={{offset:1}}>
              <Row>
                <AccountSide/>
              </Row>
            </Col>
          </Row>
        }
        {user &&
          
          <SignedInView/>
        }
        
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
    loggedIn: state.loggedReducer.loggedIn
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

  /*<Col><AccountSide/></Col>
        <Col><RoamMode/></Col>*/