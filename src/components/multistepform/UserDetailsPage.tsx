import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./UserDetailsPage.module.scss";
import ErrorText from "./ErrorText";
import {
  validateFullname,
  validateAddress,
  validatePhoneNumber,
  validateEmail,
  validateUser,
  termsChecked,
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
            placeholder="fullname*"
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
            placeholder="address*"
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
            maxLength="12"
            validate={validatePhoneNumber}
            placeholder="phone number*"
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
            placeholder="username*"
          />
          <div className={styles.errorWrapper}>
            <ErrorMessage name="username" component={ErrorText} />
          </div>
        </div>
        <div className={styles.formField}>
          <Field
            autoComplete="off"
            type="text"
            name="email"
            label="email"
            validate={validateEmail}
            placeholder="e-mail*"
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
        <div className={styles.formField_row}>
          <div className={styles.checkbox_container}>
            <Field
              type="checkbox"
              name="termsChecked"
              label="termsChecked"
              id="termsChecked"
              validate={termsChecked}
            />
            <span className={styles.custom}></span>
          </div>
          <label htmlFor="termsChecked">I accept terms and conditions*</label>
        </div>
        <p>* This field is required</p>
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
          <label htmlFor="shipping-one">Shipping option One: 14,00</label>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste laborum
          sequi veniam consequuntur vitae? Reiciendis deleniti magnam vero illum
          ipsam.
        </p>
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
          <label htmlFor="shipping-two">Shipping option Two: 8,99</label>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste laborum
          sequi veniam consequuntur vitae? Reiciendis deleniti magnam vero illum
          ipsam.
        </p>
        <h3>Shiping cost: {shipping}</h3>
      </div>
    </div>
  );
};

export default UserDetailsPage;
