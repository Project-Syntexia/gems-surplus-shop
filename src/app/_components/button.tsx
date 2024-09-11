import React from "react";

import type { ChildrenType } from "@/app/layout";

export type ButtonType = ChildrenType &
  Partial<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >;

const Button = (props: ButtonType) => {
  const { children, ...rest } = props;

  return (
    <button
      className="group rounded-lg border border-primary bg-transparent p-1 px-2 shadow-sm duration-300 ease-in-out hover:border-paper hover:bg-primary active:border-white active:bg-contrast"
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
