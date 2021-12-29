import React, { useState, useEffect } from "react";
import AddressForm from "../components/Form/AddressForm";
import PaymentForm from "../components/Form/PaymentForm";
import { commerce } from "../library/commerce";
import { Link } from "react-router-dom";

const Checkout = ({ cart, order, handleCaptureCheckout, error }) => {
  const [currStep, setCurrStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState("");
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  // Generate cart token
  useEffect(() => {
    const generateToken = async () => {
      // Can't use async in useEffect() unless it's a seperate function
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

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  let Confirmation = () => {
    return order.customer ? (
      <>
        <div>
          <div>
            Thanks for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}
          </div>
          <div>Order ref: {order.customer_reference}</div>
        </div>
        <br />
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </>
    ) : isFinished ? (
      <>
        <div>
          <div>Thanks for your purchase</div>
        </div>
        <br />
        <Link to="/">
          <button>To Homepage</button>
        </Link>
      </>
    ) : (
      <div>waiting</div>
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

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  const Form = () =>
    currStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        nextStep={nextStep}
        backStep={backStep}
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        handleCaptureCheckout={handleCaptureCheckout}
        timeout={timeout}
      />
    );
  console.log("current step is at", currStep);

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Checkout</h1>
      <div>{currStep === 2 ? <Confirmation /> : checkoutToken && <Form />}</div>
    </div>
  );
};

export default Checkout;
