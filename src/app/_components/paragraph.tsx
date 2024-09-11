import React from "react";

import { type ColorType, getColor } from "@/styles/colors";
import { EMPTY_STRING } from "@/utils/const";

type ParagraphType = {
  activeColor?: ColorType;
  color?: ColorType;
  hoverColor?: ColorType;
  style?: "italic" | "bold" | "underline";
  text: string;
};

const Paragraph = (props: Omit<ParagraphType, "className">) => {
  const { activeColor, color, hoverColor, style, text } = props;
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

  function getStyle() {
    switch (style) {
      case "bold":
        return "text-bold";
      case "italic":
        return style;
      case "underline":
        return style;
      default:
        return EMPTY_STRING;
    }
  }

  return (
    <p
      className={`text-bold capitalize ${calculatedActiveColor} ${calculatedHoverColor} ${calculatedTextColor} ${getStyle()}`}
    >
      {text}
    </p>
  );
};

export default Paragraph;
