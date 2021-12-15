import React from "react";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        render={({ field }) => (
          <input label={label} required={required} placeholder={`${label}*`} />
        )}
        control={control}
        name={name}
        // label={label}
        // required={required}
      />
    </div>
  );
};

export default FormInput;
