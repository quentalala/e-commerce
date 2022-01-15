import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react/cjs/react.development";
import { commerce } from "../../library/commerce";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";
import "./AddressForm.css";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid lightgray",
                padding: "1rem ",
              }}
            >
              <div style={{ width: "65vw" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    // border: "1px solid red",
                    margin: "2rem 0 4rem",
                  }}
                >
                  <div
                    style={{
                      // border: "1px solid yellow",
                      width: "100%",
                    }}
                  >
                    <h3>Shipping Address</h3>
                    <FormInput name="firstName" label="First name" />
                    <FormInput name="lastName" label="Last name" />
                    <FormInput name="address1" label="Address" />
                    <FormInput name="email" label="Email" />
                    <FormInput name="city" label="City" />
                    <FormInput name="postalCode" label="Postal Code" />
                    {/* Commenting out the div tags below combines the separate divs */}
                    {/* </div>
                  <div> */}
                    <div
                      style={{
                        // border: "1px solid yellow",
                        width: "100%",
                      }}
                    >
                      <h4>Shipping Country</h4>
                      <select
                        value={shippingCountry}
                        onChange={(event) =>
                          setShippingCountry(event.target.value)
                        }
                        style={{
                          width: "100%",
                          border: "none",
                          boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                          padding: "1rem",
                        }}
                      >
                        {countries.map((country) => {
                          return (
                            <option value={country.id} key={country.id}>
                              {country.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <h4>Shipping Subdivision</h4>
                      <select
                        value={shippingSubdivision}
                        onChange={(event) =>
                          setShippingSubdivision(event.target.value)
                        }
                        style={{
                          width: "100%",
                          border: "none",
                          boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                          padding: "1rem",
                        }}
                      >
                        {subdivisions.map((subdiv) => {
                          return (
                            <option value={subdiv.id} key={subdiv.id}>
                              {subdiv.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>
                      <h4>Shipping Methods</h4>
                      <select
                        value={shippingOption}
                        onChange={(event) =>
                          setShippingOption(event.target.value)
                        }
                        style={{
                          width: "100%",
                          border: "none",
                          boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                          padding: "1rem",
                        }}
                      >
                        {options.map((option) => {
                          return (
                            <option value={option.id} key={option.id}>
                              {option.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    margin: "2rem 0 0",
                    // border: "1px solid blue",
                  }}
                  className="address-buttons"
                >
                  <Link to="/cart">
                    <button
                      style={{ cursor: "pointer" }}
                      className="back-to-cart-btn"
                    >
                      BACK TO CART
                    </button>
                  </Link>
                  <button
                    type="submit"
                    style={{ cursor: "pointer" }}
                    className="proceed-btn"
                  >
                    PROCEED
                  </button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};

export default AddressForm;
