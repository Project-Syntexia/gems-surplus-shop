import { assign, setup } from "xstate";

export type ContextType = {
  state: "signing-out" | "default" | "logging-in" | "initial";
};

type EventType =
  | {
      type: "input.signOut";
    }
  | {
      type: "input.userIn";
    }
  | { type: "input.noUser" }
  | { type: "input.signIn" };

const inputGlobalAccessibility = setup({
  types: {
    context: {} as ContextType,
    events: {} as EventType,
  },
}).createMachine({
  id: "input",
  initial: "initializing",
  context: {
    state: "initial",
  },
  states: {
    initializing: {
      on: {
        "input.userIn": {
          actions: assign({
            state: "default",
          }),
          target: "idle",
        },
        "input.noUser": {
          actions: assign({
            state: "logging-in",
          }),
          target: "login",
        },
      },
    },
    login: {
      on: {
        "input.signIn": {
          actions: assign({
            state: "default",
          }),
          target: "idle",
        },
      },
    },
    idle: {
      on: {
        "input.signOut": {
          actions: assign({
            state: "signing-out",
          }),
          target: "login",
        },
      },
    },
  },
});

export default inputGlobalAccessibility;
