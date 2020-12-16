import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./Main.module.scss";
import ItemsList from "../components/itemsList/ItemsList";
import { getItems } from "../actions/shoesActions";

const Main: React.FC = ({ getItems, next, previous }: any) => {
  const [isMore, setIsMore] = useState(true);

  const handleClick = (next: any, prev: any) => {
    if (!next) return;
    getItems(next.page, next.limit);
  };

  useEffect(() => {
    if (!next) setIsMore(false);
  }, [next]);

  return (
    <main className={styles.wrapper}>
      <ItemsList />
      {isMore && (
        <button
          onClick={() => handleClick(next, previous)}
          className={styles.moreBtn}>
          load more
        </button>
      )}
    </main>
  );
};

const mapStateToProps = (state: any) => {
  const { next, previous } = state;
  return { next, previous };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getItems: (page: number, limit: number) => dispatch(getItems(page, limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
