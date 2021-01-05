export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  CLEAR_CART = "CLEAR_CART",
  INCREASE_QUANTITY = "INCREASE_QUANTITY",
  DECREASE_QUANTITY = "DECREASE_QUANTITY",
}

export const addToCart = (
  _id: string,
  size: number,
  price: number,
  name: string,
  imgSrc: string,
  quantity: number = 1,
) => {
  return {
    type: CartActionTypes.ADD_TO_CART,
    payload: { _id: _id + size, size, price, name, imgSrc, quantity },
  };
};

export const clearCart = () => {
  return {
    type: CartActionTypes.CLEAR_CART,
  };
};

export const increaseQuantity = (_id: string) => ({
  type: CartActionTypes.INCREASE_QUANTITY,
  payload: { _id },
});

export const decreaseQuantity = (_id: string) => ({
  type: CartActionTypes.DECREASE_QUANTITY,
  payload: { _id },
});
