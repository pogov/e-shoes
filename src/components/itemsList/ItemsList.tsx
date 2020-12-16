import React from "react";
import { ItemsListProps } from "../../interfaces/ItemsListProps";
import ItemCard from "../itemCard/ItemCard";
import styles from "./ItemsList.module.scss";
import { connect } from "react-redux";

type ItemsType = {
  items: ItemsListProps[];
};

const ItemsList = ({ items }: ItemsType) => {
  console.log(items);
  return (
    <div className={styles.wrapper}>
      {items && items.map((item) => <ItemCard key={item._id} {...item} />)}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  items: state.shoes,
});

export default connect(mapStateToProps)(ItemsList);
