import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react/cjs/react.development";
import { commerce } from "../../library/commerce";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";

const AddressForm = ({ nextStep, backStep, checkoutToken, next }) => {
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

  return (
    <>
      <h1>Shipping Address</h1>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            });
          })}
        >
          <div>
            <FormInput name="firstName" label="First name" />
            <FormInput name="lastName" label="Last name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="postalCode" label="Postal Code" />
            {/* <div>
              <h3>Shipping Country</h3> */}
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
            {/* </div> */}
            {/* <div>
              <h3>Shipping Subdivision</h3> */}
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
            {/* </div>
            <div>
              <h3>Shipping Methods</h3> */}
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
            {/* </div> */}
            <button type="submit">Proceed</button>
          </div>
        </form>
      </FormProvider>
      <Link to="/cart">
        <button>Go back to cart</button>
      </Link>
    </>
  );
};

export default AddressForm;
