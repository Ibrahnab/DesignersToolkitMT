import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import EditProject from "./EditProject";
import {connect} from "react-redux";
import {selectProject} from "../actions/index";

const ProjectBox = ({project, selectProject, selectedProject, selectedTeam}) =>{

    const [openEdit, setOpenEdit] = useState(false);

    const switchEdit = () => {
        setOpenEdit(!openEdit);
    }

    const selectThisProject = () => {
        selectProject(project._id);
    }

    const identifySelected = () => {
        
        if(selectedProject == project._id){
            console.log("selectedProject: " + selectedProject);
            return ` selected`;
        }
        return ``;
    }

    return(
        <div className={`projectBox` + identifySelected()} onClick={() => selectThisProject()}>
            <Row>
                <Col>
                    <div className="editBtn" onClick={switchEdit}>
                        <img src="dots.svg"/>
                    </div>
                </Col>
            </Row>
            
            <Row>
                <Col className="justify-content-md-center d-flex">
                    <img className="cardImg" src="projectDiamonds.svg"></img>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5 className="blackHeader cardHeader">{project.projectName}</h5>
                </Col>
            </Row>
            {openEdit && <EditProject handleClose={switchEdit} project={project} />}
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return{
        selectProject: (projectId) => dispatch(selectProject(projectId))
    };
};

const mapStateToProps = (state) => {
    return{
        selectedTeam: state.projectReducer.selectedTeam,
        selectedProject: state.projectReducer.selectedProject
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBox);