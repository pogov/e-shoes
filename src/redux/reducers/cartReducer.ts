import { ItemsListProps } from "../../interfaces/ItemsListProps";
import { CartActionTypes, CartActions } from "../actions/cartActions";
import { getFromLocalStorage } from "./reducerHelpers";

const initialState = {
  itemCount: 0,
  total: 0,
  cartItems: [],
  shipping: 0,
};

export type Initial = {
  itemCount: number;
  total: number;
  cartItems: ItemsListProps[];
};

const initialFromLocalStorage: Initial = getFromLocalStorage<Initial>(
  "e_Shoes-cart",
  initialState,
);

export const cart = (
  state: Initial = initialFromLocalStorage,
  action: CartActions,
) => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      const addPayload = action.payload;

      const ifCartAlreadyContains =
        state.cartItems.filter((item) => item._id === addPayload._id).length >
        0;
      if (ifCartAlreadyContains) return state;

      const newTotal = state.total + addPayload.price;
      const newTotalFixed = Number(newTotal.toFixed(2));

      return {
        cartItems: [...state.cartItems, { ...addPayload }],
        itemCount: state.itemCount + 1,
        total: newTotalFixed,
      };

    case CartActionTypes.CLEAR_CART:
      return {
        cartItems: [],
        itemCount: 0,
        total: 0,
      };

    case CartActionTypes.DELETE_ITEM:
      const deletePayload = action.payload;
      const [itemToDelete] = state.cartItems.filter(
        (item) => item._id === deletePayload._id,
      );

      if (!itemToDelete.quantity) return;
      const calculatedTotal =
        state.total - itemToDelete.price * itemToDelete.quantity;
      const fixedCalculatedTotal = Number(calculatedTotal.toFixed(2));
      return {
        itemCount: state.itemCount - itemToDelete.quantity,
        total: fixedCalculatedTotal,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== deletePayload._id),
        ],
      };

    case CartActionTypes.INCREASE_QUANTITY:
      const increasePayload = action.payload;
      const [itemToIncrease] = state.cartItems.filter(
        (item) => item._id === increasePayload._id,
      );
      if (!itemToIncrease) return;
      const itemToIncreaseCopy = { ...itemToIncrease };
      if (itemToIncreaseCopy.quantity) {
        itemToIncreaseCopy.quantity = itemToIncreaseCopy.quantity + 1;
      }

      const increasedTotal = state.total + itemToIncrease.price;
      const fixedIncreasedTotal = Number(increasedTotal.toFixed(2));
      return {
        itemCount: state.itemCount + 1,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== increasePayload._id),
          itemToIncreaseCopy,
        ],
        total: fixedIncreasedTotal,
      };

    case CartActionTypes.DECREASE_QUANTITY:
      const decreasePayload = action.payload;
      const { _id } = decreasePayload;

      const [itemToDecrease] = state.cartItems.filter(
        (item) => item._id === _id,
      );
      const decreasedTotal = state.total - itemToDecrease.price;

      const itemToDecreaseCopy = { ...itemToDecrease };

      if (itemToDecreaseCopy.quantity === 1) return state;
      const fixedDecreasedTotal = Number(decreasedTotal.toFixed(2));
      itemToDecreaseCopy.quantity =
        itemToDecreaseCopy.quantity && itemToDecreaseCopy.quantity - 1;

      return {
        itemCount: state.itemCount - 1,
        cartItems: [
          ...state.cartItems.filter((item) => item._id !== decreasePayload._id),
          itemToDecreaseCopy,
        ],
        total: fixedDecreasedTotal,
      };

    case CartActionTypes.SET_SHIPPING:
      const shippingPayload = action.payload;

      return {
        ...state,
        shipping: parseFloat(shippingPayload.shippingValue.replace(",", ".")),
      };

    default:
      break;
  }
  return state;
};
