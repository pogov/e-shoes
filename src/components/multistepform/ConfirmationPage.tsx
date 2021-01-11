import React from "react";
import { FormikValues } from "formik";
import styles from "./ConfirmationPage.module.scss";
import { PaymentIntent } from "@stripe/stripe-js";
import CartDetails from "../../components/cartDetails/CartDetails";

interface Props {
  values: FormikValues;
  status: PaymentIntent.Status;
}

const ConfirmationPage: React.FC<Props> = ({ values, status }) => {
  const { boughtItems } = values;
  return (
    <div className={styles.confirmationWrapper}>
      {status === "succeeded" ? (
        <h2>Congratulasion!!! Payment has succeeded!</h2>
      ) : (
        <h3>Something went wrong...</h3>
      )}
      <p>Dear {values.fullname},</p>
      <p>Your payment status is: {status}</p>
      <p>You have bought:</p>
      <div className={styles.boughtItems}>
        {boughtItems.map((item: any) => (
          <CartDetails
            item={item}
            key={`${item._id}${item.size}`}
            cart={false}
          />
        ))}
      </div>
      <p>All item will be sent to you as soon as possible.</p>
    </div>
  );
};

export default ConfirmationPage;
