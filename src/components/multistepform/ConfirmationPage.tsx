import React from "react";
import { FormikValues } from "formik";
import styles from "./LoginPage.module.scss";

interface Props {
  values: FormikValues;
}

const ConfirmationPage: React.FC<Props> = ({ values }) => {
  return (
    <div className={styles.wrapper}>
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
