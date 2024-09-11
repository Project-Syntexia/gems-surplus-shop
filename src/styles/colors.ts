// TODO: @bsolute export is causing "Error: Cannot find module '@/utils/const"
import { EMPTY_STRING } from "../utils/const";

export type ColorType = (typeof colorKeyList)[number];
type ColorTypeNameType = (typeof colorTypeList)[number];
type ColorStateType = "active" | "hover";

type GetColorType = {
  color?: ColorType;
  type: ColorTypeNameType;
  state?: ColorStateType;
};

// Colors.
export const black = "#050505";
export const contrast = "#698474";
export const paper = "#FCF8F3";
export const primary = "#CE8B8B";
export const secondary = "#DDB9C5";

/** Collection of color keys. */
export const colorKeyList = [
  "black",
  "contrast",
  "paper",
  "primary",
  "secondary",
] as const;

export const colorTypeList = ["text", "background"] as const;

/**
 * Doesn't support opacity.
 *
 * @param color, and `type` _'text'_ or _'background'_
 * @returns Custom TailwindCSS color - `group-hover:` or `group-active:` or simply the color,
 * if `color` is undefined return empty string.
 */
export function getColor(props: GetColorType) {
  const { color, type, state } = props;
  const isBackground = type === "background";

  if (state === "active") {
    switch (color) {
      case "black":
        return isBackground
          ? ("group-active:bg-black" as const)
          : ("group-active:text-black" as const);
      case "contrast":
        return isBackground
          ? ("group-active:bg-contrast" as const)
          : ("group-active:text-contrast" as const);
      case "paper":
        return isBackground
          ? ("group-active:bg-paper" as const)
          : ("group-active:text-paper" as const);
      case "primary":
        return isBackground
          ? ("group-active:bg-primary" as const)
          : ("group-active:text-primary" as const);
      case "secondary":
        return isBackground
          ? ("group-active:bg-secondary" as const)
          : ("group-active:text-secondary" as const);
      default:
        return EMPTY_STRING;
    }
  } else if (state === "hover") {
    switch (color) {
      case "black":
        return isBackground
          ? ("group-hover:bg-black" as const)
          : ("group-hover:text-black" as const);
      case "contrast":
        return isBackground
          ? ("group-hover:bg-contrast" as const)
          : ("group-hover:text-contrast" as const);
      case "paper":
        return isBackground
          ? ("group-hover:bg-paper" as const)
          : ("group-hover:text-paper" as const);
      case "primary":
        return isBackground
          ? ("group-hover:bg-primary" as const)
          : ("group-hover:text-primary" as const);
      case "secondary":
        return isBackground
          ? ("group-hover:bg-secondary" as const)
          : ("group-hover:text-secondary" as const);
      default:
        return EMPTY_STRING;
    }
  }
  switch (color) {
    case "black":
      return isBackground ? ("bg-black" as const) : ("text-black" as const);
    case "contrast":
      return isBackground
        ? ("bg-contrast" as const)
        : ("text-contrast" as const);
    case "paper":
      return isBackground ? ("bg-paper" as const) : ("text-paper" as const);
    case "primary":
      return isBackground ? ("bg-primary" as const) : ("text-primary" as const);
    case "secondary":
      return isBackground
        ? ("bg-secondary" as const)
        : ("text-secondary" as const);
    default:
      return isBackground ? EMPTY_STRING : ("text-black" as const);
  }
}
