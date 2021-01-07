import React from "react";
import { FormikValues } from "formik";
import styles from "./LoginPage.module.scss";
import { PaymentIntent } from "@stripe/stripe-js";

interface Props {
  values: FormikValues;
  status: PaymentIntent.Status;
}

const ConfirmationPage: React.FC<Props> = ({ values, status }) => {
  console.log("status log from confirmation page", status);
  return (
    <div className={styles.wrapper}>
      {status === "succeeded" ? (
        <h2>Congratulasion!!! Payment has succeeded!</h2>
      ) : (
        <h3>Something went wrong...</h3>
      )}
      <h3>Data confirmation</h3>
      <p>username: {values.username}</p>
      <p>is our customer: {values.isUser ? "yes" : "no"}</p>
      <p>email: {values.email}</p>
      <p>fullname: {values.fullname}</p>
      <p>address: {values.address}</p>
      <p>phone: {values.phone}</p>
    </div>
  );
};

export default ConfirmationPage;
