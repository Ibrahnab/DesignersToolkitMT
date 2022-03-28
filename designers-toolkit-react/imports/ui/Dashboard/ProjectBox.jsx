import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import EditProject from "./EditProject";

const ProjectBox = ({project}) =>{

    const [openEdit, setOpenEdit] = useState(false);

    const switchEdit = () => {
        setOpenEdit(!openEdit);
    }

    return(
        <div className="projectBox">
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

export default ProjectBox;