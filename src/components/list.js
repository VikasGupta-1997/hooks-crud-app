import React from 'react';
import * as firebase from 'firebase'
import { EDIT } from '../actions/types'
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, modes, dataForUpdate } from '../actions'
const List = (props) => {
    const mapState = useSelector(state => state.formData)
    const dispacth = useDispatch()
    const deleteData = (id) => {
        // console.log('id is',id)
        dispacth(deleteUser(id))
        // const dbRef = firebase.database().ref(`hooks-crud/${id}`); 
        // dbRef.remove()
    }
    const updateUser = (id,state) => {
        dispacth(modes(EDIT))
        dispacth(dataForUpdate(id))
        // console.log('id is ',id)
        // dispacth(editUser(id,state))
    }
    // const updateUser = (data,key) => {
    //     dispacth(modes(EDIT))
    //     dispacth(dataForUpdate(data,key))
       
    // }
    return(
        <div>
            <ul>{
                    _.map(mapState.user,(data, key) =>{
                        return (
                            <li key={key} style = {{ display: 'flex' }} >
                            <div style = {{flex:1}} >
                               {data.firstName}&nbsp;&nbsp;{data.lastName}
                            </div>
                            <div style = {{flex:1}} >
                               {data.contact}
                            </div>
                            <div style = {{flex:1}} >
                               {data.selectState}
                            </div>
                            <div style = {{flex:1}} >
                               <button
                               onClick= { () => deleteData(key) }
                               className="ui button red">
                                   Delete
                               </button>
                            </div>
                            <div style = {{flex:1}} >
                               <button
                               // updateUser(key)
                               onClick= { () => updateUser(key) }
                               className="ui button blue">
                                   Update
                               </button>
                            </div>
                        </li>
                        );
                        }
                        
                    )
                    }
            </ul>
        </div>
    );
}
export default List;