import { combineReducers } from "redux";
import user_reducer from "./user_reducer";
import product_reducer from "./product_reducer";
//
const rootReducer = combineReducers({ user_reducer, product_reducer });
//
export default rootReducer;
