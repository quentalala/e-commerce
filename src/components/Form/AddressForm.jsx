import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";

const AddressForm = ({ nextStep, backStep, next, checkoutToken }) => {
  const methods = useForm();

  return (
    <>
      <h1>Shipping Address</h1>
      <FormProvider {...methods}>
        <form>
          <div>
            <FormInput required name="firstName" label="First name" />
            <FormInput required name="lastName" label="Last name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="email" label="Email" />
            <FormInput required name="city" label="City" />
            <FormInput required name="postalCode" label="Postal Code" />
            <select name="" id=""></select>
            <select name="" id=""></select>
            <select name="" id=""></select>
            <button onClick={nextStep}>Proceed</button>
            <button onClick={backStep}>Go back</button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
