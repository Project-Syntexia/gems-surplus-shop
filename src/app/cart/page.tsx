"use client";

import { api } from "@/trpc/react";
import React, { Suspense } from "react";
import Main from "../_components/main";
import ProductDetails, {
  productDetailsContainerClasses,
} from "../_components/product";
import type { ProductType } from "../product/page";
import { EMPTY_STRING, INVALID_NUM } from "../utils/const";

const Page = () => {
  const cartList = api.cart.fetchCartList.useSuspenseQuery();
  const placeholderProduct = {
    id: EMPTY_STRING,
    description: EMPTY_STRING,
    createdDate: new Date(),
    imageSrc: EMPTY_STRING,
    modifiedDate: new Date(),
    price: {
      currency: "php",
      value: INVALID_NUM,
    },
    name: EMPTY_STRING,
    quality: "USED",
    quantity: INVALID_NUM,
  };
  const placeHolderProducts: ProductType[] = new Array(10).fill(
    placeholderProduct,
  );

  if (cartList[1].isError) {
    return (
      <Main>
        <div>
          <p>Error</p>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <div className="h-full overflow-auto">
        <Suspense
          fallback={placeHolderProducts.map((data, index) => {
            return <ProductDetails key={+new Date() + index} {...data} />;
          })}
        >
          {cartList[1].data.map((data) => {
            const { id, productId, quantity } = data;
            const getProductById =
              api.product.fetchProductById.useSuspenseQuery({
                id: productId,
              });
            const productResult = getProductById[1].data;
            return (
              <section key={id} className={productDetailsContainerClasses}>
                <ProductDetails
                  {...({ ...productResult, quantity } as ProductType)}
                  isDisabled
                />
              </section>
            );
          })}
        </Suspense>
      </div>
    </Main>
  );
};

export default Page;
