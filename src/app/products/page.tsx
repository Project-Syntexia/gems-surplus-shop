"use client";

import { createBrowserInspector } from "@statelyai/inspect";
import { useMachine } from "@xstate/react";
import { useState, type ChangeEvent } from "react";

// import CreateProduct from "@/app/_components/create-product";
import Main from "@/app/_components/main";
import Paragraph from "@/app/_components/paragraph";
import Parent from "@/app/_components/parent";
import Select from "@/app/_components/select";
import SuspenseProduct from "@/app/_components/suspenseProduct";
import { api } from "@/trpc/react";
import productCategory from "@/app/machines/productCategory";
import {
  categoryNoFilter,
  type CategoryWithNoFilterType,
} from "@/types/product.schema";

const { inspect } = createBrowserInspector({
  // Comment out the line below to start the inspector
  autoStart: false,
});

// TODO: Move the creation of products in Admin side.
const Page = () => {
  const [category, setCategory] =
    useState<CategoryWithNoFilterType>(categoryNoFilter);
  const [initalSettingsData] = api.general.initialSettings.useSuspenseQuery();
  const [initialProducts, initialProductsQuery] =
    api.product.fetchProducts.useSuspenseQuery(10);
  const [filteredProducts, filteredProductsQuery] =
    api.product.fetchProductsByCategory.useSuspenseQuery({
      category: category === categoryNoFilter ? "ELECTRONICS" : category,
      limit: 10,
    });
  const [machineState, send] = useMachine(productCategory, {
    inspect,
  });

  send({ type: "categoryChange", initialProducts });

  if (initialProductsQuery.isError)
    return alert("initialProductsQuery failed to fetch initial products.");
  if (filteredProductsQuery.isError)
    return alert("filteredProductsQuery failed to fetch initial products.");

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    const select: HTMLSelectElement = e.currentTarget;
    const category = select.value as CategoryWithNoFilterType;

    if (category === categoryNoFilter) {
      return;
    }
    setCategory(category);
    console.log("isFetching:", machineState.matches("fetching"));
    send({
      category,
      filteredProducts,
      type: "dispatching",
    });
  }

  console.log(machineState.context);

  return (
    <Main isOverlapping>
      {/* <CreateProduct /> */}
      <section className="border-y border-primary p-2">
        <Paragraph text="Filters" style="bold" />
        <div className="flex items-center justify-around gap-2">
          <Parent className="bg-paper p-2">
            <Paragraph text="Categories:" />
            <Select
              value={category}
              onChange={handleCategoryChange}
              options={[
                ...initalSettingsData.itemCategories,
                categoryNoFilter,
              ].map((category) => ({
                label: category.replace(/_/g, " ").toLocaleLowerCase(),
                value: category,
              }))}
            />
          </Parent>
        </div>
      </section>
      <SuspenseProduct productList={machineState.context.activeProducts} />
    </Main>
  );
};

export default Page;
