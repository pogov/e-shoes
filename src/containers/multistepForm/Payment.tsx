import React from "react";
import styles from "./Payment.module.scss";
import { connect } from "react-redux";
import CartDetails from "../../components/cartDetails/CartDetails";
import { CardElement } from "@stripe/react-stripe-js";

interface Props {
  items: any;
  total: number;
}

const Payment: React.FC<Props> = ({ items, total }) => {
  return (
    <div className={styles.grid}>
      <div className={styles.cartReview}>
        <div className={styles.list}>
          {items &&
            items.map((item: any) => (
              <CartDetails
                item={item}
                key={`${item._id}${item.size}`}
                cart={false}
              />
            ))}
        </div>
        <div className={styles.total}>
          <h3>Total: {total.toFixed(2)}</h3>
        </div>
      </div>
      <div className={styles.stripeContainer}>
        <CardElement />
      </div>
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

export default connect(mapStateToProps)(Payment);
