import React from "react";
import styles from "./CartIcon.module.scss";
import { CartIconProps } from "../../interfaces/CartIconProps";

import { ReactComponent as Icon } from "../../assets/icon.svg";

const CartIcon: React.FC<CartIconProps> = ({ isItem }) => {
  return (
    <div
      className={styles.cartIcon}
      onClick={() => console.log("open cart shopping modal")}>
      <Icon className={styles.icon} />
      {isItem && <div className={styles.itemNumber}>15</div>}
    </div>
  );
};

export default CartIcon;
