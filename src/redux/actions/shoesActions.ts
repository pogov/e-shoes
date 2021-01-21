import { ItemsListProps } from "../../interfaces/ItemsListProps";
export enum ActionTypes {
  GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST",
  GET_ITEMS_SUCCES = "GET_ITEMS_SUCCES",
  GET_ITEMS_FAILURE = "GET_ITEMS_FAILURE",
}

export type DispatchProp = {
  type: ActionTypes;
  payload?: {
    shoes?: ItemsListProps[];
    next?: {};
    previous?: {};
    left?: boolean;
    error?: {};
  };
  // payload?: ShoesInitial & { left: boolean } & { error: {} };
};

export const getItems = (page: number, limit: number) => (
  dispatch: ({ type }: DispatchProp) => void,
) => {
  dispatch({ type: ActionTypes.GET_ITEMS_REQUEST });

  return fetch(`http://localhost:5500/api/items?page=${page}&limit=${limit}`)
    .then((res) => res.json())
    .then((result) => {
      dispatch({ type: ActionTypes.GET_ITEMS_SUCCES, payload: result });
    })
    .catch((error) => {
      dispatch({ type: ActionTypes.GET_ITEMS_FAILURE, payload: { error } });
    });
};
