import React from "react";

// Custom type for field API
type FieldApi = {
  name: string;
  state: {
    value: string;
    meta: {
      isTouched: boolean;
      isValid: boolean;
      isValidating: boolean;
      errors: string[];
    };
  };
  handleBlur: () => void;
  handleChange: (value: string) => void;
};

type FieldInfoProps = {
  field: FieldApi;
};

function FieldInfo({ field }: FieldInfoProps) {
  //   console.log(field);
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-destructive text-sm">
          {field.state.meta.errors.join(", ")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default FieldInfo;
