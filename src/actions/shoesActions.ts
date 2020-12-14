import { ItemsListProps } from "../interfaces/ItemsListProps";

type DispatchProp = {
  type: string;
  payload?: ItemsListProps[];
};

export const getItems = () => (dispatch: ({ type }: DispatchProp) => void) => {
  dispatch({ type: "GET_ITEMS_REQUEST" });

  return fetch("http://localhost:5500/api/items")
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: "GET_ITEMS_SUCCES", payload: data });
    });
};

export const getOneItem = (id: string) => {
  return { type: "GET_ONE_ITEM", payload: id };
};
