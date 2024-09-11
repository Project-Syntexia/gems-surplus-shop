import React from "react";

import type { LabeledType } from ".";
import Parent from "@/app/_components/parent";
import { fieldContainerClasses } from "@/app/_components/product";
import type { CommonStyleType } from "@/styles/common";

export type InputType = { isCapital?: boolean } & CommonStyleType &
  LabeledType &
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
  const { groupStyle, label, isCapital, ...rest } = props;
  const inputClasses = `w-36 rounded-lg border border-primary bg-transparent p-2 shadow-sm md:w-fit`;

  return (
    <Parent className={fieldContainerClasses}>
      {typeof label === "string" && <label htmlFor={rest.id}>{label}</label>}
      <input
        className={`${inputClasses} ${groupStyle} ${isCapital ? "capitalize" : ""}`}
        readOnly={rest.disabled}
        {...rest}
      />
    </Parent>
  );
};

export default Input;
