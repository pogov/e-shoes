export interface CartIconProps {
  isItem: boolean;
  itemCount: number;
  handler: React.Dispatch<React.SetStateAction<boolean>>;
}
