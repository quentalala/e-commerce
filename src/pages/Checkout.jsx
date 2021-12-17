import React, { useState, useEffect } from "react";
import AddressForm from "../components/Form/AddressForm";
import PaymentForm from "../components/Form/PaymentForm";
import { commerce } from "../library/commerce";

const Checkout = ({ cart }) => {
  const [currStep, setCurrStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState("");

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateTokenFrom(
          "cart",
          commerce.cart.id()
        );
        console.log(token);
        setCheckoutToken(token);
      } catch (err) {}
    };

    generateToken();
  }, [cart]);

  const Confirmation = () => {
    return (
      <>
        <div>Comfirmation</div>
        <button onClick={nextStep}>You can't go any further!</button>
        <button onClick={backStep}>Go back</button>
      </>
    );
  };

  const nextStep = () => {
    if (currStep < 2) {
      setCurrStep((prevStep) => prevStep + 1);
    }
  };
  const backStep = () => {
    if (currStep > 0) {
      setCurrStep((prevStep) => prevStep - 1);
    }
  };

  const Form = () =>
    currStep === 0 ? (
      <AddressForm nextStep={nextStep} checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm
        nextStep={nextStep}
        backStep={backStep}
        checkoutToken={checkoutToken}
      />
    );

  //   console.log(currStep);

  return (
    <div>
      <h1>Checkout</h1>
      <div>{currStep === 2 ? <Confirmation /> : checkoutToken && <Form />}</div>
    </div>
  );
};

export default Checkout;
