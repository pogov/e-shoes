import React from "react";
import { Link } from "react-router-dom";
import styles from "./Checkout.module.scss";
import MultiStepForm from "../containers/multistepForm/MultiStepForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51I6iRpIuk4aa3giu7lEjjcFz0Q3UMGIfKFE6kXxqmcqnfAzBD39id8v39yypxSuxkWzDCivAxJal90tGhyfKZM3L00CeUYNshj",
);

const Checkout: React.FC = () => {
  return (
    <div className={styles.cart}>
      <Elements stripe={stripePromise}>
        <MultiStepForm />
      </Elements>
      <Link className={styles.backBtn} to="/">
        back to product list
      </Link>
    </div>
  );
};

export default Checkout;
