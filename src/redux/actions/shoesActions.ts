import { ItemsListProps } from "../../interfaces/ItemsListProps";

export enum ActionTypes {
  GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST",
  GET_ITEMS_SUCCES = "GET_ITEMS_SUCCES",
  GET_ITEMS_FAILURE = "GET_ITEMS_FAILURE",
  GET_ITEMS_SUCCES_QUERY = "GET_ITEMS_SUCCES_QUERY",
}

type DispatchProp = {
  type: string;
  payload?: ItemsListProps[];
};

export const getItems = (page: number, limit: number, query?: string) => (
  dispatch: ({ type }: DispatchProp) => void,
) => {
  dispatch({ type: ActionTypes.GET_ITEMS_REQUEST });
  console.log("query from shoesAction", query);

  return fetch(
    `http://localhost:5500/api/items?page=${page}&limit=${limit}&query=${query}`,
  )
    .then((res) => res.json())
    .then((result) => {
      if (query) {
        dispatch({ type: ActionTypes.GET_ITEMS_SUCCES_QUERY, payload: result });
      } else {
        dispatch({ type: ActionTypes.GET_ITEMS_SUCCES, payload: result });
      }
    })
    .catch((err) => {
      dispatch({ type: ActionTypes.GET_ITEMS_FAILURE, payload: err });
    });
};
