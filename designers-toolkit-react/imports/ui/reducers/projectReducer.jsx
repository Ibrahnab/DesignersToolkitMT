import * as actionTypes from "../actions/types";

const INITIAL_STATE = {
    selectedTeam: "",
    selectedProject: ""
};

const projectReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.SELECT_TEAM:
            return {
                selectedTeam: action.payload.team
            }
        case actionTypes.SELECT_PROJECT:
            return {
                selectedProject: action.payload.project
            }
        default: 
            return state;
        
    }
};

export default projectReducer;