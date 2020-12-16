import { ItemsListProps } from "../interfaces/ItemsListProps";

type DispatchProp = {
  type: string;
  payload?: ItemsListProps[];
};

export const getItems = (page: number, limit: number) => (
  dispatch: ({ type }: DispatchProp) => void,
) => {
  dispatch({ type: "GET_ITEMS_REQUEST" });

  return fetch(`http://localhost:5500/api/items?page=${page}&limit=${limit}`)
    .then((res) => res.json())
    .then((result) => {
      dispatch({ type: "GET_ITEMS_SUCCES", payload: result });
    });
};

export const getOneItem = (id: string) => {
  return { type: "GET_ONE_ITEM", payload: id };
};
