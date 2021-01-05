import LoginPage from "./LoginPage";
import UserDetailsPage from "./UserDetailsPage";
import Payment from "./Payment";
import ConfirmationPage from "./ConfirmationPage";
import { FormikErrors, FormikTouched, FormikValues } from "formik";
// import * as Yup from "yup";

export const renderStep = (
  step: number,
  values: FormikValues,
  errors: FormikErrors<typeof values>,
  touched: FormikTouched<typeof values>,
) => {
  switch (step) {
    case 1:
      return <LoginPage errors={errors} />;
    case 2:
      return <UserDetailsPage errors={errors} />;
    case 3:
      return <Payment />;
    case 4:
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
    error = "Fullname is required";
  } else {
    if (value.length < 10) error = "Address is invalid";
  }
  return error;
};

export const validatePhoneNumber = (value: number) => {
  let error = "";
  if (!value.toString().match(/\d{9}/gi)) {
    error = "Invalid phone number";
  }
  return error;
};
