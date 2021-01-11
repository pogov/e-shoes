import React from "react";
import styles from "./SearchBar.module.scss";
import { connect } from "react-redux";
import { onChangeSearch } from "../../redux/actions/shoesActions";

interface Props {
  onChangeQuery: any;
}

const SearchBar: React.FC<Props> = ({ onChangeQuery }) => {
  // const [searched, setSearched] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
    onChangeQuery(value);
  };
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        name="searchbox"
        id="searchbox"
        placeholder="search"
        onChange={handleChange}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChangeQuery: (value: string) => dispatch(onChangeSearch(value)),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
