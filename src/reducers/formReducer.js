import { ON_FORM_SUBMIT, 
    ON_DISPLAY, 
    CHANGE_MODE, 
    ON_DELETE, 
    ADD, EDIT, 
    GET_DATA_FOR_UPDATE,
    ON_UPDATE } from '../actions/types';
import { omit } from 'lodash'
const INITIAL_STATE = {
    mode: ADD,
    user:{}
}
export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_FORM_SUBMIT:
            return {...state,user:action.payload}
        case ON_DISPLAY:
            return  {...state,user:action.payload} 
        case ON_DELETE:
            const { id } = action.payload
            return { ...state,user:omit(state.user,[id]) }
        case EDIT:
            return { mode: action.payload}
        case CHANGE_MODE:
            return{ ...state, mode:action.payload }
        case GET_DATA_FOR_UPDATE: {
            const id = action.payload
            const item = { id, ...state.user[id] }
            return { ...state, selectedUser: item }
        }
        // case ON_UPDATE:
        //     const { key = 'mode', value = 'EDIT' } = action.payload;
        //     return {
        //         ...state, [key]: value
        //     }
        default:
            return state
    }
}
