export interface ItemsListProps {
  _id: string;
  type: string;
  name: string;
  price: number;
  description: string;
  sizes: number[];
  tags: string[];
  imgSrc: string;
  quantity?: number;
}
