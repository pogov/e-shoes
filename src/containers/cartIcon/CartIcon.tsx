import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { CartIconProps } from "../../interfaces/CartIconProps";
import { Initial } from "../../redux/reducers/cartReducer";
import styles from "./CartIcon.module.scss";
import { ReactComponent as Icon } from "../../assets/icon.svg";

type State = {
  cart: Initial;
};

const CartIcon: React.FC<CartIconProps> = ({ isItem, itemCount, handler }) => {
  const [isActive, setIsActive] = useState(false);
  const itemNumberElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemNumberElement.current) {
      setIsActive(true);
      const node = itemNumberElement.current;
      const handler = () => setIsActive(false);
      node.addEventListener("animationend", handler);
      return () => node.removeEventListener("animationend", handler);
    }
  }, [itemCount]);

  return (
    <div
      className={styles.cartIcon}
      onClick={() => handler((prev: any) => !prev)}>
      <Icon className={styles.icon} />
      {isItem && (
        <div
          ref={itemNumberElement}
          className={isActive ? styles.itemNumberActive : styles.itemNumber}>
          {itemCount}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  const { cart } = state;
  return {
    isItem: cart.itemCount > 0,
    itemCount: cart.itemCount,
  };
};

export default connect(mapStateToProps)(CartIcon);
