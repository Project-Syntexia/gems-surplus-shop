import React from "react";

import type { LabeledType } from ".";
import Parent from "@/app/_components/parent";
import { fieldContainerClasses } from "@/app/_components/product";
import type { CommonStyleType } from "@/styles/common";

type OptionType<T> = {
  label: string;
  value: T;
};

export type SelectType<T> = {
  options: OptionType<T>[];
} & CommonStyleType &
  LabeledType &
  Omit<
    Partial<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLSelectElement>,
        HTMLSelectElement
      >
    >,
    "className"
  >;

const Select = <T,>(props: Omit<SelectType<T>, "className">) => {
  const { groupStyle, label, options, ...rest } = props;
  let productCategorySelectClasses =
    "ative:bg-contrast w-fit rounded-lg border border-primary bg-transparent p-2 capitalize text-primary duration-300 ease-in-out hover:bg-primary hover:text-paper active:text-paper";

  if (rest.disabled) {
    productCategorySelectClasses = `${productCategorySelectClasses} appearance-none`;
  }

  return (
    <Parent className={fieldContainerClasses}>
      {typeof label === "string" && <label htmlFor={rest.id}>{label}</label>}
      <select
        className={`${productCategorySelectClasses} ${groupStyle}`}
        {...rest}
      >
        {options.map(({ value, label }, index) => {
          let key: string | undefined;

          try {
            switch (typeof value) {
              case "string":
              case "number":
                key = `${value}`;
              default:
                throw new Error(
                  "value not seriazable, defaulting to milliseconds + index",
                );
            }
          } catch (error) {
            key = `${new Date().getMilliseconds() + index}`;
          }

          return (
            <option
              className=""
              key={key}
              value={typeof value === "string" ? value : JSON.stringify(value)}
            >
              {label}
            </option>
          );
        })}
      </select>
    </Parent>
  );
};

export default Select;
