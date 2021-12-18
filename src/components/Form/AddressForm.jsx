import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react/cjs/react.development";
import { commerce } from "../../library/commerce";
import FormInput from "./FormInput";

const AddressForm = ({ nextStep, backStep, checkoutToken }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const methods = useForm();

  // Shipping Countries
  const countries = Object.entries(shippingCountries).map(
    ([countryCode, countryName]) => ({
      id: countryCode,
      label: countryName,
    })
  );

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  // Shipping Subdivisions
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([countryCode, countryName]) => ({
      id: countryCode,
      label: countryName,
    })
  );

  const fetchShippingSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  // Shipping Options
  const options = shippingOptions.map((shipOp) => {
    return {
      id: shipOp.id,
      label: `${shipOp.description} - (${shipOp.price.formatted_with_symbol})`,
    };
  });

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    // console.log(options);
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken.id]);

  useEffect(() => {
    if (shippingCountry) fetchShippingSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) {
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
    }
  }, [checkoutToken.id, shippingCountry, shippingSubdivision]);

  console.log(countries);

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
            <select
              value={shippingCountry}
              onChange={(event) => setShippingCountry(event.target.value)}
            >
              {countries.map((country) => {
                return (
                  <option value={country.id} key={country.id}>
                    {country.label}
                  </option>
                );
              })}
            </select>
            <select
              value={shippingSubdivision}
              onChange={(event) => setShippingSubdivision(event.target.value)}
            >
              {subdivisions.map((subdiv) => {
                return (
                  <option value={subdiv.id} key={subdiv.id}>
                    {subdiv.label}
                  </option>
                );
              })}
            </select>
            <select
              value={shippingOption}
              onChange={(event) => setShippingOption(event.target.value)}
            >
              {options.map((option) => {
                return (
                  <option value={option.id} key={option.id}>
                    {option.label}
                  </option>
                );
              })}
            </select>
            <button onClick={nextStep}>Proceed</button>
            <button onClick={backStep}>Go back</button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
