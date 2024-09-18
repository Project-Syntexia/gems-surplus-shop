import React from "react";

import type { ChildrenType } from "@/app/layout";
import { useGlobalStateContext } from "./state-provider";
import { useSelector } from "@xstate/react";
import { getDisableValue } from "@/utils/inputGlobalAccessibility";
import type { InputGlobalAccessibilityComponentType } from "./inputGlobalAccessibility";

export type ButtonType = {
  bgColor?: string;
  borderColor?: string;
  borderWidth?: string;
  noDisabledStyle?: boolean;
  style?: string;
} & ChildrenType &
  Omit<
    Partial<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >
    >,
    "className" | "style" | "disabled"
  > &
  InputGlobalAccessibilityComponentType;

const baseClasses =
  "group p-1 px-2 shadow-sm duration-300 ease-in-out rounded-lg";
export const baseWithColorClasses = `${baseClasses} bg-transparent hover:bg-primary active:bg-contrast border-primary active:border-white hover:border-white border`;

/**
 * `style` properties should contain other tailwind classes.
 *
 * @param props `bgColor` or `borderColor` or `borderWidth`
 * @returns Custom Button component
 */
const Button = (props: ButtonType) => {
  const {
    bgColor,
    borderColor,
    borderWidth,
    children,
    disabledTrigger,
    noDisabledStyle,
    style,
    ...rest
  } = props;
  const { inputGlobalAccessibilityService } = useGlobalStateContext();
  const buttonState = useSelector(
    inputGlobalAccessibilityService,
    (snapshot) => snapshot.context.state,
  );
  const disabled = getDisableValue(disabledTrigger, buttonState);

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

  function finalButtonStyle() {
    return disabled
      ? `${baseClasses} ${style} ${noDisabledStyle ? "" : "border-slate-500 text-slate-500 border bg-slate-300"}`
      : `${baseClasses} ${style} ${getBackgroundStyle()} ${getBorderStyle()}`;
  }

  return (
    <button className={finalButtonStyle()} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
