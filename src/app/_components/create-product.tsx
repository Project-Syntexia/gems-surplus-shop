import React, { useRef, useState, type ChangeEvent } from "react";

import { baseWithColorClasses as buttonBaseClasses } from "@/app/_components/button";
import Paragraph from "@/app/_components/paragraph";
import ProductCategory from "@/app/_components/product/category";
import ProductDescription from "@/app/_components/product/description";
import ProductName from "@/app/_components/product/name";
import ProductPrice from "@/app/_components/product/price";
import ProductQuality from "@/app/_components/product/quality";
import ProductQuantity from "@/app/_components/product/quantity";
import type { ProductType } from "@/types/product.schema";
import { api } from "@/trpc/react";
import { EMPTY_STRING, INVALID_NUM } from "@/utils/const";

type InitialStateType = {
  product: Partial<ProductType>;
};

const initialState: InitialStateType = {
  product: {},
};

const CreateProduct = () => {
  const STARTING_NUM = INVALID_NUM * INVALID_NUM;
  const PRODUCT_KEY_LENGTH = 7;
  const [state, setState] = useState(initialState);
  const refreshKey = useRef(+new Date());
  const createProductClientAPI =
    api.product.createProduct.useMutation<ProductType>({
      onSuccess: async (data) => {
        alert(`Product ${data.name} Succesfully inserted with id: ${data.id}!`);
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

  /** This helper function will return the key of ProductSchema. */
  function productComponentIdHelper(id: string) {
    let idHolder = id;
    if (id.startsWith("product")) {
      const splittedId = id.split("-")[1]!;
      const imageSrcSplitValue = "image";
      idHolder = splittedId === imageSrcSplitValue ? "imageSrc" : splittedId;
    }
    return idHolder as keyof ProductType;
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
                currency: "PHP",
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
      product:
        (key as string) === "currency"
          ? {
              ...prevState.product,
              price: {
                currency: value as ProductType["price"]["currency"],
                value: prevState.product.price?.value ?? INVALID_NUM,
              },
            }
          : { ...prevState.product, [key]: value },
    }));
  }

  console.log(state.product);

  return (
    <div className="p-2">
      <p className="text-center font-bold">Add a Product</p>
      <form
        className="mx-auto flex w-max flex-col items-center justify-center rounded-lg border p-2 shadow-sm"
        key={refreshKey.current}
        onSubmit={(e) => {
          e.preventDefault();
          createProduct();
        }}
      >
        <ProductName
          name={state.product.name ?? EMPTY_STRING}
          onChange={handleInputChange}
        />
        <ProductName
          name={state.product.name ?? EMPTY_STRING}
          onChange={handleInputChange}
        />
        <ProductDescription
          description={state.product.description ?? EMPTY_STRING}
          onChange={handleInputChange}
        />
        {/* <ProductImage image={state.product.images?.[0] ?? emptyProductImage} /> */}
        <ProductQuantity
          onChange={handleInputChange}
          quantity={state.product.quantity ?? STARTING_NUM}
        />
        <ProductQuality
          onChange={handleSelectChange}
          quality={state.product.quality ?? "USED"}
        />
        <ProductCategory
          category={state.product.category ?? "ELECTRONICS"}
          onChange={handleSelectChange}
        />
        <ProductPrice
          input={{ onChange: handleInputChange }}
          price={
            state.product.price ?? { currency: "PHP", value: STARTING_NUM }
          }
          select={{ onChange: handleSelectChange }}
        />
        <button
          className={buttonBaseClasses}
          disabled={Object.keys(state.product).length !== PRODUCT_KEY_LENGTH}
          type="submit"
        >
          <Paragraph text="Submit" color="primary" hoverColor="paper" />
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
