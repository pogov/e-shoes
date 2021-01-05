import React from "react";
import { Field, ErrorMessage, FormikErrors, FormikValues } from "formik";
import styles from "./LoginPage.module.scss";
import ErrorText from "./ErrorText";
import { validateUser, validateEmail } from "./formHelpers";

interface Props {
  errors: FormikErrors<FormikValues>;
}

const LoginPage: React.FC<Props> = ({ errors }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner_wrapper}>
        <div className={styles.formField}>
          <label htmlFor="username">username</label>
          <Field
            autoComplete="off"
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
            autoComplete="off"
            type="email"
            name="email"
            label="email"
            validate={validateEmail}
          />
          <ErrorMessage name="email" component={ErrorText} />
        </div>
        <div className={styles.formField_row}>
          <div className={styles.checkbox_container}>
            <Field type="checkbox" name="isUser" label="isUser" />
            <span className={styles.custom}></span>
          </div>
          <label htmlFor="isUser">Are you already our customer</label>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
