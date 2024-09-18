import { useSelector } from "@xstate/react";
import React from "react";

import type { InputGlobalAccessibilityComponentType } from "@/app/_components/inputGlobalAccessibility";
import { useGlobalStateContext } from "@/app/_components/state-provider";
import { type ColorType, getColor } from "@/styles/colors";
import type { CommonStyleType } from "@/styles/common";
import { EMPTY_STRING } from "@/utils/const";
import { getDisableValue } from "@/utils/inputGlobalAccessibility";

type ParagraphType = {
  activeColor?: ColorType;
  color?: ColorType;
  hoverColor?: ColorType;
  style?: "italic" | "bold" | "underline";
  text: string;
} & CommonStyleType &
  InputGlobalAccessibilityComponentType;

const Paragraph = (props: Omit<ParagraphType, "className">) => {
  const { activeColor, color, hoverColor, style, text, disabledTrigger } =
    props;
  const { inputGlobalAccessibilityService } = useGlobalStateContext();
  const inputState = useSelector(
    inputGlobalAccessibilityService,
    (snapshot) => snapshot.context.state,
  );
  const calculatedActiveColor = getColor({
    color: activeColor,
    type: "text",
    state: "active",
  });
  const calculatedHoverColor = getColor({
    color: hoverColor,
    type: "text",
    state: "hover",
  });
  const calculatedTextColor = getColor({ color, type: "text" });

  function getFontStyle() {
    switch (style) {
      case "bold":
        return "font-bold";
      case "italic":
        return style;
      case "underline":
        return style;
      default:
        return EMPTY_STRING;
    }
  }

  function finalStyle() {
    const finalBaseStyle = `text-center capitalize ${getFontStyle()}`;
    return getDisableValue(disabledTrigger, inputState)
      ? `${finalBaseStyle} text-slate-500`
      : `${finalBaseStyle} ${calculatedActiveColor} ${calculatedHoverColor} ${calculatedTextColor}`;
  }

  return <p className={finalStyle()}>{text}</p>;
};

export default Paragraph;
