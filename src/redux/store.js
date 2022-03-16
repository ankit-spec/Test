import reducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const middlewares = [thunk];
// if (__DEV__) {
//     middlewares.push(logger);
// }

export default createStore(reducer, applyMiddleware(...middlewares))