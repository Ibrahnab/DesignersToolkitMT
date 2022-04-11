import React, {useState, useEffect} from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { connect } from "react-redux";
import HamburgerMenu from "./HamburgerMenu"
import { flipHamburger } from "../actions";
import { useTracker } from 'meteor/react-meteor-data';
import { ProjectsCollection } from '/imports/api/ProjectsCollection';


const NavBar = ({currentSprintMethods, isHamburgerOpen, flipHamburger,selectedProject, selectedTeam}) => {

const user = useTracker(() => Meteor.user());
//const [selectedProjectState, setSelectedPS] = useState(selectedProject !== "" ? true : false);

const [sprintCount, setSprintCount] = useState(0);
const [barlock, setBarLock] = useState()
const [burgerState, changeState] = useState(false)

  useEffect(() => {
    let count=0;
    currentSprintMethods.forEach((item)=>{
      count+= 1;
    });
    setSprintCount(count);
  }, [currentSprintMethods, sprintCount])

  function getActiveRoute() {
    const location = useLocation();
    return location.pathname;
  }

  const handleBlur = (e) => {
    changeState(e.target.value);
    console.log("blurred");
  }

  const handleFocus = (e) => {
    changeState(true);
    console.log("focused");
  }

  const projectName = useTracker(() => {

    if(user && selectedProject !== "") {
      return ProjectsCollection.findOne({_id: selectedProject}).projectName;
    }

    return;
  })

  return (
    <div>

      <div className="filler"></div>

      <div className="navContainer sticky">
        <Container fluid>
          <Row className="alignNavBarText">
            <Col md="auto">
              <Link to="/">
                <img className="logoImg" src='Logo.svg'/>
              </Link>
            </Col>
            {/* <img  class="logo" src="logo.png"/> */}
              <Col className="d-flex" md="auto">
                <NavLink to="/introduction" className="navLink">
                  <h2 className="whiteHeader navText">Introduction</h2>
                  <div className={ 'underscore' + (getActiveRoute() == "/introduction" ? " activated" : "")}></div>
                </NavLink>
              </Col>
              
              <Col className="d-flex" md="auto">
                <NavLink to="/methodologies" className="navLink">
                  <h2 className="whiteHeader navText">Methodologies</h2>
                  <div className={ 'underscore' + (getActiveRoute() == "/methodologies" ? " activated" : "")}></div>
                </NavLink>
              </Col>

              <Col className="d-flex sprintPlanNav" md="auto">
                <NavLink to="/currentplan" className="navLink">
                  <h2 id="sprintPlanNav" className="whiteHeader navText">Sprint Plan </h2>
                  <div className={ 'underscore' + (getActiveRoute() == "/currentplan" ? " activated" : "")}></div>
                </NavLink>
              </Col>

              {/* Right side */}

              <Col  className="d-flex ml-auto pl-2" md="" style={{justifyContent: 'right'}}>
                <img src="card_icon.svg" />
              </Col>
              
              <Col className="d-flex sprintPlanNav" md="auto" style={{justifyContent: 'right'}}>
                <h2 id="" className="whiteHeader navText">{sprintCount}</h2>
              </Col>
              
              
              <Col className="d-flex" md="auto" style={{justifyContent: 'right'}}>
              
                {
                  <div className="vl-nav" md="auto"></div>
                }
                <h2 className="projectName">{projectName}</h2>

              </Col>
              <Col className="d-flex" md="auto" style={{justifyContent: 'right'}}>
                
                <div className="searchBtn" onClick={()=> {changeState(!burgerState); flipHamburger()}}>
                  <img src="searchIcon.svg"></img>
                </div>
              </Col>
              
              
              {/* <Col>
                <p className="whiteHeader">{selectedTeam}</p>
              </Col> */}
          </Row>
        </Container>

        {isHamburgerOpen && <HamburgerMenu></HamburgerMenu>}
      </div>
    </div>
    
  )
}; 

const mapDispatchToProps = dispatch => {
  return {
    flipHamburger: () => dispatch(flipHamburger())
  };
};

const mapStateToProps = (state) => {
  return{
    currentSprintMethods: state.methodReducer.currentSprintMethods,
    isHamburgerOpen: state.methodReducer.isHamburgerOpen,
    selectedTeam: state.projectReducer.selectedTeam,
    selectedProject: state.projectReducer.selectedProject
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);