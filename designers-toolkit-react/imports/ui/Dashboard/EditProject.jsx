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

    const changeAllocatedByIndex = index => e => {
        let newArr = [...newAllocatedTime];

        newArr[index] = parseInt(e.target.value);

        console.log(newArr);
        changeAllocated(newArr);
    }

    const saveEdit = () => {
        Meteor.call('projects.editProject', project._id, newName, newAllocatedTime);
        handleClose();
    }

    const deleteProject = () => {
        Meteor.call('projects.remove', project._id);
        handleClose();
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
                        <Col>
                            <div className="">
                                <img className="" src="trash_icon3.svg" onClick={deleteProject}></img>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader">Deadlines</h5></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Understand </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[0]} onChange={changeAllocatedByIndex(0)}/></Col>
                        <Col><h5 className="blackHeader"> Define </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[1]} onChange={changeAllocatedByIndex(1)}/></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Sketch </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[2]} onChange={changeAllocatedByIndex(2)}/></Col>
                        <Col><h5 className="blackHeader"> Decide </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[3]} onChange={changeAllocatedByIndex(3)}/></Col>
                    </Row>

                    <Row className="mt-3">
                        <Col><h5 className="blackHeader"> Prototype </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[4]} onChange={changeAllocatedByIndex(4)}/></Col>
                        <Col><h5 className="blackHeader"> Validate </h5></Col>
                        <Col><input type="text" className="text-line small" placeholder={project.timeAllocated[5]} onChange={changeAllocatedByIndex(5)}/></Col>
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