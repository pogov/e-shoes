import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getItems } from "../redux/actions/shoesActions";
import ItemsList from "../containers/itemsList/ItemsList";
import styles from "./Main.module.scss";
import Loader from "../components/loader/Loader";
import { ShoesInitial } from "../redux/reducers/shoesReducer";
import { ThunkDispatch } from "redux-thunk";
import { StateType } from "../interfaces/StateType";
import { AnyAction } from "redux";
import Pagination from "../components/pagination/Pagination";

type ShoesStateProps = Pick<
  ShoesInitial,
  "next" | "loading" | "errors" | "query" | "left" | "previous"
>;
interface Props extends ShoesStateProps {
  getItems: (page: number, limit: number, query?: string) => Promise<void>;
}

const Main: React.FC<Props> = ({
  getItems,
  next,
  errors,
  query,
  previous,
  left,
}) => {
  const [buttonsState, setButtonsState] = useState("start");

  const handleClick = (direction: string) => {
    if (direction === "next" && next) {
      getItems(next.page, next.limit, query);
    }
    if (direction === "prev" && previous) {
      getItems(previous.page, previous.limit);
    }
  };

  useEffect(() => {
    if (!next) setButtonsState("end");
    if (!previous) setButtonsState("start");
    if (next && previous) setButtonsState("middle");
    if (!left && !next && !previous) setButtonsState("none");
  }, [next, previous, setButtonsState, left]);

  return (
    <main className={styles.wrapper}>
      {errors && <Loader errors={errors} />}
      <ItemsList />
      <Pagination handler={handleClick} buttonsState={buttonsState} />
    </main>
  );
};

interface ShoesState {
  shoes: ShoesInitial;
  query?: string;
}

const mapStateToProps = (state: ShoesState) => {
  const {
    shoes: { next, loading, errors, query, left, previous },
  } = state;
  return { next, loading, errors, query, left, previous };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, undefined, AnyAction>,
) => {
  return {
    getItems: (page: number, limit: number, query?: string) =>
      dispatch(getItems(page, limit, query)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
