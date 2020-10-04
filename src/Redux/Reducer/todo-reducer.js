import * as actionTypes from "../actions/action-types";

let initialState = [];

export default (state = initialState, action) => {
  let newTodo = [];
  switch (action.type) {
    case actionTypes.ADD_CARD:
      return [...state, []];
    case actionTypes.REMOVE_CARD:
      debugger;
      newTodo = [...state];
      newTodo.splice(action.index, 1);
      return newTodo;
    case actionTypes.ADD:
      return [...state][action.cardIndex][0].push(action.str);
    case actionTypes.DONE:
      newTodo = [...state][action.cardIndex][1].push(
        state[action.cardIndex][0][action.todoIndex]
      );
      newTodo[action.cardIndex][0].splice(action.todoIndex, 1);
      return newTodo;
    default:
      return state;
  }
};
