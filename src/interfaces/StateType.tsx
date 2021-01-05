import { CartType } from "./CartType";
import { ItemsListProps } from "./ItemsListProps";
export interface StateType {
  shoes: {
    shoes: ItemsListProps[];
    loading: boolean;
    next: object;
    previous: object | null;
  };
  cart: CartType;
}
