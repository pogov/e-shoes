import { ActionTypes } from "../actions/shoesActions";
import { ItemsListProps } from "../../interfaces/ItemsListProps";

const initialState = {
  shoes: [],
  loading: false,
  next: {},
  previous: null,
};

type Initial = {
  shoes: ItemsListProps[];
  loading: boolean;
  next: object;
  previous: object | null;
};

export const shoes = (state: Initial = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    //

    case ActionTypes.GET_ITEMS_REQUEST:
      return { ...state, loading: true };

    case ActionTypes.GET_ITEMS_SUCCES:
      return {
        shoes: [...state.shoes, ...payload.shoes],
        loading: false,
        next: payload.next,
        previous: payload.previous,
        left: payload.left,
      };

    case ActionTypes.GET_ITEMS_FAILURE:
      console.log(payload);
      break;

    default:
      break;
  }
  return state;
};
