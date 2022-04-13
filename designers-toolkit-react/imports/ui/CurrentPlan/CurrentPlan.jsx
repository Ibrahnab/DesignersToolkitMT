import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button  from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal"
import MethodCard from "../Shared/MethodCard";
import { suggestMethods } from "../actions/index";
import { connect } from "react-redux";
import {SuggestionsBox}  from "./SuggestionsBox";
import { useTracker } from 'meteor/react-meteor-data';
import { ProjectsCollection } from '/imports/api/ProjectsCollection';

const CurrentPlan = ({showCurrentMethod, flipViewingMethod, viewingMethod, currentSprintMethods, methods, suggestedMethods, suggestMethods, selectedProject}) => {
    
    const user = useTracker(() => Meteor.user());

    //Used for suggest methods popup
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [currentPhase, setCurrentPhase] = useState("");
    const [wobble, setWobble] = useState("0");

    //Used for synced sprint plan
    const projectMethods = useTracker(() => {
      if(!user || selectedProject === "") {
          return[]
      }

      const meths = ProjectsCollection.findOne({_id: selectedProject}).methodsUsed;
      //console.log(meths);
      
      return meths;
    });

    const projectTime = useTracker(() => {
      if(!user || selectedProject === "") {
          return[]
      }

      const meths = ProjectsCollection.findOne({_id: selectedProject}).methodsUsed;
      //console.log(meths);
      
      return meths;
    });

    const timeAllocated = useTracker(() => {

      if(!user || selectedProject === "") {
        return[]
    }

    const ta = ProjectsCollection.findOne({_id: selectedProject}).timeAllocated;
    //console.log(ta);
    return ta;
    
    })

    const timeUsed = useTracker(() => {

      if(!user || selectedProject === "") {
        return[]
    }

    const tu = ProjectsCollection.findOne({_id: selectedProject}).timeUsed;
    //console.log(tu);
    return tu;
    
    })

    const getTimeUsed = (requestedPhase) => {
      if(!user || selectedProject === "") {
        return ""
      }
      return timeUsed.find(obj => obj.phase === requestedPhase).time
    }
    const [selectedPhase, changePhase] = useState("SprintLock");

    return(
    <div>
      
      <Container className="pageContainer">
        <Row>
          <Col>
            <img className="tinyTripleDiamond" src="tinyTripleDiamond.svg"></img>
          </Col>
          <Col>
            <button className="sprint-plan-button planText" onClick={() => changePhase("SprintLock")}>Sprint Plan</button>
            <button className="sprint-plan-button planText" onClick={() => changePhase("NotesLock")}>Notes Overview</button>
          </Col>
        </Row>
        <Row>
          {/* ---------------SPRINT OVERVIEW-------------- */}
          <Col>
          {selectedPhase == "SprintLock" && 
            <>
              <Row className="sprintsContainer">
                <Col className="sprintCol">
                  <Row>
                    <Col><div className="circle sprint understand"></div></Col>
                    <Col><h5 className="blackHeader">Understand</h5></Col>
                  </Row>
                  {!user && currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze ==="understand") !== undefined).map((meth) => (
                    <MethodCard key={meth.id} methodData={meth} isinPlan={true} underPhase="understand"/> 
                  ))}
                  
                  {/* Signed in */}
                  {user && 
                    <Row>
                      <Col className="d-flex ml-auto pl-2" md="" style={{justifyContent: 'right'}}>
                        <h5 className="blackHeaderSlim">{getTimeUsed("understand")}/{timeAllocated[0]}m</h5>
                      </Col>
                    </Row>
                  }
                  {user && 
                    projectMethods.filter(meth => meth.inPhases.find((phaze) => phaze ==="understand") !== undefined).map((meth) => (
                    <MethodCard key={meth.methodId} methodData={methods.filter(m => m.id === meth.methodId)[0]} isinPlan={true} underPhase="understand"/> 
                  ))}

                  <button onClick={()=>{suggestMethods("understand"), setShow(true), setCurrentPhase("understand")}} className="currentplan-add-button"><img className="currentplan-plus-img" src="plus_img.svg"></img></button>
                  
                </Col>

                <Col className="sprintCol">
                  <Row>
                    <Col><div className="circle sprint define"></div></Col>
                    <Col><h5 className="blackHeader">Define</h5></Col>
                  </Row>

                  {!user && currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze ==="define") !== undefined).map((meth) => (
                    <MethodCard key={meth.id} methodData={meth} isinPlan={true} underPhase="define"/> 
                  ))}

                  {/* Signed in */}
                  {user && 
                    <Row>
                      <Col className="d-flex ml-auto pl-2" md="" style={{justifyContent: 'right'}}>
                        <h5 className="blackHeaderSlim">{getTimeUsed("define")}/{timeAllocated[1]}m</h5>
                      </Col>
                    </Row>
                  }
                  {user && projectMethods.filter(meth => meth.inPhases.find((phaze) => phaze ==="define") !== undefined).map((meth) => (
                    <MethodCard key={meth.methodId} methodData={methods.filter(m => m.id === meth.methodId)[0]} isinPlan={true} underPhase="define"/> 
                  ))}

                  <button onClick={()=>{suggestMethods("define"), setShow(true),setCurrentPhase("define")}} className="currentplan-add-button"><img className="currentplan-plus-img" src="plus_img.svg"></img></button>
                
                </Col>

                <Col className="sprintCol">
                <Row>
                    <Col><div className="circle sprint sketch"></div></Col>
                    <Col><h5 className="blackHeader">Sketch</h5></Col>
                  </Row>

                  {!user && currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze ==="sketch") !== undefined).map((meth) => (
                    <MethodCard key={meth.id} methodData={meth} isinPlan={true} underPhase="sketch"/> 
                  ))}

                  {/* Signed in */}
                  {user && 
                    <Row>
                      <Col className="d-flex ml-auto pl-2" md="" style={{justifyContent: 'right'}}>
                        <h5 className="blackHeaderSlim">{getTimeUsed("sketch")}/{timeAllocated[2]}m</h5>
                      </Col>
                    </Row>
                  }
                  {user && projectMethods.filter(meth => meth.inPhases.find((phaze) => phaze ==="sketch") !== undefined).map((meth) => (
                    <MethodCard key={meth.methodId} methodData={methods.filter(m => m.id === meth.methodId)[0]} isinPlan={true} underPhase="sketch"/> 
                  ))}

                  <button onClick={()=>{suggestMethods("sketch"), setShow(true), setCurrentPhase("sketch")}} className="currentplan-add-button"><img className="currentplan-plus-img" src="plus_img.svg"></img></button>
                  
                </Col>
                <Col className="sprintCol">

                <Row>
                    <Col><div className="circle sprint decide"></div></Col>
                    <Col><h5 className="blackHeader">Decide</h5></Col>
                  </Row>

                  {!user && currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze ==="decide") !== undefined).map((meth) => (
                    <MethodCard key={meth.id} methodData={meth} isinPlan={true} underPhase="decide"/> 
                  ))}

                  {/* Signed in */}
                  {user && 
                    <Row>
                      <Col className="d-flex ml-auto pl-2" md="" style={{justifyContent: 'right'}}>
                        <h5 className="blackHeaderSlim">{getTimeUsed("decide")}/{timeAllocated[3]}m</h5>
                      </Col>
                    </Row>
                  }
                  {user && projectMethods.filter(meth => meth.inPhases.find((phaze) => phaze ==="decide") !== undefined).map((meth) => (
                    <MethodCard key={meth.methodId} methodData={methods.filter(m => m.id === meth.methodId)[0]} isinPlan={true} underPhase="decide"/> 
                  ))}

                  <button onClick={()=>{suggestMethods("decide"), setShow(true), setCurrentPhase("decide")}} className="currentplan-add-button"><img className="currentplan-plus-img" src="plus_img.svg"></img></button>
                  
                </Col>

                <Col className="sprintCol">
                <Row>
                    <Col><div className="circle sprint prototype justify-content-md-center"></div></Col>
                    <Col><h5 className="blackHeader">Prototype</h5></Col>
                  </Row>

                  {!user && currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze ==="prototype") !== undefined).map((meth) => (
                    <MethodCard key={meth.id} methodData={meth} isinPlan={true} underPhase="prototype"/> 
                  ))}

                  {/* Signed in */}
                  {user && 
                    <Row>
                      <Col className="d-flex ml-auto pl-2" md="" style={{justifyContent: 'right'}}>
                        <h5 className="blackHeaderSlim">{getTimeUsed("prototype")}/{timeAllocated[4]}m</h5>
                      </Col>
                    </Row>
                  }
                  {user && projectMethods.filter(meth => meth.inPhases.find((phaze) => phaze ==="prototype") !== undefined).map((meth) => (
                    <MethodCard key={meth.methodId} methodData={methods.filter(m => m.id === meth.methodId)[0]} isinPlan={true} underPhase="prototype"/> 
                  ))}

                  <button onClick={()=>{suggestMethods("prototype"), setShow(true), setCurrentPhase("prototype")}} className="currentplan-add-button"><img className="currentplan-plus-img" src="plus_img.svg"></img></button>
                
                
                </Col>
                <Col className="sprintCol">
                <Row>
                    <Col><div className="circle sprint validate"></div></Col>
                    <Col><h5 className="blackHeader">Validate</h5></Col>
                  </Row>
                  {!user && currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze ==="validate") !== undefined).map((meth) => (
                    <MethodCard key={meth.id} methodData={meth} isinPlan={true} underPhase="validate"/> 
                  ))}

                  {/* Signed in */}
                  {user && 
                    <Row>
                      <Col className="d-flex ml-auto pl-2" md="" style={{justifyContent: 'right'}}>
                        <h5 className="blackHeaderSlim">{getTimeUsed("validate")}/{timeAllocated[5]}m</h5>
                      </Col>
                    </Row>
                  }
                  {user && projectMethods.filter(meth => meth.inPhases.find((phaze) => phaze ==="validate") !== undefined).map((meth) => (
                    <MethodCard key={meth.methodId} methodData={methods.filter(m => m.id === meth.methodId)[0]} isinPlan={true} underPhase="validate"/> 
                  ))}

                  <button onClick={()=>{suggestMethods("validate"), setShow(true), setCurrentPhase("validate")}} className="currentplan-add-button"><img className="currentplan-plus-img" src="plus_img.svg"></img></button>

                  </Col>
                  </Row>
                </>
                }
                {/* ---------------NOTES OVERVIEW------------------ */}
                {selectedPhase == "NotesLock" && 

                  <><Row>
                    <Col md="auto"><div className="circle sprint understand"></div></Col>
                    <Col><h5 className="black-note-header">Understand</h5></Col>
                  </Row>
                  <Row>
                    {currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze === "understand") !== undefined).map((meth) => (
                        <><Col md="auto">
                        <div className="notes-box">
                          <Row>
                            {/*<NavLink to="/methodologies">
                              <Col><img onClick={()=>{{!viewingMethod ? flipViewingMethod(): undefined}; showCurrentMethod(meth.id)}} className="note-img" src={meth.image}></img></Col>
                            </NavLink>*/}
                            <Col><img className="note-img" src={meth.image}></img></Col>
                          </Row>
                          <Row>
                          <Col><text className="note-header">{meth.name}</text></Col>
                          </Row>
                          <Row md="auto">
                          <Col><text className="note-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident,
                          sunt in culpa qui officia deserunt mollit anim
                          id est laborum </text></Col>
                          </Row>
                        </div>
                      </Col></>
                    ))}
                  </Row>
                  
                  <hr className="hr"></hr>

                  <Row>
                    <Col md="auto"><div className="circle sprint define"></div></Col>
                    <Col><h5 className="black-note-header">Define</h5></Col>
                  </Row>
                  <Row>
                    {currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze === "define") !== undefined).map((meth) => (
                        <><Col md="auto">
                        <div className="notes-box">
                          <Row>
                          <Col><img className="note-img" src={meth.image}></img></Col>
                          </Row>
                          <Row>
                          <Col><text className="note-header">{meth.name}</text></Col>
                          </Row>
                          <Row md="auto">
                          <Col><text className="note-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident,
                          sunt in culpa qui officia deserunt mollit anim
                          id est laborum </text></Col>
                          </Row>
                        </div>
                      </Col></>
                    ))}
                  </Row>
                  
                  <hr className="hr"></hr>

                  <Row>
                    <Col md="auto"><div className="circle sprint sketch"></div></Col>
                    <Col><h5 className="black-note-header">Sketch</h5></Col>
                  </Row>
                  <Row>
                  {currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze === "sketch") !== undefined).map((meth) => (
                        <><Col md="auto">
                        <div className="notes-box">
                          <Row>
                          <Col><img className="note-img" src={meth.image}></img></Col>
                          </Row>
                          <Row>
                          <Col><text className="note-header">{meth.name}</text></Col>
                          </Row>
                          <Row md="auto">
                          <Col><text className="note-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident,
                          sunt in culpa qui officia deserunt mollit anim
                          id est laborum </text></Col>
                          </Row>
                        </div>
                      </Col></>
                    ))}
                  </Row>
                  
                  <hr className="hr"></hr>

                  <Row>
                    <Col md="auto"><div className="circle sprint decide"></div></Col>
                    <Col><h5 className="black-note-header">Decide</h5></Col>
                  </Row>
                  <Row>
                  {currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze === "decide") !== undefined).map((meth) => (
                        <><Col md="auto">
                        <div className="notes-box">
                          <Row>
                          <Col><img className="note-img" src={meth.image}></img></Col>
                          </Row>
                          <Row>
                          <Col><text className="note-header">{meth.name}</text></Col>
                          </Row>
                          <Row md="auto">
                          <Col><text className="note-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident,
                          sunt in culpa qui officia deserunt mollit anim
                          id est laborum </text></Col>
                          </Row>
                        </div>
                      </Col></>
                    ))}
                  </Row>
                  
                  <hr className="hr"></hr>

                  <Row>
                    <Col md="auto"><div className="circle sprint prototype justify-content-md-center"></div></Col>
                    <Col><h5 className="black-note-header">Prototype</h5></Col>
                  </Row>
                  <Row>
                  {currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze === "prototype") !== undefined).map((meth) => (
                        <><Col md="auto">
                        <div className="notes-box">
                          <Row>
                          <Col><img className="note-img" src={meth.image}></img></Col>
                          </Row>
                          <Row>
                          <Col><text className="note-header">{meth.name}</text></Col>
                          </Row>
                          <Row md="auto">
                          <Col><text className="note-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident,
                          sunt in culpa qui officia deserunt mollit anim
                          id est laborum </text></Col>
                          </Row>
                        </div>
                      </Col></>
                    ))}
                  </Row>
                  
                  <hr className="hr"></hr>
                  
                  <Row>
                    <Col md="auto"><div className="circle sprint validate"></div></Col>
                    <Col><h5 className="black-note-header">Validate</h5></Col>
                  </Row>
                  <Row>
                  {currentSprintMethods.filter(meth => meth.inPhase.find((phaze) => phaze === "validate") !== undefined).map((meth) => (
                        <><Col md="auto">
                        <div className="notes-box">
                          <Row>
                          <Col><img className="note-img" src={meth.image}></img></Col>
                          </Row>
                          <Row>
                          <Col><text className="note-header">{meth.name}</text></Col>
                          </Row>
                          <Row md="auto">
                          <Col><text className="note-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                          sed do eiusmod tempor incididunt ut labore et dolore magna
                          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo consequat.
                          Duis aute irure dolor in reprehenderit in voluptate
                          velit esse cillum dolore eu fugiat nulla pariatur.
                          Excepteur sint occaecat cupidatat non proident,
                          sunt in culpa qui officia deserunt mollit anim
                          id est laborum </text></Col>
                          </Row>
                        </div>
                      </Col></>
                    ))}
                  </Row></>

                }
            </Col>
          </Row>
      </Container>
    
      <Modal show={show} onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter" centered>
        <div className="suggestion-box">
          <Container>
            <div className="row firstSearchRow">
              <Col className="col justify-content-md-center" >
                <h4 className="blackHeader firstSearchRow">Suggested methods for this phase</h4>
              </Col>
              {/* <Col className="col justify-content-md-center" sm="1">
                <img className="crossIcon firstSearchRow" src="crossIcon.svg"></img> 
              </Col> */}
            </div>
            <div className="row justify-content-center mt-3">
                {suggestedMethods.map((meth) => (
                    <div className="col-auto">
                    <MethodCard key={meth.id} methodData={meth} isinPlan={false}/> 
                    </div>
                ))}
            </div>
            <div className="row justify-content-center mt-4 mb-3">
              <div className="col-auto">
                  <img className="refresh-image" src="refresh_methods_img.svg" onAnimationEnd={() => setWobble(0)} wobble={wobble}  
                  onClick={()=>{suggestMethods(currentPhase), setWobble(1)}}></img>
              </div>
            </div>
          </Container>
        </div>
      </Modal>
    </div>
  ); 
};

const mapStateToProps = (state) => {
  return {
    methods: state.methodReducer.methods,
    currentSprintMethods: state.methodReducer.currentSprintMethods,
    suggestedMethods: state.methodReducer.suggestedMethods,
    selectedProject: state.projectReducer.selectedProject
  };
};

const mapDispatchToProps = dispatch => {
  return {
      suggestMethods: (id) => dispatch(suggestMethods(id)),
      showCurrentMethod:(id,itemPhase) => dispatch(showCurrentMethod(id,itemPhase)),
      flipViewingMethod: () => dispatch(flipViewingMethod())
  };
};

  export default connect(mapStateToProps,mapDispatchToProps)(CurrentPlan);