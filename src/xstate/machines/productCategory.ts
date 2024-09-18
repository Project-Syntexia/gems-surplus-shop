import type {
  CategoryWithNoFilterType,
  InitialSettingsType,
  ProductType,
} from "@/types/product.schema";
import { SHOP_NAME } from "@/utils/const";
import { assign, setup } from "xstate";

type ContextType = {
  activeProducts: ProductType[];
  category: CategoryWithNoFilterType;
  initialProducts: ProductType[];
  previousProducts: ProductType[];
  initialSettingsData: InitialSettingsType;
};
type EventType =
  | {
      type: "categoryChange";
      initialProducts: ProductType[];
    }
  | {
      type: "close";
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
      type: "initializing";
    }
  | {
      type: "start";
      initialSettingsData: InitialSettingsType;
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
  initial: "initializing",
  context: {
    activeProducts: [],
    category: "ELECTRONICS",
    initialProducts: [],
    previousProducts: [],
    initialSettingsData: {
      itemCategories: [],
      shopName: SHOP_NAME,
      totalProducts: 0,
      totalUsers: 0,
      newArrivals: [],
    },
  },
  states: {
    initializing: {
      on: {
        start: {
          actions: assign({
            initialSettingsData: ({ event }) => event.initialSettingsData,
          }),
          target: "idle",
        },
      },
    },
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
