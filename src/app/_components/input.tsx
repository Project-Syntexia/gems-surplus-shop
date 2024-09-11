import React from "react";

import type { LabeledType } from ".";
import Parent from "@/app/_components/parent";
import { fieldContainerClasses } from "@/app/_components/product";

export type InputType = LabeledType &
  Omit<
    Partial<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >
    >,
    "className"
  >;

const Input = (props: InputType) => {
  const { label, ...rest } = props;
  return (
    <Parent className={fieldContainerClasses}>
      {typeof label === "string" && <label htmlFor={rest.id}>{label}</label>}
      <input
        className="rounded-lg border border-primary bg-transparent p-2 capitalize shadow-sm"
        readOnly={rest.disabled}
        {...rest}
      />
    </Parent>
  );
};

export default Input;
