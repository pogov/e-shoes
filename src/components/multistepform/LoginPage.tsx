import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./UserDetailsPage.module.scss";
import ErrorText from "./ErrorText";
import { validateUser, validateEmail } from "./formHelpers";

const LoginPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.formField}>
          <label htmlFor="username">username</label>
          <Field
            // autoComplete="off"
            type="text"
            name="username"
            label="username"
            validate={validateUser}
          />
          <ErrorMessage name="username" component={ErrorText} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="email">email</label>
          <Field
            // autoComplete="off"
            type="email"
            name="email"
            label="email"
            validate={validateEmail}
          />
          <ErrorMessage name="email" component={ErrorText} />
        </div>
        <div className={styles.formField_row}>
          <div className={styles.checkbox_container}>
            <Field type="checkbox" name="isUser" label="isUser" id="isUser" />
            <span className={styles.custom}></span>
          </div>
          <label htmlFor="isUser">Are you already our customer</label>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
