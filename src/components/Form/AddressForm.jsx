import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react/cjs/react.development";
import { commerce } from "../../library/commerce";
import FormInput from "./FormInput";

const AddressForm = ({ nextStep, backStep, checkoutToken }) => {
  const [shipCountries, setShipCountries] = useState([]);
  const [shipCountry, setShipCountry] = useState("");
  const [shipSubdivisions, setShipSubdivisions] = useState([]);
  const [shipSubdiv, setShipSubdiv] = useState("");

  const methods = useForm();

  // Shipping Countries
  const countries = Object.entries(shipCountries).map(
    ([countryCode, countryName]) => ({
      id: countryCode,
      label: countryName,
    })
  );

  const fetchShipCountries = async (checkoutToken) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutToken
    );
    console.log(countries);
    setShipCountries(countries);
    setShipCountry(Object.keys(countries)[0]);
  };

  useEffect(() => {
    console.log(checkoutToken.id);
    fetchShipCountries(checkoutToken.id);
  }, [checkoutToken.id]);

  // Shipping Subdivisions
  const subdivisions = Object.entries(shipSubdivisions).map(
    ([countryCode, countryName]) => ({
      id: countryCode,
      label: countryName,
    })
  );

  const fetchShipSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShipSubdivisions(subdivisions);
    setShipSubdiv(Object.keys(subdivisions)[0]);
  };

  useEffect(() => {
    if (shipCountry) fetchShipSubdivisions(shipCountry);
  }, [shipCountry]);

  console.log(shipCountry, shipSubdiv);

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
              value={shipCountry}
              onChange={(event) => setShipCountry(event.target.value)}
            >
              {countries.map((country) => {
                return (
                  <option value={country.label} key={country.id}>
                    {country.label}
                  </option>
                );
              })}
            </select>
            <select
              value={shipSubdiv}
              onChange={(event) => setShipSubdiv(event.target.value)}
            >
              {subdivisions.map((subdiv) => {
                return (
                  <option value={subdiv.label} key={subdiv.id}>
                    {subdiv.label}
                  </option>
                );
              })}
            </select>
            <select></select>
            <button onClick={nextStep}>Proceed</button>
            <button onClick={backStep}>Go back</button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
