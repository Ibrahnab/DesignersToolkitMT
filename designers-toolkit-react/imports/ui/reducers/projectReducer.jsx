import * as actionTypes from "../actions/types";

const INITIAL_STATE = {
    selectedTeam: "",
    selectedProject: ""
};

const projectReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.SELECT_TEAM:
            return {
                ...state,
                selectedTeam: action.payload.team
            }
        case actionTypes.SELECT_PROJECT:
            return {
                ...state,
                selectedProject: action.payload.project
            }
        default: 
            return state;
        
    }
};

export default projectReducer;