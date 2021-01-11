import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

interface Props {}

const SearchBar = (props: Props) => {
  const [searched, setSearched] = useState("");
  return (
    <div className={styles.searchBar}>
      <input type="text" name="searchbox" id="searchbox" placeholder="search" />
    </div>
  );
};

export default SearchBar;
