import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./LoginPage.module.scss";
import ErrorText from "./ErrorText";
import {
  validateFullname,
  validateAddress,
  validatePhoneNumber,
  validateEmail,
  validateUser,
} from "./formHelpers";

interface Props {
  shipping: string;
}

const UserDetailsPage: React.FC<Props> = ({ shipping }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <h4>User details</h4>
        <div className={styles.formField}>
          <Field
            autoComplete="off"
            type="text"
            name="fullname"
            label="fullname"
            validate={validateFullname}
            placeholder="fullname"
          />
          <div className={styles.errorWrapper}>
            <ErrorMessage name="fullname" component={ErrorText} />
          </div>
        </div>
        <div className={styles.formField}>
          <Field
            autoComplete="off"
            type="text"
            name="address"
            label="address"
            validate={validateAddress}
            placeholder="address"
          />
          <div className={styles.errorWrapper}>
            <ErrorMessage name="address" component={ErrorText} />
          </div>
        </div>
        <div className={styles.formField}>
          <Field
            autoComplete="off"
            type="text"
            name="phone"
            label="phone"
            validate={validatePhoneNumber}
            placeholder="phone number"
          />
          <div className={styles.errorWrapper}>
            <ErrorMessage name="phone" component={ErrorText} />
          </div>
        </div>
        <div className={styles.formField}>
          <Field
            autoComplete="off"
            type="text"
            name="username"
            label="username"
            validate={validateUser}
            placeholder="username"
          />
          <div className={styles.errorWrapper}>
            <ErrorMessage name="username" component={ErrorText} />
          </div>
        </div>
        <div className={styles.formField}>
          <Field
            autoComplete="off"
            type="email"
            name="email"
            label="email"
            validate={validateEmail}
            placeholder="e-mail"
          />
          <div className={styles.errorWrapper}>
            <ErrorMessage name="email" component={ErrorText} />
          </div>
        </div>
        <div className={styles.formField_row}>
          <div className={styles.checkbox_container}>
            <Field type="checkbox" name="isUser" label="isUser" id="isUser" />
            <span className={styles.custom}></span>
          </div>
          <label htmlFor="isUser">Are you already our customer</label>
        </div>
      </div>
      <div className={styles.inner_wrapper}>
        <h4>Shipping details</h4>
        <div className={styles.formField_row}>
          <div className={styles.checkbox_container}>
            <Field
              type="radio"
              name="shipping"
              label="shipping-one"
              id="shipping-one"
              value="14,00"
            />
            <span className={styles.custom}></span>
          </div>
          <label htmlFor="shipping-one">Shipping option 1: 14,00</label>
        </div>
        <div className={styles.formField_row}>
          <div className={styles.checkbox_container}>
            <Field
              type="radio"
              name="shipping"
              label="shipping-two"
              id="shipping-two"
              value="8,99"
            />
            <span className={styles.custom}></span>
          </div>
          <label htmlFor="shipping-two">Shipping option 2: 8,99</label>
        </div>
        <h3>Shiping cost: {shipping}</h3>
      </div>
    </div>
  );
};

export default UserDetailsPage;
