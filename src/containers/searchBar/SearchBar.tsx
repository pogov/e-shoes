import React from "react";
import styles from "./SearchBar.module.scss";
import { connect } from "react-redux";
import { getItems } from "../../redux/actions/shoesActions";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { StateType } from "../../interfaces/StateType";

interface Props {
  getItems: any;
}

const SearchBar: React.FC<Props> = ({ getItems }) => {
  const [searched, setSearched] = React.useState("");
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearched(event.target.value);
    },
    [setSearched],
  );

  React.useEffect(() => {
    if (!searched) return;
    getItems(1, 9, searched);
  }, [searched, getItems]);
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        name="searchbox"
        id="searchbox"
        placeholder="search"
        onChange={handleChange}
        value={searched}
      />
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateType, undefined, AnyAction>,
) => {
  return {
    getItems: (page: number, limit: number, query?: string) =>
      dispatch(getItems(page, limit, query)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
