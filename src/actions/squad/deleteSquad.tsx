import constants from '../constants';
export const deleteSquad=(data:any)=>{
    return{
        type:constants.DELETE_SQUAD,
        payload:data
    }
}