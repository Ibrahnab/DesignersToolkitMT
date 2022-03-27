import counterReducer from './counter'
import loggedReducer from './loggedReducer'
import methodReducer from './methodReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    loggedReducer: loggedReducer,
    methodReducer: methodReducer,
    projectReducer: projectReducer
});

export default allReducers