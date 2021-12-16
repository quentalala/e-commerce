import React from "react";

const PaymentForm = ({ nextStep, backStep }) => {
  return (
    <>
      <div>PaymentForm</div>
      <button onClick={nextStep}>Proceed</button>
      <button onClick={backStep}>Go back</button>
    </>
  );
};

export default PaymentForm;
