import { ItemsListProps } from "../../interfaces/ItemsListProps";
export enum ActionTypes {
  GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST",
  GET_ITEMS_SUCCES = "GET_ITEMS_SUCCES",
  GET_ITEMS_FAILURE = "GET_ITEMS_FAILURE",
  GET_ITEMS_SUCCES_QUERY = "GET_ITEMS_SUCCES_QUERY",
}

export type DispatchProp = {
  type: ActionTypes;
  payload?: {
    shoes?: ItemsListProps[];
    next?: { page: number; limit: number };
    previous?: { page: number; limit: number };
    left?: boolean;
    error?: {};
    query?: string;
    count?: number;
  };
};

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_HEROKU_BASE_URL
    : "http://localhost:5500";

export const getItems = (page: number, limit: number, query?: string) => (
  dispatch: ({ type }: DispatchProp) => void,
) => {
  dispatch({ type: ActionTypes.GET_ITEMS_REQUEST });

  return fetch(
    `${BASE_URL}/api/items?page=${page}&limit=${limit}&query=${query}`,
  )
    .then((res) => res.json())
    .then((result) => {
      if (query) {
        dispatch({
          type: ActionTypes.GET_ITEMS_SUCCES_QUERY,
          payload: { ...result, query },
        });
      } else {
        dispatch({ type: ActionTypes.GET_ITEMS_SUCCES, payload: result });
      }
    })
    .catch((error) => {
      dispatch({ type: ActionTypes.GET_ITEMS_FAILURE, payload: { error } });
    });
};
