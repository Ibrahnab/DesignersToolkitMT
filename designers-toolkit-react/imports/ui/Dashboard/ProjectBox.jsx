import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import EditProject from "./EditProject";
import {connect} from "react-redux";
import {selectProject} from "../actions/index";
import { Link, useLocation, NavLink, useNavigate  } from "react-router-dom";

const ProjectBox = ({project, selectProject, selectedProject, selectedTeam}) =>{

    const [openEdit, setOpenEdit] = useState(false);
    const navigate = useNavigate();

    const switchEdit = () => {
        setOpenEdit(!openEdit);
    }
    function navigateToMethodologies() {
        const location = useLocation();
        return includes(location.pathname,"Methodologies");
    }

    const selectThisProject = () => {
        
        selectProject(project._id);
        navigate("/methodologies");
    }

    const identifySelected = () => {
        
        if(selectedProject == project._id){
            console.log("selectedProject: " + selectedProject);
            return ` selected`;
        }
        return ``;
    }

    return(
        <div className={`projectBox` + identifySelected()} >
            <Row>
                <Col>
                    <div className="editBtn" onClick={switchEdit}>
                        <img src="dots.svg"/>
                    </div>
                </Col>
            </Row>
            
            <Row>
                <Col className="justify-content-md-center d-flex">
                    <img className="diamondsIcon" src="projectDiamonds.svg" onClick={() => selectThisProject()}></img>
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