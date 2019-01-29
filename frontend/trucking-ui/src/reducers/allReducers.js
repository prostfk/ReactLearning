import {combineReducers} from "redux";
import userReducer from "./workerReducer";
import stockReducer from './stockReducer';
import orderReducer from './orderReducer';
import workerReducer from './workerReducer';
import clientReducer from './clientReducer';
import autoReducer from './autoReducer';

export default combineReducers({

    autoReducer,
    clientReducer,
    orderReducer,
    stockReducer,
    userReducer,
    workerReducer,

})