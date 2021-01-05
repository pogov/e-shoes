import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ItemsListProps } from "../interfaces/ItemsListProps";
import ItemDetails from "../containers/itemDetails/ItemDetails";

interface ParamType {
  id: string;
}

const initialItem = {
  _id: "",
  sizes: [42],
  type: "",
  description: "",
  name: "",
  price: 0,
  imgSrc: "",
  tags: ["sport"],
};

const ItemDetailsTemplate: React.FC = ({ shoe }: any) => {
  const { id } = useParams<ParamType>();
  const [item, setItem] = useState<ItemsListProps>(initialItem);
  const [chosenSize, setChosenSize] = useState<number>(0);

  const handleClick = (e: any) => {
    setChosenSize(parseInt(e.target.textContent));
  };

  useEffect(() => {
    if (!shoe) {
      fetch(`http://localhost:5500/api/items/${id}`)
        .then((res) => res.json())
        .then((data) => setItem(data));
    }
    setItem(shoe);
  }, [shoe, id]);

  return (
    <ItemDetails
      item={item}
      chosenSize={chosenSize}
      handleClick={handleClick}
    />
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const shoe = state.shoes.shoes.find(
    (item: ItemsListProps) => item._id === ownProps.match.params.id,
  );
  return {
    shoe,
  };
};

export default connect(mapStateToProps)(ItemDetailsTemplate);
