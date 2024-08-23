"use client";

import React, { type ChangeEvent, useRef, useState } from "react";
import type { api as serverApi } from "@/trpc/server";
import Main from "@/app/_components/main";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type ProductType = Awaited<ReturnType<typeof serverApi.product.createProduct>>;

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

  const PRODUCT_KEY_LENGTH = 6;

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
    const key = input.id as keyof ProductType;
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
    const key = select.id as keyof ProductType;
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
        <input id="name" placeholder="name" onChange={handleInputChange} />
        <input
          id="description"
          placeholder="description"
          onChange={handleInputChange}
        />
        <input
          id="imageSrc"
          placeholder="imageSrc"
          // type="file"
          onChange={handleInputChange}
        />
        <input
          id="quantity"
          placeholder="quantity"
          type="number"
          onChange={handleInputChange}
        />
        <select id="quality" onChange={handleSelectChange}>
          <option>USED</option>
          <option>SLIGHTLY_USED</option>
          <option>LIKE_BRAND_NEW</option>
        </select>
        <input
          id="price"
          placeholder="price"
          type="number"
          onChange={handleInputChange}
        />
        <select id="currency" onChange={handleSelectChange}>
          <option>PHP</option>
        </select>
        <button
          type="submit"
          disabled={Object.keys(state.product).length !== PRODUCT_KEY_LENGTH}
        >
          Submit
        </button>
      </form>

      {fetchProduct[0]?.map((data) => {
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
    </Main>
  );
};

export default Page;
