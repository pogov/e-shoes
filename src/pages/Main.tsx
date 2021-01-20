import React, { useCallback } from "react";
import { connect } from "react-redux";
import { getItems } from "../redux/actions/shoesActions";
import ItemsList from "../containers/itemsList/ItemsList";
import styles from "./Main.module.scss";
import Loader from "../components/loader/Loader";
import { ShoesInitial } from "../redux/reducers/shoesReducer";
import { ThunkDispatch } from "redux-thunk";
import { StateType } from "../interfaces/StateType";
import { AnyAction } from "redux";

type ShoesStateProps = Pick<ShoesInitial, "next" | "loading" | "errors">;
interface Props extends ShoesStateProps {
  getItems: (page: number, limit: number) => Promise<void>;
}

const Main: React.FC<Props> = ({ getItems, next, loading, errors }) => {
  //
  const handleClick = useCallback(
    (next: any) => {
      if (!next) return;
      getItems(next.page, next.limit);
    },
    [getItems],
  );

  const showButton = next && !loading && !errors;

  return (
    <main className={styles.wrapper}>
      {errors && <Loader errors={errors} />}
      <ItemsList />
      {showButton && (
        <button onClick={() => handleClick(next)} className={styles.moreBtn}>
          load more
        </button>
      )}
    </main>
  );
};

interface ShoesState {
  shoes: ShoesInitial;
}

const mapStateToProps = (state: ShoesState) => {
  const {
    shoes: { next, loading, errors },
  } = state;
  return { next, loading, errors };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, undefined, AnyAction>,
) => {
  return {
    getItems: (page: number, limit: number) => dispatch(getItems(page, limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
