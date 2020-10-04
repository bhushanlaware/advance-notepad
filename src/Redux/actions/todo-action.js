import * as actionTypes from "./action-types";

export const add = (cardIndex, str) => {
  return { type: actionTypes.ADD, data: { cardIndex, str } };
};
export const done = (cardIndex, str) => {
  return { type: actionTypes.ADD, data: { cardIndex, str } };
};
export const redo = (cardIndex, str) => {
  return { type: actionTypes.ADD, data: { cardIndex, str } };
};

export const deletee = (cardIndex, todoIndex) => {
  return { type: actionTypes.DELETE, data: { cardIndex, todoIndex } };
};
export const deleteCompleted = (cardIndex, todoIndex) => {
  return { type: actionTypes.DELETE_COMPLETED, data: { cardIndex, todoIndex } };
};

export const deleteAll = (cardIndex) => {
  return { type: actionTypes.DELETE_ALL, data: { cardIndex } };
};
export const deleteCompletedAll = (cardIndex) => {
  return { type: actionTypes.DELETE_COMPLETED_ALL, data: { cardIndex } };
};
