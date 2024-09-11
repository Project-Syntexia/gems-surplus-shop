import {
  DEFAULT_BOOLEAN,
  DEFAULT_CUSTOM_BORDER,
  DEFAULT_INDEX,
  EMPTY_STRING,
} from "@/utils/const";

export const emptyProductImage = {
  alternateText: EMPTY_STRING,
  source: EMPTY_STRING,
  customBorder: DEFAULT_CUSTOM_BORDER,
  isHidden: DEFAULT_BOOLEAN,
  orderNumber: DEFAULT_INDEX,
} as const;
