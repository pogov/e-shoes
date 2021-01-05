import { ItemsListProps } from "./ItemsListProps";
export interface CartType {
  itemCount: number;
  total: number;
  cartItems: ItemsListProps[];
}
