import React from "react";
import styles from "./Loader.module.scss";

interface Props {
  errors?: { message: string };
}

const Loader: React.FC<Props> = ({ errors }) => (
  <div className={styles.loader}>{errors && <h1>{errors.message}</h1>}</div>
);

export default Loader;
