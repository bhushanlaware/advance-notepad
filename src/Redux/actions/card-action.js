import * as actionTypes from "./action-types";

export const addCard = () => {
  return { type: actionTypes.ADD_CARD };
};
export const removeCard = (index) => {
  return { type: actionTypes.REMOVE_CARD, index };
};
