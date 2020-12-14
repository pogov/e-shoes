import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { shoesReducer } from "../reducers/shoesReducer";

const shoesStore = createStore(shoesReducer, applyMiddleware(thunk));

export default shoesStore;
