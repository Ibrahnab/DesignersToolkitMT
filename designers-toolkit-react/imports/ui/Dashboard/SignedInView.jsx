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

const SignedInView = () => {

    const user = useTracker(() => Meteor.user());

    const logout = () => Meteor.logout();

    const [createProject, setCreateForm] = useState(false);
    const [createTeam, setCreateTeamForm] = useState(false);

    const togglePopup = () => {
        setCreateForm(!createProject);
    }

    const toggleTeamPopup = () => {
        setCreateTeamForm(!createTeam);
    }

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

    const projects = useTracker(() => {
        if(!user){
            return [];
        }

        return ProjectsCollection.find({owner: user.username}).fetch();

    });

    return(
        <Container>
            <Row d-flex className='signedInHeader'>
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
                        <Col>
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
                        <Col>
                            <TeamsBox/>
                        </Col>
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
                        <Col>
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
                        <Col>
                            <ProjectBox></ProjectBox>   
                            {projects.map(project => (
                                <ProjectBox />
                            ))}
                        </Col>
                    </Row>
                    
                </Col>
          </Row>
          {createTeam && <CreateTeamForm handleClose={toggleTeamPopup}/>}
          {createProject && <CreateProjectForm handleClose={togglePopup}/>}
          
        </Container>
    )

};

export default SignedInView;