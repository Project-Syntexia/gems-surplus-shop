"use client";

import React, { Suspense } from "react";

import Main from "@/app/_components/main";
import ProductDetails, {
  productDetailsContainerClasses,
  type ProductType,
} from "@/app/_components/product";
import { EMPTY_STRING, INVALID_NUM } from "@/app/utils/const";
import { api } from "@/trpc/react";

const Page = () => {
  try {
    const cartList = api.cart.fetchCartList.useSuspenseQuery();
    const placeHolderProducts = new Array<ProductType>(10).fill({
      category: "ELECTRONICS",
      createdDate: new Date(),
      description: EMPTY_STRING,
      id: EMPTY_STRING,
      imageSrc: EMPTY_STRING,
      modifiedDate: new Date(),
      name: EMPTY_STRING,
      price: {
        currency: "PHP",
        value: INVALID_NUM,
      },
      quality: "USED",
      quantity: INVALID_NUM,
    });

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
  } catch (e) {
    const errorList = Object.values(e as Object);
    const errorMessage = errorList[1]?.["message"] ?? "Error message here";
    console.log(errorMessage);
    return (
      <Main>
        <div>
          <p>{errorMessage}</p>
        </div>
      </Main>
    );
  }
};

export default Page;
