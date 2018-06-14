import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import  {createStore,combineReducers,applyMiddleware} from 'redux';
import  TodoListReducer from './reducer/TodoReducer';
import  CountReducer from './reducer/CountReducer';
import  thunk from 'redux-thunk';

// const reducer=(state={list:[]},action={})=>{
//     switch (action.type){
//         case "ADD_TODO":
//             const newState=Object.assign({},state);
//             newState.list.push(action.payload);
//             return newState;
//             break;
//         default:
//             return state;
//             break;
//     }
// };
const reducer=combineReducers({
    list:TodoListReducer,
    count:CountReducer
});
const store=createStore(reducer,{list:[],count:0},applyMiddleware(thunk));

function renderPage() {
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
renderPage();

store.subscribe(renderPage);

registerServiceWorker();
