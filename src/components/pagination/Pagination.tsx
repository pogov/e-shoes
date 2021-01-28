import React from "react";
import styles from "./Pagination.module.scss";

interface Props {
  next: { page: number; limit: number };
  left?: number;
  handler: (next: any) => void;
}

const Pagination: React.FC<Props> = ({ next, left, handler }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.pagination}>
        {[...Array(1).keys()].slice(1).map((n) => (
          <button className={styles.number}>{n}</button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
