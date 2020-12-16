import React from "react";
import { connect } from "react-redux";
import styles from "./CartIcon.module.scss";
import { CartIconProps } from "../../interfaces/CartIconProps";

import { ReactComponent as Icon } from "../../assets/icon.svg";

const CartIcon: React.FC<CartIconProps> = ({ isItem, itemCount }) => {
  return (
    <div
      className={styles.cartIcon}
      onClick={() => console.log("open cart shopping modal")}>
      <Icon className={styles.icon} />
      {isItem && <div className={styles.itemNumber}>{itemCount}</div>}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log("cart icon", state);
  return {
    isItem: state.cart.itemCount > 0,
    itemCount: state.cart.itemCount,
  };
};

export default connect(mapStateToProps)(CartIcon);
