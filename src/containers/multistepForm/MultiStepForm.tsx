import React, { useState } from "react";
import { Formik, Form, FormikErrors, FormikValues } from "formik";
import { renderStep } from "../../components/multistepform/formHelpers";
import StepIndicator from "../../components/multistepform/StepIndicator";
import styles from "./MultiStepForm.module.scss";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { clearCart, setShippingValue } from "../../redux/actions/cartActions";
import { StripeError } from "@stripe/stripe-js";

const getClientSecretKey = async (amount: number) => {
  const data = await fetch("http://localhost:5500/payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  const { client_secret } = await data.json();
  return client_secret;
};

interface Props {
  total: number;
  clear: any;
  setShipping: any;
  items: any;
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

    setIsProcessing(true);
    const cardElement = elements && elements.getElement("card");
    const secret = await getClientSecretKey(amountFixed);

    if (!stripe || !cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: bilingDetails,
    });

    if (error) {
      console.log(error);
    }

    if (!paymentMethod) return;

    const result = await stripe.confirmCardPayment(secret, {
      payment_method: paymentMethod.id,
    });

    if (result.error) {
      console.log(result.error);
      setIsProcessing(false);
      setPaymentError(result.error);
    }

    if (!result.paymentIntent) return;
    setIsProcessing(false);
    setStep(3);
    clear();
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

const mapStateToProps = (state: any) => {
  const { cart } = state;
  return {
    items: cart.cartItems,
    total: cart.total,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    clear: () => dispatch(clearCart()),
    setShipping: (shippingValue: string) =>
      dispatch(setShippingValue(shippingValue)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipageForm);
