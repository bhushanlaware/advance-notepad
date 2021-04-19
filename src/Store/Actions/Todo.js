import * as ActionTypes from "./ActionTypes";
import { TodoCard } from "@models/Todo";
import { IndexedDB } from "src/utils/IndexDB";

export const addCard = (title) => {
  const newCard = new TodoCard(title);
  (new IndexedDB()).insertTableRecord('TODOS', newCard);
  return dispatch => {
    dispatch({
      type: ActionTypes.ADD_CARD,
      data: newCard,
    });
    if (window.navigator.online) {
      //TODO: Add card to server db
    }
  }
}
export const removeCard = (id) => {
  return dispatch => {
    dispatch({
      type: ActionTypes.REMOVE_CARD,
      id,
    });
    (new IndexedDB()).deleteRecord('TODOS', id);
    if (window.navigator.online) {
      //TODO: Add card to server db
    }
  }
}