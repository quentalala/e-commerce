import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <div
      style={{
        margin: "0.5rem",
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
                width: "auto",
                padding: 0,
                margin: 0,
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
