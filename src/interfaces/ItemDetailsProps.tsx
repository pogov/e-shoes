import { ItemsListProps } from "./ItemsListProps";
export interface ItemDetailsProps {
  item: ItemsListProps;
  chosenSize: number;
  handleClick: (e: MouseEvent) => void;
  addItemToCart: (
    i: string,
    s: number,
    p: number,
    n: string,
    img: string,
  ) => void;
}
