import { ItemsListProps } from "./ItemsListProps";
export interface ItemDetailsProps {
  item: ItemsListProps;
  chosenSize: number;
  handleClick: (e: MouseEvent) => void;
  addItemToCart: (
    id: string,
    size: number,
    price: number,
    name: string,
    imgSrc: string,
  ) => void;
}
