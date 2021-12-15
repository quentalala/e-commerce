import React, { useState } from "react";
import AddressForm from "../components/Form/AddressForm";
import PaymentForm from "../components/Form/PaymentForm";

const Checkout = () => {
  const [currStep, setCurrStep] = useState(0);

  const Confirmation = () => {
    return (
      <>
        <div>Comfirmation</div>
        <button onClick={nextStep}>Restart form</button>
      </>
    );
  };

  const nextStep = () => {
    if (currStep < 2) {
      setCurrStep((prevStep) => prevStep + 1);
    } else {
      setCurrStep(0);
    }

    // Remove the code above this later and uncomment code below
    // Going to be used to loop through currStep for the time being

    // setCurrStep((prevStep) => prevStep + 1)
  };

  const Form = () =>
    currStep === 0 ? (
      <AddressForm nextStep={nextStep} />
    ) : (
      <PaymentForm nextStep={nextStep} />
    );

  console.log(currStep);

  return (
    <div>
      <h1>Checkout</h1>
      <div>{currStep === 2 ? <Confirmation /> : <Form />}</div>
    </div>
  );
};

export default Checkout;
