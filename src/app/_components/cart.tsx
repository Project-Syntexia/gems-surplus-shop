"use client";

import { SignedIn } from "@clerk/nextjs";
import { Suspense, useRef, useState } from "react";

import Button from "@/app/_components/button";
import Paragraph from "@/app/_components/paragraph";
import Parent from "@/app/_components/parent";
import { inputClasses } from "@/app/_components/product";
import { useProduct } from "@/app/contexts/productContext";
import { api } from "@/trpc/react";
import { INVALID_NUM } from "@/utils/const";

export const fieldContainerClasses =
  "flex items-center justify-between p-2 gap-2 w-full";
const cartSectionClasses = "mt-2 grid gap-2 rounded-sm border-t-2 p-2 pt-3";

const AddToCartButton = () => {
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

  try {
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
            <Button
              onClick={addToCartHandler}
              disabled={cartList[1].isRefetching}
            >
              <Paragraph
                text="Add To Cart"
                color={"black"}
                activeColor={"black"}
                hoverColor={"black"}
              />
            </Button>
          </section>
        </SignedIn>
      </Suspense>
    );
  } catch (e) {
    return (
      <section className={cartSectionClasses}>
        <Parent className={fieldContainerClasses}>
          <label htmlFor="input-quantity">Quantity: </label>
          <input
            id="input-quantity"
            className={inputClasses}
            min="1"
            defaultValue={1}
            type="number"
          />
        </Parent>
        <Button>
          <Paragraph
            text="Add To Cart"
            color={"black"}
            activeColor={"black"}
            hoverColor={"black"}
          />
        </Button>
      </section>
    );
  }
};

export default AddToCartButton;
