import React, { useState } from "react";
import {
  Formik,
  Form,
  FormikErrors,
  FormikValues,
  // FormikTouched,
} from "formik";
import { renderStep } from "./formHelpers";
import StepIndicator from "./StepIndicator";
import styles from "./MultiStepForm.module.scss";
// import * as Yup from "yup";

// const validationSchema = Yup.object().shape({
//   username: Yup.string()
//     .min(3, "Username is to short")
//     .max(50, "Username is to long")
//     .required("Username is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   fullname: Yup.string()
//     .min(3, "Username is to short")
//     .max(50, "Username is to long")
//     .required("Username is required"),
//   address: Yup.string().required("Address is required"),
//   phone: Yup.number()
//     .min(9, "Must be exactly 9 digits")
//     .max(9, "Must be exactly 9 digits")
//     .required("Phone number is required"),
// });

const MultipageForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const handleBackStep = () => {
    if (step <= 1) return;
    setStep((prevStep) => prevStep - 1);
  };
  const handleNextStep = () => {
    if (step > 3) return;
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = () => {
    console.log("custom submit");
  };

  const isDisabled = (
    errors: FormikErrors<FormikValues>,
    // touched: FormikTouched<FormikValues>,
  ) => {
    const hasErrors = Object.values(errors).length > 0;
    return hasErrors;
  };

  return (
    <div className={styles.wrapper}>
      <StepIndicator step={step} />
      <Formik
        initialValues={{
          email: "",
          username: "",
          fullname: "",
          address: "",
          phone: "",
          isUser: false,
        }}
        onSubmit={(values) => {
          if (step < 4) handleNextStep();
          handleSubmit();
        }}
        // validationSchema={validationSchema}
      >
        {({ values, errors, touched }) => (
          <Form>
            {renderStep(step, values, errors, touched)}
            <button type="button" onClick={handleBackStep}>
              back
            </button>
            <button
              type="submit"
              // onClick={handleNextStep}
              disabled={isDisabled(errors)}>
              next
            </button>
            {step === 4 && <button type="submit">submit</button>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultipageForm;
