import type {
  InputGlobalAccessibilityComponentType,
  StateType,
} from "@/app/_components/inputGlobalAccessibility";

/**
 * First parameter is for the trigger state for disabling input,
 *
 * Second parameter is for the global state in State machine.
 */
export function getDisableValue(
  disabledTrigger: InputGlobalAccessibilityComponentType["disabledTrigger"],
  buttonState: StateType,
) {
  if (disabledTrigger === undefined) return buttonState === "initial";
  if (typeof disabledTrigger === "string") {
    return buttonState === disabledTrigger;
  }
  return disabledTrigger.includes(buttonState);
}
