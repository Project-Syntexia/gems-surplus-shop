import type { ContextType as InputGlobalContextType } from "@/xstate/machines/inputGlobalAccessibility";

export type StateType = InputGlobalContextType["state"];

export type InputGlobalAccessibilityComponentType = {
  disabledTrigger?: StateType | Array<StateType>;
};
