import { combineReducers } from 'redux';
import AddSquad from './squad/addSquad';
import DeleteSquad from './squad/deleteSquad';
import AddSprint from './sprint/addSprint'

export default combineReducers({
    squadData: AddSquad,
    deleteSquad: DeleteSquad,
    sprintData: AddSprint
});




