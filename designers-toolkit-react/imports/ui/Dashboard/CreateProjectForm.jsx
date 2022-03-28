import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import {selectTeam} from "../actions/index";
import projectReducer from "../reducers/projectReducer";

const CreateProjectForm = ({handleClose, selectedTeam}) => {

    const [newName, changeName] = useState("Project name");
    const [newAllocatedTime, changeAllocated] = useState([30,30,60,15,120,60]);

    const changeAllocatedByIndex = index => e => {
        let newArr = [...newAllocatedTime];

        newArr[index] = parseInt(e.target.value);

        console.log(newArr);
        changeAllocated(newArr);
    }

    const createProject = () => {
        Meteor.call('projects.insert', selectedTeam, newName, newAllocatedTime);
        console.log("inserted into: " + selectedTeam)
        handleClose();
    }

    return(
        <div className="popup-box">
            <div className="box">
            <Container className="CreateProjectForm">
                
                    <Row className="mt-3 justify-content-md-center">
                        <Col md="auto"><h5 className="blackHeader">Create a new project</h5></Col>
                    </Row>
                    <Row className="mt-3">
                        <Col><h5 className="blackHeader">Project name</h5></Col>
                        <Col><input type="text" className="text-line" placeholder={"Project name"}  onChange={(e) => changeName(e.target.value)}/></Col>
                    </Row>

                    {/* <Row className="mt-3">
                        <Col><h5 className="blackHeader">Invite team members</h5></Col>
                        <Col><input type="text" class="text-line" /></Col>
                    </Row> */}

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader">Deadlines</h5></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Understand </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={30} onChange={changeAllocatedByIndex(0)}/></Col>
                        <Col><h5 className="blackHeader"> Define </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={30} onChange={changeAllocatedByIndex(1)}/></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Sketch </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={60} onChange={changeAllocatedByIndex(2)}/></Col>
                        <Col><h5 className="blackHeader"> Decide </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={15} onChange={changeAllocatedByIndex(3)}/></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Prototype </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={120} onChange={changeAllocatedByIndex(4)}/></Col>
                        <Col><h5 className="blackHeader"> Validate </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={60} onChange={changeAllocatedByIndex(5)}/></Col>
                    </Row>
                    <Row className="mt-5 justify-content-md-center">
                        <Col md='auto'>
                            <button className="dashboardSignInButton" onClick={createProject}><p className="buttonText">Create</p></button>
                        </Col>
                        <Col md='auto'>
                            <button className="dashboardSignInButton cancel" type="button" onClick={() => handleClose()}><p className="buttonText cancel">Cancel</p></button>
                        </Col>
                    </Row>

            </Container>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        selectedTeam: state.projectReducer.selectedTeam,
        selectedProject: state.projectReducer.selectedProject
    };
};

export default connect(mapStateToProps)(CreateProjectForm);