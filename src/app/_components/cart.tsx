"use client";

import { SignedIn } from "@clerk/nextjs";
import { Suspense, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { PagesType } from "@/utils/pages";
import { INVALID_NUM } from "@/utils/const";
import { useProduct } from "@/app/contexts/productContext";
import { api } from "@/trpc/react";
import { inputClasses } from "./product";

export const fieldContainerClasses =
  "flex items-center justify-between p-2 gap-2 w-full";
const cartSectionClasses = "mt-2 grid gap-2 rounded-sm border-t-2 p-2 pt-3";

export const cartButtonClasses =
  "group rounded-lg border border-primary bg-transparent p-1 px-2 shadow-sm duration-300 ease-in-out hover:border-paper hover:bg-primary active:border-white active:bg-contrast";
export const cartParagraphClasses =
  "text-bold text-primary group-hover:text-paper group-active:text-white";

const AddToCartButton = () => {
  try {
    const inputQuantityRef = useRef<HTMLInputElement>(null!);
    const refreshStateRef = useRef(+new Date());
    const { productId } = useProduct();
    const cartList = api.cart.fetchCartList.useSuspenseQuery();
    // TODO: Bring Redux Here to manage Cart properly even during high latency
    const [state, setState] = useState(cartList[1].data);
    const addToCart = api.cart.addToCart.useMutation({
      onSuccess: (data) => {
        console.log(`Successfully added ${productId} in your Cart`);
        refreshStateRef.current = +new Date();
        setState((prevState) => [...prevState, data]);
        cartList[1].refetch;
      },
      onError: ({ message }) => {
        console.log(`${message}\nMaybe you are not signed-in!`);
      },
    });

    function addToCartHandler() {
      const index = state.findIndex((data) => data.productId === productId);
      if (index !== INVALID_NUM) return alert("Product already exists!");
      addToCart.mutate({
        productId: productId!,
        quantity: parseInt(inputQuantityRef.current.value, 10),
      });
    }

    return (
      <Suspense>
        <SignedIn>
          <section className={cartSectionClasses}>
            <div className={fieldContainerClasses}>
              <label htmlFor="input-quantity">Quantity: </label>
              <input
                id="input-quantity"
                className={inputClasses}
                ref={inputQuantityRef}
                key={refreshStateRef.current}
                min="1"
                defaultValue={1}
                type="number"
              />
            </div>
            <button
              className={cartButtonClasses}
              onClick={addToCartHandler}
              disabled={cartList[1].isRefetching}
            >
              <p className={cartParagraphClasses}>Add To Cart</p>
            </button>
          </section>
        </SignedIn>
      </Suspense>
    );
  } catch (e) {
    const router = useRouter();

    function addToCartHandler(route: PagesType) {
      router.push(route);
    }

    return (
      <section className={cartSectionClasses}>
        <div className={fieldContainerClasses}>
          <label htmlFor="input-quantity">Quantity: </label>
          <input
            id="input-quantity"
            className={inputClasses}
            min="1"
            defaultValue={1}
            type="number"
          />
        </div>
        <button
          className={cartButtonClasses}
          // onClick={() => addToCartHandler("/settings")}
        >
          <p className={cartParagraphClasses}>Add To Cart</p>
        </button>
      </section>
    );
  }
};

export default AddToCartButton;
