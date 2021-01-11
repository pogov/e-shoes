import React from "react";
import { FormikValues } from "formik";
import styles from "./ConfirmationPage.module.scss";
import CartDetails from "../../components/cartDetails/CartDetails";

interface Props {
  values: FormikValues;
}

const ConfirmationPage: React.FC<Props> = ({ values }) => {
  const { boughtItems } = values;
  return (
    <div className={styles.confirmationWrapper}>
      <h2>Congratulations!!! Payment has succeeded!</h2>
      <p>Dear {values.fullname},</p>
      <p>Your payment status is confirmed!</p>
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
      <p>
        All item will be sent to you as soon as possible at following address:
      </p>
      <p>{values.address}</p>
    </div>
  );
};

export default ConfirmationPage;
