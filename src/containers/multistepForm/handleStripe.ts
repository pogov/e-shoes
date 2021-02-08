import { Stripe, StripeElements, StripeError } from "@stripe/stripe-js";
import { CartActionTypes } from "../../redux/actions/cartActions";

const getClientSecretKey = async (amount: number) => {
  const data = await fetch(
    "https://e-shoes-backend.herokuapp.com/payment-intent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    },
  );

  const { client_secret } = await data.json();
  return client_secret;
};

export const handleStripe = async (
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>,
  setPaymentError: React.Dispatch<
    React.SetStateAction<StripeError | undefined>
  >,
  setStep: React.Dispatch<React.SetStateAction<number>>,
  clear: () => { type: CartActionTypes },
  bilingDetails: object,
  amount: number,
  stripe: Stripe | null,
  elements: StripeElements | null,
) => {
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
    setIsProcessing(false);
    setPaymentError(result.error);
  }

  if (!result.paymentIntent) return;
  setIsProcessing(false);
  setStep(3);
  clear();
};
