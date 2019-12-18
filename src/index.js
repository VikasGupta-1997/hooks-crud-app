import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as firebase from 'firebase'
import App from './components/App';
import { Provider } from 'react-redux'
import reducers from './reducers'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
 
var firebaseConfig = {
    apiKey: "AIzaSyCOhWlo06-jSbbV0it5ITIF7_y1mjoK6tY",
    authDomain: "hooks-crud.firebaseapp.com",
    databaseURL: "https://hooks-crud.firebaseio.com",
    projectId: "hooks-crud",
    storageBucket: "hooks-crud.appspot.com",
    messagingSenderId: "185194348437",
    appId: "1:185194348437:web:9644a3eaccc8b46b62009c"
  };
  firebase.initializeApp(firebaseConfig);
  const dbRef = firebase.database().ref('hooks-crud');
  export const database = dbRef;
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
ReactDOM.render(
                <Provider store = {store} >
                    <App />
                </Provider>, 
                document.getElementById('root')
                );

