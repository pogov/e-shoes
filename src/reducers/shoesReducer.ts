import { ItemsListProps } from "../interfaces/ItemsListProps";

const initialState = {
  shoes: [],
  next: {},
  previous: null,
};

type StateType = {
  shoes: ItemsListProps[];
};

export const shoesReducer = (state: StateType = initialState, action: any) => {
  switch (action.type) {
    case "GET_ITEMS_SUCCES":
      const { payload } = action;
      console.log("payload", payload);
      console.log("state", state);
      return {
        ...state,
        shoes: [...state.shoes, ...payload.shoes],
        next: payload.next,
        previous: payload.previous,
      };
    default:
      break;
  }
  return state;
};
