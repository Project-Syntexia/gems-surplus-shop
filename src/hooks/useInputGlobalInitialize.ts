"use client";

import { useAuth } from "@clerk/nextjs";
import { useGlobalStateContext } from "@/app/_components/state-provider";

const useInputGlobalInitialize = () => {
  const { inputGlobalAccessibilityService } = useGlobalStateContext();
  const { userId } = useAuth();

  if (typeof userId === "string") {
    return inputGlobalAccessibilityService.send({ type: "input.userIn" });
  }
  return inputGlobalAccessibilityService.send({ type: "input.noUser" });
};

export default useInputGlobalInitialize;
