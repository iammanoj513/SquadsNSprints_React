import constants from '../constants';
export const addSprint=(data:any)=>{
    return{
        type:constants.ADD_SPRINT,
        payload:data
    }
}