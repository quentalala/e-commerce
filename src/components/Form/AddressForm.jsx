import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";

const AddressForm = ({ nextStep }) => {
  const methods = useForm();

  return (
    <>
      <h1>Shipping Address</h1>
      <FormProvider {...methods}>
        <form>
          <FormInput required name="firstName" label="First name" />
          <FormInput required name="lastName" label="Last name" />
          <FormInput required name="address1" label="Address" />
          <FormInput required name="email" label="Email" />
          <FormInput required name="city" label="City" />
          <FormInput required name="postalCode" label="Postal Code" />
        </form>
      </FormProvider>
      <button onClick={nextStep}>Proceed</button>
    </>
  );
};

export default AddressForm;
