import { combineReducers } from "redux";
import user_reducer from "./user_reducer";
import product_reducer from "./product_reducer";
//
const rootReducer = combineReducers({ product_reducer, user_reducer });
//
export default rootReducer;
