import React, {useState, useEffect, useRef} from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import methodReducer from "../reducers/methodReducer";
import {addToSprint, adjustPhase, showCurrentMethod, removeFromSprint, flipViewingMethod, removePhaseFromMethod} from "../actions/index";
import {connect} from "react-redux";
import DropDownMenu from "./DropDownMenu"
import { Link, useLocation, NavLink } from "react-router-dom";
import {setMethodID} from "../Methodologies/Methodologies";
import Form from "react-bootstrap/Form";
import { useTracker } from 'meteor/react-meteor-data';
import { ProjectsCollection } from '/imports/api/ProjectsCollection';

const MethodCard = ({methodData, addToSprint, adjustPhase, removeFromSprint, showCurrentMethod, flipViewingMethod, viewingMethod, removePhaseFromMethod, isinPlan, underPhase, selectedProject}) => {

    const user = useTracker(() => Meteor.user());

    var [phases, setPhases] = useState([])

    function addThisMethod(phase){

        if(selectedProject != "" && user){
            console.log("inserted into project" + selectedProject);
            Meteor.call('projects.addMethod', selectedProject, methodData.id, `${phase}`, "");
            Meteor.call('projects.addTime', selectedProject, methodData.time, `${phase}`)
            console.log(methodData.time);
            return;
        }

        adjustPhase(methodData.id, `${phase}`);
        addToSprint(methodData.id, `${phase}`);
        setPhases(phases =[...phases , `${phase}`]);
        
        console.log(user);
    }
    function removeThisMethod(incPhase){
        
        if(selectedProject != "" && user){
            console.log("removed method from project" + selectedProject);
            Meteor.call('projects.removeMethod', selectedProject, methodData.id, `${incPhase}`, "");
            Meteor.call('projects.subTime', selectedProject, methodData.time, `${incPhase}`);
            return;
        }
        
        removePhaseFromMethod(methodData.id, `${incPhase}`);
        removeFromSprint(methodData.id, `${incPhase}`);
        setPhases(phases= phases.filter((phase) => (phase !== incPhase)));

    }
  
    const [isActive, setIsActive] = useState(false);

    const useFocus = () => {
        const htmlElRef = useRef(null)
        const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}
    
        return [ htmlElRef, setFocus ] 
    }

    function isInMethodologies() {
        const location = useLocation();
        return includes(location.pathname,"Methodologies");
    }

    function blurHandler() {
        setIsActive(!false);
    }

    const handleBlur = (e) => {
        setIsActive(false);
        console.log("blurred");
    }

    const handleFocus = (e) => {
        console.log("focused");
        setIsActive(true);
    }

    const hasNote = useTracker(() => {
        if(!user || selectedProject === ""){
            return false;
        }

        const p = ProjectsCollection.findOne({_id: selectedProject});
        const n = p.methodsUsed.filter(object => object.methodId == methodData.id)[0];
        if(n != undefined){
            return n.methodNote !== "" ? true : false;
        }
        return false;
    })

    const [inputRef, setInputFocus] = useFocus();
    return (
        <div className="methodCard">
        <Container className="methodContainer p-0">
        
        <Row>
            <Col>
                <div className="noteIcon">
                    {hasNote && <img src="Document_icon.svg"/>}
                    
                </div>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Col className="justify-content-md-center d-flex">
                <NavLink to="/methodologies" className="cardNav p-0">
                    <img onClick={()=>{{!viewingMethod ? flipViewingMethod(): undefined}; showCurrentMethod(methodData.id)}} className="cardImg" src={methodData.image}></img>
                </NavLink>
            </Col>
        </Row>

        <Row className="justify-content-md-center">
            <Col>
            <h5 className="blackHeader cardHeader">{methodData.name}</h5>
            </Col>
        </Row>

        <div className="row justify-content-md-center fluid">
            <div className="col-auto fluid iconCol">
                <img className="cardIcon" src="personIcon2.svg"/>
                <p className="blackHeader cardHeader">{methodData.participantRange}</p>
            </div>
            <div className="col-auto fluid iconCol">
                <div className="row justify-content-md-center">
                    <div className="col-auto">
                        <img className="cardIcon" src="clockIcon2.svg"/>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-auto">
                        <p className="blackHeader cardHeader fluid">{methodData.timeRange}</p>
                    </div>
                </div>
            </div>
            <div className="col-auto fluid">
                <Row>
                    <Col md="auto" className="iconCol fluid">
                        <img className="cardIcon" src="tripleDiamondIcon2.svg"/>
                    </Col>
                </Row>
                <Row className="row justify-content-md-center">
                {/* <div className="row justify-content-md-center"> */}
                    {methodData.phase.map((phase) => (
                        <Col md="auto" className="circleCol fluid p-1">
                            <div id="circle" className={`circle + ${phase}`}></div>
                        </Col>
                    ))}
                </Row>
                    
            </div>
        </div>
        <Row className="justify-content-md-center">
            {/* <button onClick={()=>{()=>addToSprint(methodData.id); 
                (e) => setIsActive(!isActive)}}className="cardBtn">
                <h5 className="blackHeader cardHeader btnHead">Add</h5>
            </button> */}
            <Col className="justify-content-md-center d-flex">
            {!isinPlan &&<button className="cardBtn" onClick={(e) => {setIsActive(!isActive); setInputFocus}}>
                <h5 className="blackHeader cardHeader btnHead">Add</h5>
            </button>}
            {isinPlan &&<button onClick={ 
                ()=> removeThisMethod(`${underPhase}`)}className="cardBtn">
                <h5 className="blackHeader cardHeader btnHead">Remove</h5>
            </button>}
            </Col>
            
        </Row>
        {isActive && (
                <div className="dropDownMenu" tabIndex={0} onBlur={handleBlur} onFocus={handleFocus} ref={inputRef}>
                    {methodData.phase.map((phase) => (
                    <div className="row">
                        <div className="col-6">
                            <Form.Check type="checkbox" inline label={phase} onChange={()=> {phases.indexOf(`${phase}`) > -1 ? 
                            removeThisMethod(phase):addThisMethod(phase)}}/>

                        </div>
                    </div>
                    ))}
                </div>
            )}
             </Container>
    </div>
   
    )
    
};


const mapStateToProps = (state) => {
    return {
      viewingMethod: state.methodReducer.viewingMethod,
      selectedProject: state.projectReducer.selectedProject
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        addToSprint: (id, itemPhase) => dispatch(addToSprint(id,itemPhase)),
        adjustPhase: (id, itemPhase) => dispatch(adjustPhase(id, itemPhase)),
        removeFromSprint: (id,itemPhase) => dispatch(removeFromSprint(id,itemPhase)),
        showCurrentMethod:(id,itemPhase) => dispatch(showCurrentMethod(id,itemPhase)),
        removePhaseFromMethod:(id,itemPhase) => dispatch(removePhaseFromMethod(id,itemPhase)),
        flipViewingMethod: () => dispatch(flipViewingMethod())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MethodCard);
