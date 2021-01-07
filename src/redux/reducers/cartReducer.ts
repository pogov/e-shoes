import { ItemsListProps } from "../../interfaces/ItemsListProps";
import { CartActionTypes } from "../actions/cartActions";

const initialState = {
  itemCount: 0,
  total: 0,
  cartItems: [],
};

export type Initial = {
  itemCount: number;
  total: number;
  cartItems: ItemsListProps[];
};

export const cart = (state: Initial = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    //
    case CartActionTypes.ADD_TO_CART:
      const ifCartAlreadyContains =
        state.cartItems.filter((item) => item._id === payload._id).length > 0;
      if (ifCartAlreadyContains) return state;

      return {
        cartItems: [...state.cartItems, { ...payload }],
        itemCount: state.itemCount + 1,
        total: (state.total += payload.price),
      };

    case CartActionTypes.CLEAR_CART:
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      };

    case CartActionTypes.INCREASE_QUANTITY:
      const [itemToIncrease] = state.cartItems.filter(
        (item) => item._id === payload._id,
      );
      if (itemToIncrease) {
        itemToIncrease.quantity = itemToIncrease.quantity! + 1;
      }
      const increasedTotal = state.total + itemToIncrease.price;
      return {
        itemCount: state.itemCount + 1,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== payload._id),
          itemToIncrease,
        ],
        total: increasedTotal,
      };

    case CartActionTypes.DECREASE_QUANTITY:
      if (state.itemCount === 1) {
        return {
          cartItems: [],
          itemCount: 0,
          total: 0,
        };
      }
      const [itemToDecrease] = state.cartItems.filter(
        (item) => item._id === payload._id,
      );
      const decreasedTotal = state.total - itemToDecrease.price;

      if (itemToDecrease.quantity === 1) {
        return {
          itemCount: state.itemCount - 1,
          total: decreasedTotal,
          cartItems: [
            ...state.cartItems.filter((item) => item._id !== payload._id),
          ],
        };
      }
      if (itemToDecrease) {
        itemToDecrease.quantity = itemToDecrease.quantity! - 1;
      }
      return {
        itemCount: state.itemCount - 1,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== payload._id),
          itemToDecrease,
        ],
        total: decreasedTotal,
      };

    default:
      break;
  }
  return state;
};
