"use client";

import { SignedIn } from "@clerk/nextjs";
import { forwardRef, Suspense, useRef, useState } from "react";

import Button, { type ButtonType } from "@/app/_components/button";
import Input, { type InputType } from "@/app/_components/input";
import Paragraph from "@/app/_components/paragraph";
import { useProduct } from "@/app/contexts/productContext";
import { api } from "@/trpc/react";
import { INVALID_NUM } from "@/utils/const";

type CartButtonType = {
  buttonProps?: Omit<ButtonType, "disabled" | "children">;
  inputProps?: Omit<InputType, "disabled">;
  key: number;
  disabled?: boolean;
};

const CartButton = forwardRef<HTMLInputElement, CartButtonType>(
  (props, ref) => {
    const { buttonProps, inputProps, key, disabled } = props;

    return (
      <section className="mt-2 grid gap-2 rounded-sm border-t-2 p-2 pt-3">
        <Input
          label="Quantity:"
          id="input-quantity"
          ref={ref}
          key={key}
          min="1"
          defaultValue={1}
          type="number"
          disabled={disabled}
          {...inputProps}
        />
        <Button disabled={disabled} {...buttonProps}>
          <Paragraph
            text="Add To Cart"
            color={"black"}
            activeColor={"black"}
            hoverColor={"black"}
          />
        </Button>
      </section>
    );
  },
);

CartButton.displayName = "CartButton";

const AddToCartButton = () => {
  const inputQuantityRef = useRef<HTMLInputElement>(null!);
  const refreshStateRef = useRef(+new Date());
  const { productId } = useProduct();
  const [cartListData, cartListQuery] =
    api.cart.fetchCartList.useSuspenseQuery();
  // TODO: Bring Redux Here to manage Cart properly even during high latency
  const [state, setState] = useState(cartListData);
  const addToCart = api.cart.addToCart.useMutation({
    onSuccess: (data) => {
      console.log(`Successfully added ${productId} in your Cart`);
      refreshStateRef.current = +new Date();
      setState((prevState) => [...prevState, data]);
      cartListQuery.refetch;
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
          <CartButton
            ref={inputQuantityRef}
            key={refreshStateRef.current}
            disabled={cartListQuery.isRefetching}
            buttonProps={{
              onClick: () => addToCartHandler(),
            }}
          />
        </SignedIn>
      </Suspense>
    );
  } catch (e) {
    return (
      <CartButton
        ref={inputQuantityRef}
        key={refreshStateRef.current}
        disabled={true}
      />
    );
  }
};

export default AddToCartButton;
