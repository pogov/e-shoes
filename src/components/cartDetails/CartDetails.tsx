import React from "react";
import styles from "./CartDetails.module.scss";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";
import { CartActionTypes } from "../../redux/actions/cartActions";
import { ItemsListProps } from "../../interfaces/ItemsListProps";

interface Props {
  item: ItemsListProps;
  increase?: (
    _id: string,
  ) => { type: CartActionTypes; payload: { _id: string } };
  decrease?: (
    _id: string,
  ) => { type: CartActionTypes; payload: { _id: string } };
  cart: boolean;
  deleteItem?: (
    _id: string,
  ) => { type: CartActionTypes; payload: { _id: string } };
}

const CartDetails: React.FC<Props> = ({
  item,
  increase,
  decrease,
  cart,
  deleteItem,
}) => {
  return (
    <div className={styles.listItem}>
      <img src={item.imgSrc} alt="" />
      <div style={{ textAlign: "start" }}>
        <h4>{item.name}</h4>
        <p>size: {item.size}</p>
        <p>quantity: {item.quantity}</p>
      </div>
      {cart && increase && decrease && deleteItem && (
        <div className={styles.btnsContainer}>
          <div className={styles.qBtns}>
            <button onClick={() => increase(item._id)}>+</button>
            <button onClick={() => decrease(item._id)}>-</button>
          </div>
          <div>
            <button onClick={() => deleteItem(item._id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      )}
      <div className={styles.price}>
        <h4>{item.price}</h4>
      </div>
    </div>
  );
};

export default CartDetails;
