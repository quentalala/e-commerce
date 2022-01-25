import React from "react";
import {
  Elements,
  ElementsConsumer,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./PaymentForm.css";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  nextStep,
  backStep,
  shippingData,
  checkoutToken,
  handleCaptureCheckout,
  timeout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    console.log(shippingData);

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.postalCode,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      handleCaptureCheckout(checkoutToken.id, orderData);
      timeout();
      nextStep();
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form
                onSubmit={(e) => handleSubmit(e, elements, stripe)}
                style={{
                  width: 500,
                  border: "1px solid lightgrey",
                  padding: "1rem",
                }}
              >
                <CardElement />
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <button
                    onClick={backStep}
                    className="back-btn"
                    style={{
                      cursor: "pointer",
                      border: "none",
                      padding: "0.5rem",
                      borderRadius: "5px",
                    }}
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    disabled={!stripe}
                    className="proceed-btn"
                    style={{
                      cursor: "pointer",
                      border: "none",
                      padding: "0.5rem",
                      borderRadius: "5px",
                    }}
                  >
                    PROCEED TO PAY{" "}
                    {checkoutToken.live.subtotal.formatted_with_symbol}
                  </button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </>
  );
};

export default PaymentForm;
