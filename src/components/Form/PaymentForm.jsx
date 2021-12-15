import React from "react";

const PaymentForm = ({ nextStep }) => {
  return (
    <>
      <div>PaymentForm</div>
      <button onClick={nextStep}>Proceed</button>
    </>
  );
};

export default PaymentForm;
