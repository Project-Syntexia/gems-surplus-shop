"use client";

import { createBrowserInspector } from "@statelyai/inspect";
import { useActorRef } from "@xstate/react";
import { createContext, useContext } from "react";
import type { ActorRefFrom } from "xstate";

import type { ChildrenType } from "@/app/layout";
import { inputGlobalAccessibility, productCategory } from "@/xstate/machines";

type GlobalStateContextType = {
  productService: ActorRefFrom<typeof productCategory>;
  inputGlobalAccessibilityService: ActorRefFrom<
    typeof inputGlobalAccessibility
  >;
};

const GlobalStateContext = createContext({} as GlobalStateContextType);

// TODO: Remove in production
const { inspect } = createBrowserInspector({
  autoStart: false,
});

const GlobalStateProvider = ({ children }: ChildrenType) => {
  const inputGlobalAccessibilityService = useActorRef(
    inputGlobalAccessibility,
    {
      inspect,
    },
  );
  const productService = useActorRef(productCategory, {
    inspect,
  });

  return (
    <GlobalStateContext.Provider
      value={{ inputGlobalAccessibilityService, productService }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalStateContext = () => useContext(GlobalStateContext);
export default GlobalStateProvider;
