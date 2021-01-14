export interface DropdownProps {
  list: Array<string | number>;
  header: string;
  handler: (e: React.MouseEvent) => void;
}
