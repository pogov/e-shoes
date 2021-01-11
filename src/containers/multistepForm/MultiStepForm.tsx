import React, { useState } from "react";
import { Formik, Form, FormikErrors, FormikValues } from "formik";
import { renderStep } from "../../components/multistepform/formHelpers";
import StepIndicator from "../../components/multistepform/StepIndicator";
import styles from "./MultiStepForm.module.scss";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { clearCart, setShippingValue } from "../../redux/actions/cartActions";
import { PaymentIntent } from "@stripe/stripe-js";

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
}

const MultipageForm: React.FC<Props> = ({ total, clear, setShipping }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<PaymentIntent.Status>("processing");
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
    const totalFixed =
      Number(total.toFixed(2)) + parseFloat(values.shipping.replace(",", "."));
    const amount = totalFixed * 100;

    const bilingDetails = {
      name: values.fullname,
      email: values.email,
      address: values.address,
      phone: values.phone,
    };

    setIsProcessing(true);
    const cardElement = elements && elements.getElement("card");
    const secret = await getClientSecretKey(amount);

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
    }

    if (!result.paymentIntent) return;
    setStatus(result.paymentIntent.status);
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
          shipping: "14,00",
        }}
        onSubmit={(values) => {
          if (step < 2) {
            handleNextStep();
            setShipping(values.shipping);
          }
        }}>
        {({ values, errors }) => (
          <Form>
            {renderStep(step, values, status, handleSubmit, values.shipping)}
            {step > 1 && total !== 0 && (
              <button type="button" onClick={handleBackStep}>
                back
              </button>
            )}
            {step < 2 && (
              <button
                type="submit"
                disabled={isDisabled(errors) || isProcessing}>
                next
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
