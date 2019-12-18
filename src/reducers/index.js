import { combineReducers } from 'redux';
import formReducer from './formReducer'
const reducers = combineReducers({
    formData: formReducer
})
export default reducers;