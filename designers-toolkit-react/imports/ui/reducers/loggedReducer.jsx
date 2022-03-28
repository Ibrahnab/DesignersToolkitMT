
import * as actionTypes from "../actions/types"

INITIAL_STATE = {
    loggedIn: false,
}

const loggedReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.SIGN_IN:
            return {
                loggedIn: !state.loggedIn
            }
        case actionTypes.SIGN_OUT:
            return {
                loggedIn: !state.loggedIn
            }
        // case 'SIGN_IN':
        //     return !state;
        // case 'SIGN_OUT':
        //     return !state;
        default: 
            return state;
        
    }
};

export default loggedReducer;