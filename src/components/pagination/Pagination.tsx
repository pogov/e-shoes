import React from "react";
import styles from "./Pagination.module.scss";

interface Props {
  handler: (direction: string) => void;
  buttonsState: string;
}

const Pagination: React.FC<Props> = ({ handler, buttonsState }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pagination}>
        {buttonsState !== "start" && buttonsState !== "none" && (
          <button onClick={() => handler("prev")}>previous page</button>
        )}
        {buttonsState !== "end" && buttonsState !== "none" && (
          <button onClick={() => handler("next")}>next page</button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
