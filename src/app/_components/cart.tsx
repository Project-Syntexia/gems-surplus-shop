"use client";

import { useProduct } from "../contexts";
import { api } from "@/trpc/react";
import { SignedIn } from "@clerk/nextjs";
import { INVALID_NUM } from "../utils/const";
import { useRef, useState } from "react";

export const fieldContainerClasses =
  "flex items-center justify-between p-2 gap-2 w-full";

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

  if (cartList[1].isFetched) {
    setState(cartList[1].data);
  }

  function addToCartHandler() {
    const index = state.findIndex((data) => data.productId === productId);
    if (index !== INVALID_NUM) return alert("Product already exists!");
    addToCart.mutate({
      productId: productId!,
      quantity: parseInt(inputQuantityRef.current.value, 10),
    });
  }

  return (
    <SignedIn>
      <section className="mt-2 grid gap-2 rounded-sm border-t-2 p-2 pt-3">
        <div className={fieldContainerClasses}>
          <label htmlFor="input-quantity">Quantity: </label>
          <input
            id="input-quantity"
            className="rounded-sm border p-2 shadow-sm"
            ref={inputQuantityRef}
            key={refreshStateRef.current}
            min="1"
            defaultValue={1}
            type="number"
          />
        </div>
        <button
          className="group rounded-lg border-2 border-primary bg-transparent p-2 px-4 shadow-sm duration-300 ease-in-out hover:border-paper hover:bg-primary active:border-white active:bg-contrast"
          onClick={addToCartHandler}
          disabled={cartList[1].isRefetching}
        >
          <p className="text-bold text-primary group-hover:text-paper group-active:text-white">
            Add To Cart
          </p>
        </button>
      </section>
    </SignedIn>
  );
};

export default AddToCartButton;
