import { ItemsListProps } from "../interfaces/ItemsListProps";

export enum ActionTypes {
  GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST",
  GET_ITEMS_SUCCES = "GET_ITEMS_SUCCES",
  GET_ONE_ITEM = "GET_ONE_ITEM",
}

type DispatchProp = {
  type: string;
  payload?: ItemsListProps[];
};

export const getItems = (page: number, limit: number) => (
  dispatch: ({ type }: DispatchProp) => void,
) => {
  dispatch({ type: ActionTypes.GET_ITEMS_REQUEST });

  return fetch(`http://localhost:5500/api/items?page=${page}&limit=${limit}`)
    .then((res) => res.json())
    .then((result) => {
      dispatch({ type: ActionTypes.GET_ITEMS_SUCCES, payload: result });
    });
};

export const getOneItem = (id: string) => {
  return { type: ActionTypes.GET_ONE_ITEM, payload: id };
};
