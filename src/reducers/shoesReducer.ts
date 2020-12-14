import { ItemsListProps } from "../interfaces/ItemsListProps";
export const shoesReducer = (state: ItemsListProps[] = [], action: any) => {
  switch (action.type) {
    case "GET_ITEMS_SUCCES":
      console.log(action.payload);
      const { payload } = action;
      return [...state, ...payload];
    default:
      break;
  }
  return state;
};
