import React, { useState } from "react";
import { Formik, Form, FormikErrors, FormikValues } from "formik";
import { renderStep } from "../../components/multistepform/formHelpers";
import StepIndicator from "../../components/multistepform/StepIndicator";
import styles from "./MultiStepForm.module.scss";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  CartActionTypes,
  clearCart,
  setShippingValue,
} from "../../redux/actions/cartActions";
import { StripeError } from "@stripe/stripe-js";
import { ItemsListProps } from "../../interfaces/ItemsListProps";
import { StateType } from "../../interfaces/StateType";
import { handleStripe } from "../multistepForm/handleStripe";

interface Props {
  total: number;
  clear: () => { type: CartActionTypes };
  setShipping: (
    shippingValue: string,
  ) => { type: CartActionTypes; payload: { shippingValue: string } };
  items: ItemsListProps[];
}

const MultipageForm: React.FC<Props> = ({
  total,
  clear,
  setShipping,
  items,
}) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<StripeError>();
  const stripe = useStripe();
  const elements = useElements();

  const handleBackStep = () => {
    if (step <= 1) return;
    setStep((prevStep) => prevStep - 1);
  };
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = async (values: FormikValues) => {
    const shippingAsNumber = parseFloat(values.shipping.replace(",", "."));
    const amount = (total + shippingAsNumber) * 100;
    const amountFixed = Number(amount.toFixed(2));

    values.boughtItems = items;

    const bilingDetails = {
      name: values.fullname,
      email: values.email,
      address: values.address,
      phone: values.phone,
    };

    handleStripe(
      setIsProcessing,
      setPaymentError,
      setStep,
      clear,
      bilingDetails,
      amountFixed,
      stripe,
      elements,
    );
  };

  const isDisabled = (errors: FormikErrors<FormikValues>) => {
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
          termsChecked: false,
          shipping: "14,00",
          boughtItems: [],
        }}
        onSubmit={(values) => {
          if (step < 2) {
            handleNextStep();
            setShipping(values.shipping);
          }
        }}>
        {({ values, errors }) => (
          <Form>
            {renderStep(step, values, handleSubmit, values.shipping)}
            {isProcessing && <p>Processing payment...</p>}
            {paymentError && !isProcessing && (
              <div>
                <p>{paymentError.message}</p>
                <p>{paymentError.decline_code}</p>
              </div>
            )}
            {step > 1 && total !== 0 && (
              <button
                className={styles.formBtn_back}
                type="button"
                onClick={handleBackStep}>
                back to Details
              </button>
            )}
            {step < 2 && (
              <button
                className={styles.formBtn}
                type="submit"
                disabled={isDisabled(errors) || isProcessing}>
                proceed to payment
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: StateType) => {
  const { cart } = state;
  return {
    items: cart.cartItems,
    total: cart.total,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    clear: () => dispatch(clearCart()),
    setShipping: (shippingValue: string) =>
      dispatch(setShippingValue(shippingValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipageForm);
