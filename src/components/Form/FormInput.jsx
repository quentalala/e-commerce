import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        render={({ field }) => {
          return (
            <input
              {...field}
              label={label}
              placeholder={`${label}*`}
              required={required}
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
