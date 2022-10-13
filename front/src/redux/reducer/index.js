import { combineReducers } from "redux";
import product_reducer from "./product_reducer";
//
const rootReducer = combineReducers({ product_reducer });
//
export default rootReducer;
