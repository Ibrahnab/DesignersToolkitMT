import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import EditTeam from "./EditTeam";
import {connect} from "react-redux";
import {selectTeam} from "../actions/index";
import projectReducer from "../reducers/projectReducer";

const TeamsBox = ({team, selectTeam, selectedTeam, isPersonal}) =>{

    const [openEdit, setOpenEdit] = useState(false);
    const [selected, setSelected] = useState(false);

    const switchEdit = (e) => {
        if(!openEdit){
            e.stopPropagation();
        }
        setOpenEdit(!openEdit);
    }

    const switchSelected = () => {
        setSelected(!selected);
        console.log("selected team: " +  team.teamName);
    }

    const selectThisTeam = () => {
        selectTeam(team._id);
    }

    const identifySelected = () => {
        
        if(selectedTeam == team._id){
            return ` selected`;
        }
        return ``;
    }

    return(
        <div className={`teamsBox` + identifySelected()} onClick={() => selectThisTeam()}>
            <Row>
                {!isPersonal && 
                    <Col>
                        <div className="editBtn" onClick={(e) =>switchEdit(e)}>
                            <img src="dots.svg"/>
                        </div>
                    </Col>
                }
                
            </Row>  
            <Row xs={3} md={4} lg={5} className="justify-content-md-center mt-5">
                {team.members.map(member => (
                    <Col className="" key={member + team._id}>
                        {/* <span className="letterCircle">{member[0].toUpperCase()}</span> */}
                        <div className="avatar-circle">
                            <span className="initials">{member[0].toUpperCase()}</span>
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

const mapDispatchToProps = dispatch => {
    return{
        selectTeam: (teamId) => dispatch(selectTeam(teamId))
    };
};

const mapStateToProps = (state) => {
    return{
        selectedTeam: state.projectReducer.selectedTeam
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamsBox);