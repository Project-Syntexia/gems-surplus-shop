"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, Suspense, useRef, useState } from "react";

import Main from "@/app/_components/main";
import { api } from "@/trpc/react";
import {
  type ProductType,
  ProductCategory,
  ProductDescription,
  ProductImage,
  ProductName,
  ProductPrice,
  ProductQuality,
  ProductQuantity,
} from "@/app/_components/product";
import { EMPTY_STRING, INVALID_NUM } from "@/utils/const";

type InitialStateType = {
  product: Partial<ProductType>;
};

const initialState: InitialStateType = {
  product: {},
};
// TODO: Move the creation of products in Admin side.
const Page = () => {
  const [state, setState] = useState(initialState);
  const refreshKey = useRef(+new Date());
  const router = useRouter();
  const [initalSettingsData] = api.general.initialSettings.useSuspenseQuery();
  const [fetchProductData] = api.product.fetchProducts.useSuspenseQuery(10);
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
  const PRODUCT_KEY_LENGTH = 7;

  const emptyProductImage = {
    alternateText: EMPTY_STRING,
    source: EMPTY_STRING,
    customBorder: "NONE",
    isHidden: false,
    orderNumber: 0,
  };

  console.log(state.product);

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

  return (
    <Main>
      <div className="p-2">
        <p className="text-center font-bold">Add a Product</p>
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
          <ProductName
            name={state.product.name ?? EMPTY_STRING}
            onChange={handleInputChange}
          />
          <ProductDescription
            description={state.product.description ?? EMPTY_STRING}
            onChange={handleInputChange}
          />
          <ProductImage
            image={state.product.images?.[0] ?? emptyProductImage}
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
          <ProductCategory
            category={state.product.category ?? "ELECTRONICS"}
            onChange={handleSelectChange}
          />
          <ProductPrice
            price={
              state.product.price ?? { currency: "PHP", value: STARTING_NUM }
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
      </div>

      <section className="border-y border-primary p-2">
        <p className="p-2 text-center font-bold">Filters:</p>
        <div className="flex items-center justify-around gap-2">
          <div className="bg-paper p-2">
            <p>Categories:</p>
            <select className="rounded-lg border border-primary bg-transparent p-2 capitalize text-primary shadow-sm">
              {initalSettingsData.itemCategories.map((category) => {
                return (
                  <option key={category} className="capitalize">
                    {category.replace(/_/g, " ").toLocaleLowerCase()}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </section>

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
        <div className="grid grid-cols-4 gap-2 p-2 pb-20">
          {fetchProductData.map((data) => {
            const { id, name, description, images } = data;
            const descriptionMaxLength = 30;
            return (
              <button
                key={id}
                className="rounded-lg border border-primary bg-paper p-2 shadow-sm"
                onClick={() => {
                  router.push(`/products/${id}`);
                }}
              >
                <ProductImage
                  image={images[0] ?? emptyProductImage}
                  dimension={64}
                />
                <p>{name}</p>
                <p>
                  {description.length > descriptionMaxLength
                    ? `${description.substring(0, descriptionMaxLength)}...`
                    : description}
                </p>
              </button>
            );
          })}
        </div>
      </Suspense>
    </Main>
  );
};

export default Page;
