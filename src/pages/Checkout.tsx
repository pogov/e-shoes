import React from "react";
import styles from "./Checkout.module.scss";
import MultiStepForm from "../components/multistepform/MultiStepForm";

const Checkout: React.FC = () => {
  return (
    <div className={styles.cart}>
      <MultiStepForm />
    </div>
  );
};

export default Checkout;
