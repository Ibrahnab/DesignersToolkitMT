import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import EditTeam from "./EditTeam";

const TeamsBox = ({team}) =>{

    const [openEdit, setOpenEdit] = useState(false);

    const switchEdit = () => {
        setOpenEdit(!openEdit);
    }

    return(
        <div className="teamsBox">
            <Row>
                <Col>
                    <div className="editBtn" onClick={switchEdit}>
                        <img src="dots.svg"/>
                    </div>
                </Col>
            </Row>  
            <Row xs={3} md={4} lg={5} className="justify-content-md-center mt-5">
                {team.members.map(member => (
                    <Col className="">
                        {/* <span className="letterCircle">{member[0].toUpperCase()}</span> */}
                        <div class="avatar-circle">
                            <span class="initials">{member[0].toUpperCase()}</span>
                        </div>
                    </Col>
                ))}
                
            </Row>
            <Row>
                <Col>
                    <h5 className="blackHeader cardHeader mt-3">{team.teamName}</h5>
                </Col>
            </Row>

            {openEdit && <EditTeam handleClose={switchEdit} team={team}/>}
            
        </div>
    );
}

export default TeamsBox;