import React, { useCallback } from "react";
import { connect } from "react-redux";
import { getItems } from "../redux/actions/shoesActions";
import ItemsList from "../containers/itemsList/ItemsList";
import styles from "./Main.module.scss";

const Main: React.FC = ({ getItems, next, loading }: any) => {
  //
  const handleClick = useCallback(
    (next: any) => {
      if (!next) return;
      getItems(next.page, next.limit);
    },
    [getItems],
  );

  const showButton = next && !loading;

  return (
    <main className={styles.wrapper}>
      <ItemsList />
      {showButton && (
        <button onClick={() => handleClick(next)} className={styles.moreBtn}>
          load more
        </button>
      )}
    </main>
  );
};

const mapStateToProps = (state: any) => {
  const {
    shoes: { next, loading },
  } = state;
  return { next, loading };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getItems: (page: number, limit: number) => dispatch(getItems(page, limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
