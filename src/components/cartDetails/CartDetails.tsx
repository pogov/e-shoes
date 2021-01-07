import React from "react";
import styles from "./CartDetails.module.scss";
import { ReactComponent as DeleteIcon } from "../../assets/deleteIcon.svg";

interface Props {
  item: any;
  increase?: any;
  decrease?: any;
  cart: boolean;
  deleteItem?: any;
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
      {cart && (
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
      <div>
        <h4>{item.price}</h4>
      </div>
    </div>
  );
};

export default CartDetails;
