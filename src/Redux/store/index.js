import applyMiddleware from "redux/src/applyMiddleware";
import { compose } from "react";
import { createStore } from "redux";
import reducer from "../Reducer/todo-reducer";
import thunk from "redux-thunk"; //thunk useful for  distach async action

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;
