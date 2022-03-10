import counterReducer from './counter'
import loggedReducer from './loggedReducer'
import methodReducer from './methodReducer'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    counter: counterReducer,
    loggedReducer: loggedReducer,
    methodReducer: methodReducer
});

export default allReducers