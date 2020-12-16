export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
}

export const addToCart = (id: string, size: number, price: number) => {
  return { type: CartActionTypes.ADD_TO_CART, payload: { id, size, price } };
};
