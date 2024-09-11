import React from "react";

import type { ChildrenType } from "@/app/layout";

export type ButtonType = {
  bgColor?: string;
  borderColor?: string;
  borderWidth?: string;
  style?: string;
} & ChildrenType &
  Omit<
    Partial<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >
    >,
    "className" | "style"
  >;

/**
 * `style` properties should contain other tailwind classes.
 *
 * @param props `bgColor` or `borderColor` or `borderWidth`
 * @returns Custom Button component
 */
const Button = (props: ButtonType) => {
  const { bgColor, children, borderColor, borderWidth, style, ...rest } = props;
  const baseClasses =
    "group p-1 px-2 shadow-sm duration-300 ease-in-out rounded-lg";

  function getBackgroundStyle() {
    const colorClasses =
      bgColor ?? "bg-transparent hover:bg-primary active:bg-contrast";
    return `${colorClasses}`;
  }

  function getBorderStyle() {
    const widthClasses = borderWidth ?? "border";
    const colorClasses =
      borderColor ?? "border-primary active:border-white hover:border-white";
    return `${widthClasses} ${colorClasses}`;
  }

  return (
    <button
      className={`${baseClasses} ${style} ${getBackgroundStyle()} ${getBorderStyle()}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
