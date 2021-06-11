import constants from '../../actions/constants';

export default (state = {}, action: any) => {
    switch (action.type) {
        case constants.DELETE_SQUAD:
            return action.payload
        default:
            return state
    }
}