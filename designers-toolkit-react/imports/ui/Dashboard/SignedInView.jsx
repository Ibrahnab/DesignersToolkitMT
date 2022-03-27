import React, {useState} from "react";
import Row  from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useTracker } from 'meteor/react-meteor-data';
import Container from "react-bootstrap/Container";
import {signIn, signOut} from "../actions/index";
import {connect} from "react-redux";
import ProjectBox from "./ProjectBox";
import TeamsBox from "./TeamsBox";
import CreateProjectForm from "./CreateProjectForm";
import CreateTeamForm from "./CreateTeamForm";
import { ProjectsCollection } from '/imports/api/ProjectsCollection';
import { TeamsCollection } from '/imports/api/TeamsCollection';

const SignedInView = ({selectedTeam, selectedProject}) => {

    const user = useTracker(() => Meteor.user());

    const logout = () => Meteor.logout();

    const [createProject, setCreateForm] = useState(false);
    const [createTeam, setCreateTeamForm] = useState(false);
    //const [selectedTeam, setSelectedTeam] = useState("");
    const [personalExists, setPersonalExists] = useState(TeamsCollection.findOne({owner: user.username, personal: true}) != undefined);

    const togglePopup = () => {
        setCreateForm(!createProject);
    }

    const toggleTeamPopup = () => {
        setCreateTeamForm(!createTeam);
    }
    
    // const selectTeam = (teamId) => {
    //     setSelectedTeam(teamId);
    //     console.log(selectedTeam);
    // }

    //--------- Teams functions

    const createTeamM = ({teamName, teamMembers}) => {
        Meteor.call('teams.insert', teamName, teamMembers);
    }

    const removeTeam = ({teamId}) => {
        Meteor.call('teams.remove', teamId);
    }

    //----------- Projects functions

    const createProjectM = ({projectName, timeAllocated}) => {
        Meteor.call('projects.insert', projectName, timeAllocated);
    }

    const deleteProject = ({projectId}) => {
        Meteor.call('projects.remove', projectId);
    }

    const personalTeam = useTracker(() => {
        if(!user) {
            return[]
        }

        const check = TeamsCollection.findOne({owner: user.username, personal: true});
        if(check == undefined){
            console.log("Created a personal team!");
            Meteor.call('teams.insertPersonal', "My Personal Projects", [user.username])
            location.reload();
        }

        return TeamsCollection.find({owner: user.username, personal: true}).fetch();
    });

    //This function was used to create personal teams for accounts with none, hopefully wont be needed anymore
    // const tryCreate = () => {
    //     const check = TeamsCollection.findOne({owner: user.username, personal: true});
    //     if(check == undefined){
            
    //         console.log("Created a personal team!");
    //         Meteor.call('teams.insertPersonal', "My Personal Projects", [user.username])
    //         return;

    //     }
    //     console.log("Exists");
    //     return;
    // }

    const teams = useTracker(() => {
        if(!user){
            return[]
        } 

        return TeamsCollection.find({members: user.username, personal: false}).fetch();
    });

    const projects = useTracker(() => {
        if(!user){
            return [];
        }

        return ProjectsCollection.find({owner: user.username}).fetch();

    });

    return(
        <Container>
            <Row className='signedInHeader'>
              <Col md="">
                <h1 className="blackHeader"><em>Welcome back!</em></h1>
              </Col>
              
              <Col md='auto'>
              <h3 className="blackHeader">Signed in as <em>{user.username}</em></h3>
                <button className="dashboardSignInButton" onClick={logout}>
                  
                  <p className="buttonText">Sign Out</p>
                </button>
              </Col>
            </Row>
          <hr></hr>
          <Row>
                {/* Teams */}
                <Col>
                    <Row>
                        <Col>
                            <h3 className="blackHeader">Teams</h3>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col className="mt-4">
                            <div className="teamsBox" onClick={toggleTeamPopup}>
                                <Row>
                                    <Col className="justify-content-md-center d-flex">
                                        <img className="cardImg" src="plus_icon.svg"></img>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h5 className="blackHeader cardHeader">Create new Team</h5>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        
                        {personalExists &&
                            <Col className="mt-4" key={personalTeam._id}> 
                                <TeamsBox key={personalTeam._id} team={personalTeam[0]} isPersonal={true}/>
                            </Col>
                        }

                        {teams.map(team => (
                                <Col className="mt-4" key={team._id}> 
                                    <TeamsBox key={team._id} team={team} isPersonal={false}/>
                                </Col>
                            ))}
                        
                        {/* <Col>
                            <TeamsBox/>
                        </Col> */}
                    </Row>
                
                </Col>

                {/* Separating lines */}
                <Col md={1}><div className = "dashboardVL signedIn"></div></Col>

                {/* Projects */}
                <Col>
                    <Row>
                        <Col>
                            <h3 className="blackHeader">Projects</h3>
                        </Col>
                    </Row>
                    <Row>
                        {(selectedTeam != "") &&
                        <Col className="mt-4">
                            <div className="projectBox" onClick={togglePopup}>
                            <Row>
                                <Col className="justify-content-md-center d-flex">
                                    <img className="cardImg" src="plus_icon.svg"></img>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5 className="blackHeader cardHeader">Create new Project</h5>
                                </Col>
                            </Row>
                            </div>
                        </Col>
                        }
                        
                            {projects.map(project => (
                                <Col className="mt-4" key={project._id}> 
                                    <ProjectBox key={project._id} project={project}/>
                                </Col>
                            ))}
                        
                    </Row>
                    
                </Col>
          </Row>

          {/* <Row className="mt-5 justify-content-md-center">
                <Col md='auto'>
                    <button className="dashboardSignInButton" onClick={() => tryCreate()}><p className="buttonText">Create Personal</p></button>
                </Col>
          </Row> */}
          {createTeam && <CreateTeamForm handleClose={toggleTeamPopup}/>}
          {createProject && <CreateProjectForm handleClose={togglePopup}/>}
          
        </Container>
    )

};


const mapStateToProps = (state) => {
    return{
        selectedTeam: state.projectReducer.selectedTeam,
        selectedProject: state.projectReducer.selectedProject
    };
};

export default connect(mapStateToProps)(SignedInView);