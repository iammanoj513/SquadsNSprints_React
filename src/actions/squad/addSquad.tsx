import constants from '../constants';
export const addSquad=(data:any)=>{
    return{
        type:constants.ADD_SQUAD,
        payload:data
    }
}