import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} from "../../redux/actions/cartActions";
import styles from "./CartModal.module.scss";
import CartDetails from "../../components/cartDetails/CartDetails";

type CartModalProps = {
  items: any;
  total: number;
  clear: any;
  handler: any;
  increase: any;
  decrease: any;
  deleteItem: any;
};

const CartModal: React.FC<CartModalProps> = ({
  items,
  total,
  clear,
  handler,
  increase,
  decrease,
  deleteItem,
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

  const cartIsEmpty = items.length === 0;

  return (
    <div className={styles.wrapper}>
      {!cartIsEmpty ? (
        <div className={styles.innerWrapper}>
          <div className={styles.list}>
            {items &&
              items.map((item: any) => (
                <CartDetails
                  key={`${item._id}${item.size}`}
                  item={item}
                  increase={increase}
                  decrease={decrease}
                  deleteItem={deleteItem}
                  cart={true}
                />
              ))}
          </div>
          <div className={styles.total}>
            <h3>Total: {total}</h3>
          </div>
          <button onClick={() => clear()} className={styles.checkoutBtn}>
            clear cart
          </button>
          <ConditionalLink />
        </div>
      ) : (
        <h4>Your cart is empty</h4>
      )}
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
    deleteItem: (id: string) => dispatch(deleteItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
