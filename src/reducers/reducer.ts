// import { ItemsListProps } from "../interfaces/ItemsListProps";
import { ActionTypes } from "../actions/shoesActions";
import { CartActionTypes } from "../actions/cartActions";

const initialState = {
  shoes: [],
  next: {},
  previous: null,
  cart: {
    itemCount: 0,
    total: 0,
    cartItems: [],
  },
};

// type StateType = typeof initialState;

export const reducer = (state: any = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    //
    case ActionTypes.GET_ITEMS_SUCCES:
      return {
        ...state,
        shoes: [...state.shoes, ...payload.shoes],
        next: payload.next,
        previous: payload.previous,
      };

    case CartActionTypes.ADD_TO_CART:
      const newCartItem = { ...payload };
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, newCartItem],
          itemCount: state.cart.itemCount + 1,
        },
      };

    default:
      break;
  }
  return state;
};
