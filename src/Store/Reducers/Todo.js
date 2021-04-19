import * as ActionTypes from '@actionsTypes'
const TodoReducer = (state = { cards: [] }, action)=>{
  switch (action.type) {
    case ActionTypes.ADD_CARD:
      return ({
        ...state,
        cards: [...state.cards, action.data]
      });
    case ActionTypes.REMOVE_CARD:
      return ({
        ...state,
        cards:state.cards.filter(x=>x.id!==action.id)
      });
    default:
      return state;
  }
}
export default TodoReducer;