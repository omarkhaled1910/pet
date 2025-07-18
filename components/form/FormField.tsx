import React from "react";
import FieldInfo from "./FieldInfo";
import { Input } from "../ui/input";

// Custom types for form field configuration
type FieldValidator = {
  onChange?: (params: { value: string }) => string | undefined;
  onChangeAsync?: (params: { value: string }) => Promise<string | undefined>;
  onChangeAsyncDebounceMs?: number;
};

type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  validators: FieldValidator;
};

type FormFieldProps = {
  fieldConfig: FieldConfig;
  form: any; // Using any for the form prop to avoid external type dependencies
};

const FormField = ({ fieldConfig, form }: FormFieldProps) => {
  const { name, label, type = "text", placeholder, validators } = fieldConfig;

  return (
    <>
      <form.Field
        name={name}
        validators={validators}
        children={(field: any) => {
          return (
            <>
              <label htmlFor={field.name}>{label}:</label>
              <Input
                id={field.name}
                name={field.name}
                type={type}
                placeholder={placeholder}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </>
          );
        }}
      />
    </>
  );
};

export default FormField;
