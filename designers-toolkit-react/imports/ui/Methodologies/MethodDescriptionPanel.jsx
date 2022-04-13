import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import methodReducer from "../reducers/methodReducer";
import {adjustPhase, addToSprint, removeFromSprint, loadCurrentMethod, removePhaseFromMethod} from "../actions/index";
import {connect} from "react-redux";
import {flipViewingMethod} from "../actions/index";
import { useTracker } from 'meteor/react-meteor-data';
import { DEVICE_SIZES } from "react-bootstrap/esm/createUtilityClasses";
import * as actionTypes from "../actions/types"
import { useSelector, useDispatch } from "react-redux";
import { ProjectsCollection } from '/imports/api/ProjectsCollection';
import MethodComment from "./MethodComment";


const MethodDescriptionPanel = ({methodDescriptionData, viewingMethod, flipViewingMethod, addToSprint, adjustPhase, removeFromSprint, removePhaseFromMethod, selectedProject}) => {
    isFirst = true;
    var [phases, setPhases] = useState([]);
    const user = useTracker(() => Meteor.user());
    const [comment, setCommentValue] = useState("");

    function addThisMethod(phase){
        adjustPhase(methodDescriptionData.id, `${phase}`);
        addToSprint(methodDescriptionData.id, `${phase}`);
        setPhases(phases =[...phases , `${phase}`]);
    }
    function removeThisMethod(incPhase){
        removePhaseFromMethod(methodDescriptionData.id, `${incPhase}`);
        removeFromSprint(methodDescriptionData.id, `${incPhase}`);
        setPhases(phases= phases.filter((phase) => (phase !== incPhase)));
    }

    const editComment = e => {
        setCommentValue(e);
    }

    const saveComment = (newComment) =>{
        console.log("Saving to method id:  " + methodDescriptionData.id);
        Meteor.call('projects.addNoteToMethod', selectedProject, methodDescriptionData.id, newComment);
    }

    const project = useTracker(() => {
        if(!user){
            return [];
        }

        const found = ProjectsCollection.find({_id: selectedProject}).fetch();

        const allComments = found[0].methodsUsed.filter(object => object.methodId == methodDescriptionData.id);
        
        if(allComments.length > 0) {
            const latestComment = allComments[allComments.length-1];
            console.log(latestComment.methodNote);
            return latestComment.methodNote;
            
            
        }
        else{
            console.log("Write your notes here");
        }

        return "";

    });

    return (
        <div className="methodDescriptionPanel">
            <div className="row justify-content-md-center mt-3">
                <Col className="d-flex">
                <div className="backBtn" >
                    <img src="backBtn.svg" onClick={() => flipViewingMethod()}></img>
                </div>
                </Col>
            </div>
        
            <div className="row justify-content-md-center mt-4">
                <Col md="auto">
                    <img className="methodDescriptionImage" src={methodDescriptionData.image}></img>
                </Col>
            </div>

            <div className="row justify-content-md-center mt-2">
                <Col md="auto">
                    <h5 className="methodDescriptionHeader">{methodDescriptionData.name}</h5>
                </Col>
            </div>

            <div className="row justify-content-md-center mt-1 spc">
                <div className="col-sm-5">
                    <h3> Description </h3>
                    <p className="methodDescriptionBodyText">{methodDescriptionData.description}</p>
                </div>
                <div className="col-sm-2">
                    <Row className="justify-content-center">  
                        <Col md="auto">
                            <img src="personIcon2.svg" className="methodDescriptionIcon mt-2"/>
                            <p className="blackHeader cardHeader">{methodDescriptionData.participantRange}</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col md="auto">
                            <img src="clockIcon.svg" className="methodDescriptionIcon mt-2"/>
                            <p className="blackHeader cardHeader">{methodDescriptionData.timeRange}</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center"> 
                        <Col md="auto">
                            <div className="row justify-content-md-center">
                                <div className="col-auto">
                                <img src="tripleDiamondIcon2.svg" className="methodDescriptionIcon"/>
                            </div>
                            </div>
                            <div className="row justify-content-md-center">
                                {methodDescriptionData.phase.map((phase) => (
                                        <Col md="auto" className="mt-3">
                                            <div className={`method-circle + ${phase}`}></div>
                                        </Col>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>  
            </div>

            {/*<div className="row justify-content-md-center mt-3">
                <Col md="auto">
                    <img src="personIcon2.svg" className="methodDescriptionIcon mt-2"/>
                    <p className="blackHeader cardHeader">{methodDescriptionData.participantRange}</p>
                </Col>
                <Col md="auto" className="method-icons-left-margin">
                    <img src="clockIcon.svg" className="methodDescriptionIcon mt-2"/>
                    <p className="blackHeader cardHeader">{methodDescriptionData.timeRange}</p>
                </Col>
                <Col md="auto" className="method-icons-left-margin">
                    <div className="row justify-content-md-center">
                        <div className="col-auto">
                        <img src="tripleDiamondIcon2.svg" className="methodDescriptionIcon"/>
                    </div>
                    </div>
                    <div className="row justify-content-md-center">
                        {methodDescriptionData.phase.map((phase) => (
                                <Col md="auto" className="mt-3">
                                    <div className={`method-circle + ${phase}`}></div>
                                </Col>

                        ))}
                    </div>
                </Col>
            </div>}*/}

            <div className="row justify-content-md-center mb-3">
                <div className="col-sm-6 md-2">
                    {methodDescriptionData.steps.map((step) =>(
                        <div className="row justify-content-md-center">
                            <div className="col-sm-2 mt-3">
                                <div className="stepCircle"><p className="step-number-text">{methodDescriptionData.steps.indexOf(step)+1}</p></div>
                            </div>
                            <div className="col mt-3">
                                <p className="method-step-text">{step}</p>
                            </div>
                        </div>
                        ))}
                </div>
                <div className="col-sm-3 md-4 spc2">
                    <div className="row justify-content-md-center">
                        <h5 className="add-method-text">Add method to Sprint</h5>
                    </div>
                    <div className="row justify-content-md-center">
                        {methodDescriptionData.phase.map((phase) => (
                            <div className="col mt-3">
                                <button className="method-button" id={phase} onClick={() => {phases.indexOf(`${phase}`) > -1 ? removeThisMethod(phase):addThisMethod(phase)}}>
                                    <p className="buttonText">{phase}</p>
                                </button>
                                <p className="time-left-text">0/60 min used</p>
                            </div>
                         ))}
                    </div>
                </div>
            </div>

            <div className="row justify-content-md-center mb-1">
                <div className="col-sm-7">
                    <hr></hr>
                    <h5 className="methodDescriptionHeader">Recommended tools</h5>
                </div>
            </div>
            <div className="row justify-content-md-center mb-1">
                {methodDescriptionData.recommendedToolsIcon.map((recommendedToolsIcon) =>(
                    (methodDescriptionData.recommendedToolsIcon.indexOf(recommendedToolsIcon) < 1) //If the first element, else
                    ?<Col md="auto">
                        <img src={recommendedToolsIcon} className="method-recommended-tool-icon mt-2" onClick={()=> window.open(methodDescriptionData.recommendedToolsLink[methodDescriptionData.recommendedToolsIcon.indexOf(recommendedToolsIcon)], "_blank", 'noopener,noreferrer')}/>
                    </Col>
                    :<Col md="auto" className="method-icons-left-margin">
                        <img src={recommendedToolsIcon} className="method-recommended-tool-icon mt-2" onClick={()=> window.open(methodDescriptionData.recommendedToolsLink[methodDescriptionData.recommendedToolsIcon.indexOf(recommendedToolsIcon)], "_blank", 'noopener,noreferrer')}/>
                    </Col>
                ))}
            </div>
            <div className="row justify-content-md-center mb-1">
                {methodDescriptionData.recommendedToolsDifficulty.map((recommendedToolsDifficulty) =>(
                    (methodDescriptionData.recommendedToolsDifficulty.indexOf(recommendedToolsDifficulty) < 1 && isFirst) //If the first element, else
                    ?<Col md="auto">
                        {isFirst = false}
                        <img src={recommendedToolsDifficulty} className="methodDiffIcon mt-2"/>
                    </Col>
                    :<Col md="auto" className="method-icons-left-margin">
                            <img src={recommendedToolsDifficulty} className="methodDiffIcon mt-2"/>
                    </Col>
                ))}
            </div>
            <div className="row justify-content-md-center mb-1">
                <div className="col-sm-7">
                    <hr></hr>
                    <h5 className="methodDescriptionHeader">Team Notes</h5>
                </div>
            </div>
            {/* <div className="row justify-content-md-center mb-6">
                <Col md="auto"> 
                    <div className="team-note">
                        <textarea className="note-textarea"
                            rows="20"
                            cols="10"
                            placeholder="Type to add a note..."
                            onChange={(e) => editComment(e.target.value)}
                        ></textarea>
                    </div>
                </Col>
                <MethodComment comment={project} saveComment={saveComment}/>
            </div>
            <div className="row justify-content-md-center mb-1">
                <div className="col-sm-2 mt-3">
                    <button className="dashboardSignInButton" onClick={() => saveComment()}><p className="buttonText">Save</p></button>
                </div>
            </div> */}
            <MethodComment comment={project} saveComment={saveComment}/>
        </div>
    )
    
};

/*{methodDescriptionData.stepsNrb.map((nbr) =>(
                        <div className="col-sm-1 ml-3">
                            <div className="stepCircle"><p>{nbr}</p></div> 
                        </div>
                    ))}*/

                    
const mapDispatchToProps = dispatch => {
    return {
        loadCurrentMethod: (id) => dispatch(loadCurrentMethod(id)),
        flipViewingMethod: () => dispatch(flipViewingMethod()),
        addToSprint: (id, itemPhase) => dispatch(addToSprint(id, itemPhase)),
        adjustPhase: (id, itemPhase) => dispatch(adjustPhase(id, itemPhase)),
        removeFromSprint: (id, itemPhase) => dispatch(removeFromSprint(id, itemPhase)),
        removePhaseFromMethod:(id, itemPhase) => dispatch(removePhaseFromMethod(id ,itemPhase))

    };
};

const mapStateToProps = (state) => {
    return {
      viewingMethod: state.methodReducer.viewingMethod,
      selectedTeam: state.projectReducer.selectedTeam,
      selectedProject: state.projectReducer.selectedProject
    };
  };

export default connect(mapStateToProps ,mapDispatchToProps)(MethodDescriptionPanel);