import React from "react";
import FieldInfo from "./FieldInfo";
import { Input } from "../ui/input";
import { FormSelectField } from "./FormSelectField";

type FieldValidator = {
  onChange?: (params: { value: string }) => string | undefined;
  onChangeAsync?: (params: { value: string }) => Promise<string | undefined>;
  onChangeAsyncDebounceMs?: number;
};

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "select";
  placeholder?: string;
  options?: string[];
  validators: FieldValidator;
};

type FormFieldProps = {
  fieldConfig: FieldConfig;
  form: any;
};

const FormField = ({ fieldConfig, form }: FormFieldProps) => {
  const {
    name,
    label,
    type = "text",
    placeholder,
    options,
    validators,
  } = fieldConfig;

  return (
    <form.Field
      name={name}
      validators={validators}
      children={(field: any) => (
        <div className="grid gap-2">
          <label htmlFor={field.name}>{label}:</label>

          {type === "select" && options ? (
            <FormSelectField
              value={field.state.value}
              onValueChange={field.handleChange}
              onBlur={field.handleBlur}
              placeholder={placeholder}
              options={options}
              id={field.name}
              name={field.name}
            />
          ) : (
            <Input
              id={field.name}
              name={field.name}
              type={type}
              placeholder={placeholder}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}

          <FieldInfo field={field} />
        </div>
      )}
    />
  );
};

export default FormField;