"use client";

import React, { type ChangeEvent, Suspense, useRef, useState } from "react";
import type { api as serverApi } from "@/trpc/server";
import Main from "@/app/_components/main";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import {
  ProductDescription,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductQuality,
  ProductQuantity,
} from "../_components/product";
import { EMPTY_STRING, INVALID_NUM } from "../utils/const";

export type ProductType = Awaited<
  ReturnType<typeof serverApi.product.createProduct>
>;

type InitialStateType = {
  product: Partial<ProductType>;
};

const initialState: InitialStateType = {
  product: {},
};

const Page = () => {
  const [state, setState] = useState(initialState);
  const refreshKey = useRef(+new Date());
  const router = useRouter();
  const fetchProduct = api.product.fetchProducts.useSuspenseQuery(10);
  const createProductClientAPI =
    api.product.createProduct.useMutation<ProductType>({
      onSuccess: async (data) => {
        console.log(
          `Product ${data.name} Succesfully inserted with id: ${data.id}!`,
        );
        setState((prevState) => ({
          ...prevState,
          product: initialState.product,
        }));
        refreshKey.current = +new Date();
      },
      onError: async (error) => {
        console.log(error.message);
      },
    });

  const STARTING_NUM = INVALID_NUM * INVALID_NUM;
  const PRODUCT_KEY_LENGTH = 6;

  function productComponentIdHelper(id: string) {
    if (id.startsWith("product")) {
      const splittedId = id.split("-")[1]!;
      const imageSrcSplitValue = "image";
      return splittedId === imageSrcSplitValue
        ? "imageSrc"
        : (splittedId as keyof ProductType);
    }
    return id as keyof ProductType;
  }

  function createProduct() {
    const productKeys = Object.keys(state.product);
    if (productKeys.length < 0) {
      return console.log(
        `Product key: ${productKeys.length} is not equals to ${PRODUCT_KEY_LENGTH}`,
      );
    }
    if (productKeys.length === PRODUCT_KEY_LENGTH) {
      createProductClientAPI.mutate(state.product as ProductType);
    }
  }
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget as HTMLInputElement;
    const key = productComponentIdHelper(input.id);
    const value =
      key === "quantity" || key === "price"
        ? parseInt(input.value, 10)
        : input.value;

    setState((prevState) => ({
      ...prevState,
      product:
        key === "price"
          ? {
              ...prevState.product,
              [key]: {
                value: value as number,
                currency: "php",
              },
            }
          : {
              ...prevState.product,
              [key]: value,
            },
    }));
  }
  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const select = e.currentTarget as HTMLSelectElement;
    const key = productComponentIdHelper(select.id);
    const value = select.value;

    setState((prevState) => ({
      ...prevState,
      product: { ...prevState.product, [key]: value },
    }));
  }

  return (
    <Main>
      <form
        key={refreshKey.current}
        className="mx-auto flex w-max flex-col items-center justify-center rounded-lg border p-2 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          createProduct();
        }}
      >
        <ProductName
          name={state.product.name ?? EMPTY_STRING}
          onChange={handleInputChange}
        />
        <ProductDescription
          description={state.product.description ?? EMPTY_STRING}
          onChange={handleInputChange}
        />
        <ProductImage
          src={state.product.imageSrc ?? EMPTY_STRING}
          onChange={handleInputChange}
        />
        <ProductQuantity
          quantity={state.product.quantity ?? STARTING_NUM}
          onChange={handleInputChange}
        />
        <ProductQuality
          quality={state.product.quality ?? "USED"}
          onChange={handleSelectChange}
        />
        <ProductPrice
          price={
            state.product.price ?? { currency: "php", value: STARTING_NUM }
          }
          input={{ onChange: handleInputChange }}
          select={{ onChange: handleSelectChange }}
        />
        <button
          type="submit"
          disabled={Object.keys(state.product).length !== PRODUCT_KEY_LENGTH}
        >
          Submit
        </button>
      </form>

      <Suspense
        fallback={
          <button
            className="rounded-lg border bg-primary p-2 shadow-sm"
            disabled
          >
            <p></p>
            <p></p>
          </button>
        }
      >
        {fetchProduct[1].data.map((data) => {
          const { id, name, description } = data;
          return (
            <button
              key={id}
              className="rounded-lg border bg-primary p-2 shadow-sm"
              onClick={() => {
                router.push(`/product/${id}`);
              }}
            >
              <p>{name}</p>
              <p>{description}</p>
            </button>
          );
        })}
      </Suspense>
    </Main>
  );
};

export default Page;
