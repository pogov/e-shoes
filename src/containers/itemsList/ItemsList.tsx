import React from "react";
import { connect } from "react-redux";
import { ItemsListProps } from "../../interfaces/ItemsListProps";
import { StateType } from "../../interfaces/StateType";
import ItemCard from "../../components/itemCard/ItemCard";
import Loader from "../../components/loader/Loader";
import styles from "./ItemsList.module.scss";

type ItemsType = {
  items: ItemsListProps[];
  loading: boolean;
  previous: object | null;
};

const ItemsList = ({ items, loading, previous }: ItemsType) => {
  const showLoadingOnPagination = loading && !previous;

  return (
    <div className={styles.wrapper}>
      {showLoadingOnPagination && <Loader />}
      {items && items.map((item) => <ItemCard key={item._id} {...item} />)}
    </div>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    items: state.shoes.shoes,
    loading: state.shoes.loading,
    previous: state.shoes.previous,
  };
};

export default connect(mapStateToProps)(ItemsList);
