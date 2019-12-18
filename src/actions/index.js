import {  ON_DISPLAY,
     ON_FORM_SUBMIT, 
     ON_DELETE,
    CHANGE_MODE,
    GET_DATA_FOR_UPDATE,
    ON_UPDATE} from './types'
import * as firebase from 'firebase'
import { database } from '../index'

export const saveUser = (data) =>
    async (dispatch, getState) => {
            const result = await database.push(data)
            return {
               type:ON_FORM_SUBMIT,
               payload: {...result}
           }
    }

export const showData = () => {
    return dispatch =>{
         database.on('value' , snapshot => {
        dispatch({
            type:ON_DISPLAY,
            payload:snapshot.val()
        })
    })
    }
}
export const deleteUser = (key) => {
    const dbRef = firebase.database().ref(`hooks-crud/${key}`); 
    dbRef.remove()
    return{
        type: ON_DELETE,
        payload: {key}
    }
  
}
export const modes = (mode) => {
    return{
        type: CHANGE_MODE,
        payload: mode
    }
}
export const dataForUpdate = (id) => {
    return{
        type: GET_DATA_FOR_UPDATE,
        payload: id
    }
}
// export const updateUser = (id) => {
//     const databaseUpdateRef = firebase.database().ref(`hooks-crud/${id}`); 
//     databaseUpdateRef.update(mapState.selectedUser);
// }
// export const editUser = (id,state) => {
//     const dbRef = firebase.database().ref(`hooks-crud/${id}`); 
//     dbRef.update(state[id])
//     return{
//         type: ON_UPDATE,
//         payload: {id}
//     }
// }
