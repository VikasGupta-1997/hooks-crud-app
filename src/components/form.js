import React,{useReducer, useRef, useCallback, useEffect} from 'react';
import { omit } from 'lodash';
import { ADD, EDIT } from '../actions/types'
import produce from "immer";
import { set, has } from "lodash";
import * as firebase from 'firebase'
import { saveUser, showData } from '../actions'
import {  useSelector, useDispatch } from 'react-redux';
function enhancedReducer(state, updateArg) {
    // check if the type of update argument is a callback function
    if (updateArg.constructor === Function) {
      return { ...state, ...updateArg(state) };
    }
    // if the type of update argument is an object
    if (updateArg.constructor === Object) {
      // does the update object have _path and _value as it's keys
      // if yes then use them to update deep object values
      if (has(updateArg, "_path") && has(updateArg, "_value")) {
        const { _path, _value } = updateArg;
  
        return produce(state, draft => {
          set(draft, _path, _value);
        });
      } else {
        return { ...state, ...updateArg };
      }
    }
}
const Form = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    contact: "",
    selectState:"",
  };
    const [state, updateState] = useReducer(enhancedReducer, initialState);
    const updateForm = useCallback(({ target: { value, name, type } }) => {
        const updatePath = name.split(".");
        if (updatePath.length === 1) {
            const [key] = updatePath;
            updateState({
              [key]: value
            });
          }
    })
    const mapState = useSelector(state => state.formData)
    const dispatch = useDispatch()
    const didMountRef = useRef(false)
    // const didMountRef = useRef(false)
    useEffect ( 
      () => {
          console.log('Called');
          dispatch(showData(state))
        }
    , [])
    useEffect(() => {
      // didMountRef.current = mapState.selectedUser
      // if (didMountRef.current) {
      //   if(mapState.selectedUser.firstName !== didMountRef.current.firstName ){
      //       updateState(didMountRef.current)
      //   }
      // } else {
      //   updateState(didMountRef.current);
      // }
      // if (didMountRef.current) {
      //   if (mapState.selectedUser) {
      //     updateState(mapState.selectedUser);
      //   }
      // } else {
      //   didMountRef.current = true;
      // }


      //if mapState.selectedUser changes it re-render and updates the state and if not it remains still
      if (mapState.selectedUser) {
        updateState(mapState.selectedUser);
      }
    }, [mapState.selectedUser]);

    const handleSubmit = async (e) => {
      e.preventDefault()
      // mapState(this.state.formControls)
      if(mapState.mode === ADD){
        dispatch(saveUser(state))
        state.firstName = '';
        state.lastName = '';
        state.contact = '';
        state.selectState = '';
        
        // updateState({
        //   [key]: ''
        // });
        console.log('submitted')
      }
      else if(mapState.mode === EDIT){
        const updatePath = `hooks-crud/${mapState.selectedUser.id}`
        const databaseUpdateRef = firebase.database().ref(updatePath);
        const dataToUpdate = omit(state, 'id')
        console.log('data to update', dataToUpdate, updatePath, state)
        const update = await databaseUpdateRef.update(dataToUpdate);
        console.log('u', update);
        console.log('Ready for update',omit(mapState.selectedUser, ['id']));
      }
      else{
        console.log('no mode is running')
      }
    }
    return(
        <div className="ui form">
            <form  onSubmit={handleSubmit}>
                <div className="ui two fields">
                    <div className="field">
                        <label>First Name</label>
                        <input 
                        type="text"
                        autoComplete = "off" 
                        required
                        name = "firstName"
                        onChange={updateForm}
                        value= {state.firstName}
                        // {mapState.mode === EDIT ? mapState.selectedUser.firstName :state.firstName}
                        />
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input 
                        type="text"
                        autoComplete = "off" 
                        name = "lastName"
                        onChange={updateForm}
                        value= {state.lastName}
                        // {mapState.mode === EDIT ? mapState.selectedUser.lastName :state.lastName}
                        />
                    </div>
                </div>
                <div className="ui two fields">
                    <div className="field">
                        <label>Contact Number</label>
                        <input 
                        type="text"
                        autoComplete = "off"
                        name = "contact"
                        onChange={updateForm}
                        value= {state.contact}
                        // {mapState.mode === EDIT ? mapState.selectedUser.contact :state.contact}
                        />
                    </div>
                    <div className="field">
                        <label>Select State</label>
                       <select  
                        onChange={updateForm}
                        className="ui select"
                        name = "selectState"
                        value= {state.selectState}
                        // {mapState.mode === EDIT ? mapState.selectedUser.selectState :state.selectState}
                        >
                           <option value="select">Select</option>
                           <option value="HR">Haryana</option>
                           <option value="PB">Punjab</option>
                           <option value="DL">Delhi</option>
                       </select>
                    </div>
                </div>
                <button className="ui button primary">Submit</button>
            </form>
        </div>
        
    );  
}
export default Form;



 
