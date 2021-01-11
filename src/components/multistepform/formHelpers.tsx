import UserDetailsPage from "./UserDetailsPage";
import Payment from "../../containers/multistepForm/Payment";
import ConfirmationPage from "./ConfirmationPage";
import { FormikValues } from "formik";

export const renderStep = (
  step: number,
  values: FormikValues,
  handleSubmit: (values: FormikValues) => Promise<void>,
  shipping: string,
) => {
  switch (step) {
    case 1:
      return <UserDetailsPage shipping={shipping} />;
    case 2:
      return <Payment submit={handleSubmit} values={values} />;
    case 3:
      return <ConfirmationPage values={values} />;
    default:
      return null;
  }
};

export const validateUser = (value: string) => {
  let error = "";
  if (value.length === 0) {
    error = "Username is required";
  } else {
    if (value.length < 3) error = "Username is to short";
  }
  return error;
};

export const validateEmail = (value: string) => {
  let error = "";
  if (value.length === 0) {
    error = "Email is required";
  } else {
    if (!value.match(/\S+@\S+\.\S+/gi)) error = "Email is invalid";
  }
  return error;
};

export const validateFullname = (value: string) => {
  let error = "";
  if (value.length === 0) {
    error = "Fullname is required";
  } else {
    if (value.length < 3)
      error = "Fullname needs to be at least 3 characters long";
  }
  return error;
};

export const validateAddress = (value: string) => {
  let error = "";
  if (value.length === 0) {
    error = "Address is required";
  } else {
    if (!value.match(/\w\d/gi)) error = "Address is invalid";
  }
  return error;
};

export const validatePhoneNumber = (value: number) => {
  let error = "";
  if (
    !value
      .toString()
      .match(
        /^\+\d{2}\s\d{3}\s\d{3}\s\d{3}|^\+\d{2}\d{9}|\d{9}|\d{3}\s\d{3}\s\d{3}/,
      )
  ) {
    error = "Invalid phone number";
  }
  return error;
};

export const termsChecked = (value: boolean) => {
  let error = "";
  if (!value) {
    error = "This field is required";
  }
  return error;
};
