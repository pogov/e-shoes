import React from "react";
import styles from "./Payment.module.scss";
import { connect } from "react-redux";
import CartDetails from "../../components/cartDetails/CartDetails";
import { CardElement } from "@stripe/react-stripe-js";
import { FormikValues } from "formik";
import { ItemsListProps } from "../../interfaces/ItemsListProps";
import { StateType } from "../../interfaces/StateType";

interface Props {
  items: ItemsListProps[];
  total: number;
  submit: (values: FormikValues) => Promise<void>;
  values: FormikValues;
  isProcessing: boolean;
}

const Payment: React.FC<Props> = ({
  items,
  total,
  submit,
  values,
  isProcessing,
}) => {
  const shippingFixed = parseFloat(values.shipping.replace(",", "."));
  const totalToPay = total + shippingFixed;
  const totalToPayFixed = Number(totalToPay.toFixed(2));
  return (
    <div className={styles.grid}>
      <div className={styles.cartReview}>
        <div>
          {items &&
            items.map((item) => (
              <CartDetails
                item={item}
                key={`${item._id}${item.size}`}
                cart={false}
              />
            ))}
        </div>
        <div className={styles.shipping}>
          <h4>Shipping: {values.shipping}</h4>
        </div>
        <div className={styles.total}>
          <h3>Total: {totalToPayFixed}</h3>
        </div>
      </div>
      <div className={styles.stripeContainer}>
        <CardElement />
        <button
          type="button"
          onClick={() => submit(values)}
          className={styles.backBtn}
          disabled={isProcessing}>
          pay {totalToPayFixed}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StateType) => {
  const { cart } = state;
  return {
    items: cart.cartItems,
    total: cart.total,
  };
};

export default connect(mapStateToProps)(Payment);
