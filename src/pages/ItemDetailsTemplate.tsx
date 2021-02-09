import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ItemsListProps } from "../interfaces/ItemsListProps";
import ItemDetails from "../containers/itemDetails/ItemDetails";
import { ShoesInitial } from "../redux/reducers/shoesReducer";

interface ParamType {
  id: string;
}

interface Props {
  shoe: ItemsListProps;
}

const ItemDetailsTemplate: React.FC<Props> = ({ shoe }) => {
  const { id } = useParams<ParamType>();
  const [item, setItem] = useState<ItemsListProps>();
  const [chosenSize, setChosenSize] = useState<number>(0);

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_HEROKU_BASE_URL
      : "http://localhost:5500";

  const handleClick = (e: React.MouseEvent) => {
    const input = e.target as HTMLElement;
    if (!input || !input.textContent) return;
    setChosenSize(parseInt(input.textContent));
  };

  useEffect(() => {
    if (!shoe) {
      fetch(`${BASE_URL}/api/items/${id}`)
        .then((res) => res.json())
        .then((data) => setItem(data));
    }
    setItem(shoe);
  }, [shoe, id, BASE_URL]);

  if (!item) return null;

  return (
    <ItemDetails
      item={item}
      chosenSize={chosenSize}
      handleClick={handleClick}
    />
  );
};

interface ShoesState {
  shoes: ShoesInitial;
}

interface OwnProps {
  match: { params: { id: string } };
}

const mapStateToProps = (state: ShoesState, ownProps: OwnProps) => {
  const shoe = state.shoes.shoes.find(
    (item: ItemsListProps) => item._id === ownProps.match.params.id,
  );

  if (!shoe) return;
  return {
    shoe,
  };
};

export default connect(mapStateToProps)(ItemDetailsTemplate);
