import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions/cartActions";
import styles from "./CartModal.module.scss";

type CartModalProps = {
  items: any;
  total: number;
  clear: any;
  handler: any;
  increase: any;
  decrease: any;
  // open: boolean;
};

const CartModal: React.FC<CartModalProps> = ({
  items,
  total,
  clear,
  handler,
  increase,
  decrease,
  // open,
}) => {
  const ConditionalLink = () => {
    if (total > 0) {
      return (
        <Link
          to="/cart"
          className={styles.checkoutBtn_Link}
          onClick={() => handler(false)}>
          checkout
        </Link>
      );
    }
    return (
      <button className={styles.checkoutBtn_Link} disabled={true}>
        checkout
      </button>
    );
  };

  const handleClear = () => {
    clear();
    // handler(false);
  };

  const cartIsEmpty = items.length === 0;

  return (
    <div className={styles.wrapper}>
      {!cartIsEmpty ? (
        <div className={styles.innerWrapper}>
          <div className={styles.list}>
            {items &&
              items.map((item: any) => (
                <div
                  key={`${item._id}${item.size}`}
                  className={styles.listItem}>
                  <img src={item.imgSrc} alt="" />
                  <h4>{item.name}</h4>
                  <p>{item.size}</p>
                  <div className={styles.qBtns}>
                    <button onClick={() => increase(item._id)}>v</button>
                    <button onClick={() => decrease(item._id)}>v</button>
                  </div>
                  <p>{item.quantity}</p>
                  <h4>{item.price}</h4>
                </div>
              ))}
          </div>
          <div className={styles.total}>
            <h3>Total: {total.toFixed(2)}</h3>
          </div>
          <button onClick={handleClear} className={styles.checkoutBtn}>
            clear cart
          </button>
          <ConditionalLink />
        </div>
      ) : (
        <h4>Your cart is empty</h4>
      )}
      <button
        className={styles.checkoutBtn_text}
        onClick={() => handler(false)}>
        close
      </button>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { cart } = state;
  return {
    items: cart.cartItems,
    total: cart.total,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    clear: () => dispatch(clearCart()),
    increase: (id: string) => dispatch(increaseQuantity(id)),
    decrease: (id: string) => dispatch(decreaseQuantity(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
