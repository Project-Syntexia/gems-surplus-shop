"use client";

import { useState, type ChangeEvent } from "react";

// import CreateProduct from "@/app/_components/create-product";
import Main from "@/app/_components/main";
import Paragraph from "@/app/_components/paragraph";
import Parent from "@/app/_components/parent";
import Select from "@/app/_components/select";
import SuspenseProduct from "@/app/_components/product-list";
import { useGlobalStateContext } from "@/app/_components/state-provider";
import { api } from "@/trpc/react";
import {
  categoryNoFilter,
  type CategoryWithNoFilterType,
} from "@/types/product.schema";
import { useSelector } from "@xstate/react";

const Page = () => {
  // CUSTOM HOOKS

  // STATE MANAGER
  const { productService } = useGlobalStateContext();
  const { initialSettingsData } = useSelector(
    productService,
    (snapshot) => snapshot.context,
  );

  // LOCAL STATES
  const [category, setCategory] =
    useState<CategoryWithNoFilterType>(categoryNoFilter);

  // QUERIES
  const [initialProducts, fetchProductsQuery] =
    api.product.fetchProducts.useSuspenseQuery(10);
  const [filteredProducts, filteredProductsQuery] =
    api.product.fetchProductsByCategory.useSuspenseQuery({
      category: category === categoryNoFilter ? "ELECTRONICS" : category,
      limit: 10,
    });

  if (fetchProductsQuery.isFetched) {
    productService.send({ type: "categoryChange", initialProducts });
  }

  if (fetchProductsQuery.isError)
    return alert("fetchProductsQuery failed to fetch products.");
  if (filteredProductsQuery.isError)
    return alert("filteredProductsQuery failed to fetch initial products.");

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    const select: HTMLSelectElement = e.currentTarget;
    const category = select.value as CategoryWithNoFilterType;

    if (category === categoryNoFilter) {
      return;
    }
    setCategory(category);

    productService.send({
      category,
      filteredProducts,
      type: "dispatching",
    });
  }

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
                ...initialSettingsData.itemCategories,
                categoryNoFilter,
              ].map((category) => ({
                label: category.replace(/_/g, " ").toLocaleLowerCase(),
                value: category,
              }))}
            />
          </Parent>
        </div>
      </section>
      <SuspenseProduct />
    </Main>
  );
};

export default Page;
