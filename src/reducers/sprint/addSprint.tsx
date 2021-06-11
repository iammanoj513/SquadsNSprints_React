import constants from '../../actions/constants';

export default (state = {}, action: any) => {
    switch (action.type) {
        case constants.ADD_SPRINT:
            return action.payload
        default:
            return state
    }
}