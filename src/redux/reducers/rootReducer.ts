import { combineReducers } from "redux";
import { shoes } from "./shoesReducer";
import { cart } from "./cartReducer";

export default combineReducers({ shoes, cart });
