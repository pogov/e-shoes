import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
} from "../../redux/actions/cartActions";
import { Initial } from "../../redux/reducers/cartReducer";
import styles from "./CartModal.module.scss";
import CartDetails from "../../components/cartDetails/CartDetails";
import { Dispatch } from "redux";
import { ItemsListProps } from "../../interfaces/ItemsListProps";

type CartModalProps = {
  items: ItemsListProps[];
  total: number;
  clear: typeof clearCart;
  handler: () => void;
  increase: typeof increaseQuantity;
  decrease: typeof decreaseQuantity;
  deleteItem: typeof deleteItem;
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
          onClick={() => handler()}>
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
              items.map((item: ItemsListProps) => (
                <CartDetails
                  key={`${item._id}${item.sizes}`}
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

type State = {
  cart: Initial;
};

const mapStateToProps = (state: State) => {
  const { cart } = state;
  return {
    items: cart.cartItems,
    total: cart.total,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    clear: () => dispatch(clearCart()),
    increase: (id: string) => dispatch(increaseQuantity(id)),
    decrease: (id: string) => dispatch(decreaseQuantity(id)),
    deleteItem: (id: string) => dispatch(deleteItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartModal);
