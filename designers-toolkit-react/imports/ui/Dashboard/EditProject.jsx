import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";

const EditProject = ({handleClose, project}) => {

    const findUser = (submittedUser) => {
        
    }

    const [newName, changeName] = useState(project.projectName);
    const [newAllocatedTime, changeAllocated] = useState(project.timeAllocated);

    const saveEdit = () => {
        Meteor.call('projects.editProject', project._id, newName, newAllocatedTime);
    }

    const editProject = ({projectName, timeAllocated}) => {
        Meteor.call('projects.editProject', "Test project", [20,20,20,20,20,20]);
    }

    return(
        <div className="popup-box">
            <div className="box">
            <Container className="CreateProjectForm">
                    <Row className="mt-3 justify-content-md-center">
                        <Col md="auto"><h5 className="blackHeader">Edit Project</h5></Col>
                    </Row>
                    <Row className="mt-3">
                        <Col><h5 className="blackHeader">Project name</h5></Col>
                        <Col><input type="text" placeholder={project.projectName} onChange={(e) => changeName(e.target.value)} className="text-line" /></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader">Deadlines</h5></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Understand </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[0]}/></Col>
                        <Col><h5 className="blackHeader"> Define </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[1]}/></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Sketch </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[2]}/></Col>
                        <Col><h5 className="blackHeader"> Decide </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[3]}/></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Prototype </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[4]}/></Col>
                        <Col><h5 className="blackHeader"> Validate </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[5]}/></Col>
                    </Row>
                    <Row className="mt-5 justify-content-md-center">
                        <Col md='auto'>
                            <button className="dashboardSignInButton" onClick={saveEdit}><p className="buttonText">Save</p></button>
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

export default EditProject;