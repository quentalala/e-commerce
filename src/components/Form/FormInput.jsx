import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <div
      style={{
        width: "auto",
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
                padding: 0,
                margin: 0,
                boxSizing: "border-box",
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
