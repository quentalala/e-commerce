import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <div
      style={{
        width: "auto",
        margin: "1rem 0 1rem",
      }}
    >
      <Controller
        render={({ field }) => {
          return (
            <input
              {...field}
              label={label}
              placeholder={`${label}*`}
              required={required}
              style={{
                width: "100%",
                padding: "1rem",
                margin: 0,
                boxSizing: "border-box",
                border: "none",
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
              }}
            />
          );
        }}
        control={control}
        name={name}
        defaultValue=""
      />
    </div>
  );
};

export default FormInput;
