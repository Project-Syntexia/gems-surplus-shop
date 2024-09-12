import type {
  CategoryWithNoFilterType,
  ProductType,
} from "@/types/product.schema";
import { assign, setup } from "xstate";

type ContextType = {
  activeProducts: ProductType[];
  category: CategoryWithNoFilterType;
  initialProducts: ProductType[];
  previousProducts: ProductType[];
};
type EventType =
  | {
      type: "categoryChange";
      initialProducts: ProductType[];
    }
  | {
      type: "dispatching";
      category: CategoryWithNoFilterType;
      filteredProducts: ProductType[];
    }
  | {
      type: "fetched";
    }
  | {
      type: "close";
    };

const productCategory = setup({
  types: {
    context: {} as ContextType,
    events: {} as EventType,
  },
  /** Validations */
  guards: {
    isProductsSameLength: ({ context }) =>
      context.previousProducts.values.length ===
      context.activeProducts.values.length,
  },
}).createMachine({
  id: "product",
  initial: "idle",
  context: {
    activeProducts: [],
    category: "ELECTRONICS",
    initialProducts: [],
    previousProducts: [],
  },
  states: {
    idle: {
      on: {
        categoryChange: {
          actions: assign({
            activeProducts: ({ event }) => event.initialProducts,
            initialProducts: ({ event }) => event.initialProducts,
          }),
          target: "fetching",
        },
      },
    },
    fetching: {
      on: {
        dispatching: {
          actions: assign({
            category: ({ event }) => event.category,
            previousProducts: ({ context }) => context.activeProducts,
            activeProducts: ({ event }) => event.filteredProducts,
          }),
          target: "idle",
        },
      },
    },
  },
});

export default productCategory;
