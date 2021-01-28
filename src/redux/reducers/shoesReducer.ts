import { ActionTypes, DispatchProp } from "../actions/shoesActions";
import { ItemsListProps } from "../../interfaces/ItemsListProps";

const initialState = {
  shoes: [],
  loading: false,
  next: {},
  previous: null,
  errors: null,
};

export type ShoesInitial = {
  shoes: ItemsListProps[];
  loading: boolean;
  next: object;
  previous: object | null;
  errors: { message: string } | null;
  query?: string;
};

export const shoes = (
  state: ShoesInitial = initialState,
  action: DispatchProp,
) => {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.GET_ITEMS_REQUEST:
      return { ...state, loading: true };

    case ActionTypes.GET_ITEMS_SUCCES:
      if (payload && payload.shoes)
        return {
          shoes: [...state.shoes, ...payload.shoes],
          loading: false,
          next: payload.next,
          previous: payload.previous,
          left: payload.left,
        };
      break;

    case ActionTypes.GET_ITEMS_SUCCES_QUERY:
      if (payload && payload.shoes) {
        return {
          shoes: [...payload.shoes],
          loading: false,
          next: payload.next,
          previous: payload.previous,
          left: payload.left,
          query: payload.query,
        };
      }
      break;

    case ActionTypes.GET_ITEMS_FAILURE:
      if (payload)
        return {
          ...state,
          loading: false,
          errors: payload.error,
        };
      break;

    default:
      break;
  }
  return state;
};
