"use client";

import React, { type ChangeEvent } from "react";

import { fieldContainerClasses } from ".";
import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Paragraph from "@/app/_components/paragraph";
import Parent from "@/app/_components/parent";
import Select from "@/app/_components/select";
import ProductImage from "@/app/_components/product/image";
import type { ProductType } from "@/types/product.schema";
import { api } from "@/trpc/react";

type ProductEditImagesType = { images: ProductType["images"] };

const ProductEditImages = (props: ProductEditImagesType) => {
  const { images } = props;
  const customBorderList = ["NONE"] as const;
  const addImageInProduct = api.product.addImageInProduct.useMutation({
    onError: (error) => console.log(error),
    onSuccess: (data) => alert(`Successfully updated id is ${data.id}`),
  });

  function handleAddImage(id: string) {
    // TODO: Get the ID of the current product
    addImageInProduct.mutate({
      id: id,
      alternateText: "Generic Corgi Goodboy",
      customBorder: "NONE",
      isHidden: false,
      orderNumber: 0,
      source:
        "https://www.akc.org/wp-content/uploads/2017/11/Pembroke-Welsh-Corgi-standing-outdoors-in-the-fall.jpg",
    });
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const input: HTMLInputElement = e.currentTarget;
    console.log(input.value);
  }

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const select: HTMLSelectElement = e.currentTarget;
    console.log(select.value);
  }

  return (
    <section className="rounded-lg border border-primary p-2">
      <Parent className="flex w-96 overflow-x-auto p-2">
        {images.map((imageProps, index) => {
          const { alternateText, customBorder, isHidden, orderNumber, source } =
            imageProps;
          const isHTTP = source.startsWith("http");
          const temporaryKey = new Date().getMilliseconds() + index;

          return (
            <section
              className={`${fieldContainerClasses} group w-3/4 flex-col odd:bg-primary odd:text-paper`}
              key={temporaryKey}
            >
              <Parent className="rounded-full p-1 px-3 group-odd:bg-paper group-even:bg-primary">
                <Paragraph
                  text={`${index + 1}`}
                  groupStyle="group-even:text-paper"
                />
              </Parent>
              {isHTTP && <ProductImage image={imageProps} size={24} />}
              <Input
                groupStyle="group-odd:text-paper"
                onChange={handleInputChange}
                value={alternateText}
              />
              <Select
                groupStyle="group-odd:text-paper"
                onChange={handleSelectChange}
                options={customBorderList.map((value) => ({
                  label: value.toLocaleLowerCase(),
                  value,
                }))}
                value={customBorder}
              />
              <Select
                groupStyle="group-odd:text-paper"
                onChange={handleSelectChange}
                value={orderNumber}
                options={new Array(images.length)
                  .fill(0)
                  .map((value, index) => ({
                    label: `${index}`,
                    value: index,
                  }))}
              />
              <Input value={source} onChange={handleInputChange} />
              <Button>
                <Paragraph
                  text={`${isHidden}`}
                  groupStyle="group-odd:bg-paper group-even:bg-primary group-even:text-paper"
                />
              </Button>
            </section>
          );
        })}
      </Parent>
      <Button
        bgColor="bg-green-400 hover:bg-green-300"
        borderColor="border-transparent"
        style="w-full"
        onClick={() => handleAddImage("66c8bea7f87779d4a0879c45")}
      >
        <Paragraph text="+" style="bold" color="paper" />
      </Button>
    </section>
  );
};

export default ProductEditImages;
