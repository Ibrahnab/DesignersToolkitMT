import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import AddedMember from "./AddedMember";
import { TeamsCollection } from "/imports/api/TeamsCollection";

const EditTeam = ({handleClose, team}) => {

    const user = useTracker(() => Meteor.user());

    const [teamName, setTeamName] = useState(team.teamName);
    const [teamMembers, setTeamMembers] = useState(team.members.filter(mem => mem != team.owner));
    const [memberName, setMemberName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const addUser = () => {
        
        const fetchedUser = Meteor.users.find({username: memberName}).fetch();

        if(fetchedUser.length > 0){

            let fetchedUsername = fetchedUser[0].username;

            if(!teamMembers.includes(fetchedUsername)){
                
                if(fetchedUsername == user.username){
                    setErrorMessage("Cannot add yourself");
                    return;
                }

                let teamArr = [...teamMembers, fetchedUsername];
                setTeamMembers(teamArr);
                setErrorMessage("");
            }
            else{
                setErrorMessage("User is already added");
            }
            
            console.log("found: " + fetchedUsername);
            
        }
        else{
            setErrorMessage("Could not find user");
        }
    }

    const removeMember = (member) => {
        setTeamMembers(teamMembers.filter(mem => mem != member));
    }

    const saveTeam = () => {

        Meteor.call('teams.editTeam', team._id, teamName, [...teamMembers, team.owner]);
        handleClose();
    }

    return(
        <div className="popup-box">
            <div className="box">
            <Container className="CreateProjectForm">
               
                <Row className="mt-3 justify-content-md-center">
                    <Col md="auto"><h5 className="blackHeader">Edit this team</h5></Col>
                </Row>
                <Row className="mt-3">
                    <Col><h5 className="blackHeader">Team name</h5></Col>
                    <Col><input type="text" className="text-line" placeholder={teamName} onChange={(e) => setTeamName(e.target.value)}/></Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                    <p className="dashboardStandardText error">{errorMessage}</p>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col><h5 className="blackHeader">Team owner</h5></Col>
                    <Col><h5 className="blackHeader">{team.owner}</h5></Col>
                </Row>

                {/* Invite team members input */}
                <Row className="mt-3">
                    <Col><h5 className="blackHeader">Invite user</h5></Col>
                    <Col><input type="text" className="text-line" placeholder={"Enter username"} onChange={(e) => setMemberName(e.target.value)}/></Col>
                    <Col>
                        <button className="dashboardSignInButton" onClick={addUser}>
                            <p className="buttonText">Add</p>
                        </button>
                    </Col>
                </Row>

                {/* Added team members are listed */}
                <Row className="mt-3">
                    <Col><h5 className="blackHeader">Team members</h5></Col>
                </Row>

                {teamMembers.map( member =>(
                    <AddedMember key={member} member={member} teamOwner={team.owner} removeMember={removeMember}/>
                ))}

                <Row className="mt-5 justify-content-md-center">
                    <Col md='auto'>
                        <button className="dashboardSignInButton" onClick={() => saveTeam()}><p className="buttonText">Save</p></button>
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

export default EditTeam;