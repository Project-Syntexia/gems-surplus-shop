import React, { forwardRef } from "react";

import type { z } from "zod";

import { fieldContainerClasses } from "@/app/_components/cart";
import type { productSchema } from "@/types/product.schema";
import Image from "next/image";

export type ProductType = z.infer<typeof productSchema>;

type CustomInputType = Partial<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>;
type CustomSelectType = Partial<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
>;

export const productDetailsContainerClasses =
  "mx-auto flex w-max flex-col items-center justify-center rounded-lg border p-2 shadow-sm";
const inputSimilaryClassess =
  "p-2 rounded-lg shadow-sm capitalize bg-transparent border border-primary";
export const inputClasses = `${inputSimilaryClassess}`;
const selectClasses = `${inputSimilaryClassess}`;

const categoryOptions: Array<ProductType["category"]> = [
  "ELECTRONICS",
  "FASHION",
  "FURNITURE",
  "HARDWARE_ITEM",
  "MEDIA",
  "TOYS_AND_HOBBIES",
];
const qualityOptions: Array<ProductType["quality"]> = [
  "LIKE_BRAND_NEW",
  "SLIGHTLY_USED",
  "USED",
];

type ProductDetailsType = z.infer<typeof productSchema> & {
  isDisabled?: true;
};
const ProductDetails = (props: ProductDetailsType) => {
  const { name, description, images, quantity, quality, price } = props;
  const isDisabled = props.isDisabled ?? false;

  return (
    <>
      <ProductImage image={images[0]!} disabled={isDisabled} />
      <ProductName name={name} disabled={isDisabled} />
      <ProductDescription description={description} disabled={isDisabled} />
      <ProductQuantity quantity={quantity} disabled={isDisabled} />
      <ProductQuality quality={quality} disabled={isDisabled} />
      <ProductPrice
        price={price}
        input={{
          disabled: isDisabled,
        }}
        select={{
          disabled: isDisabled,
        }}
      />
      <ProductCategory category={props.category} disabled={isDisabled} />
    </>
  );
};

type ProductNameType = {
  name: ProductType["name"];
} & CustomInputType;
export const ProductName = (props: ProductNameType) => {
  const { name, ...rest } = props;
  const productNameId = "product-name";

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productNameId}>Name:</label>
      <input
        className={inputClasses}
        id={productNameId}
        placeholder="name"
        value={name}
        {...rest}
      />
    </div>
  );
};

type ProductDescriptionType = {
  description: ProductType["description"];
} & CustomInputType;
export const ProductDescription = (props: ProductDescriptionType) => {
  const { description, ...rest } = props;
  const productDescriptionId = "product-description";

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productDescriptionId}>Description:</label>
      <input
        id={productDescriptionId}
        placeholder="description"
        className={inputClasses}
        value={description}
        {...rest}
      />
    </div>
  );
};

type ProductImageSourceType = {
  image: ProductType["images"][number];
  dimension?: number;
} & CustomInputType;
export const ProductImage = (props: ProductImageSourceType) => {
  const { image, dimension, ...rest } = props;
  const productimageSourceId = "product-image-source";
  const isHTTP = image.source.startsWith("https");
  const finalDimension = dimension ?? 240;

  return (
    <div className="flex items-start justify-start">
      <label htmlFor={productimageSourceId} className="hidden">
        Image Source:
      </label>
      {isHTTP ? (
        <Image
          alt={image.alternateText}
          src={image.source}
          className="rounded-lg p-1 shadow-sm"
          width={finalDimension}
          height={finalDimension}
          sizes={`${finalDimension}x${finalDimension}`}
        />
      ) : (
        <input
          id={productimageSourceId}
          className={inputClasses}
          placeholder="imageSrc"
          value={image.source}
          {...rest}
        />
      )}
    </div>
  );
};

type ProductQuantityType = {
  quantity: ProductType["quantity"];
} & CustomInputType;
export const ProductQuantity = (props: ProductQuantityType) => {
  const { quantity, ...rest } = props;
  const productQuantityId = "product-quantity";

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productQuantityId}>Quantity</label>
      <input
        id={productQuantityId}
        placeholder="quantity"
        className={inputClasses}
        type="number"
        value={quantity}
        {...rest}
      />
    </div>
  );
};

type ProductQualityType = {
  quality: ProductType["quality"];
} & CustomSelectType;
export const ProductQuality = (props: ProductQualityType) => {
  const { quality, ...rest } = props;
  const productQualityId = "product-quality";

  return (
    <div className={fieldContainerClasses}>
      <label htmlFor={productQualityId}>Quality</label>
      <select
        id={productQualityId}
        value={quality}
        className={selectClasses}
        {...rest}
      >
        {qualityOptions.map((option) => {
          const formattedOption = option.toLocaleLowerCase();
          return (
            <option key={option} value={option} className="capitalize">
              {formattedOption.replace(/_/g, " ")}
            </option>
          );
        })}
      </select>
    </div>
  );
};

type ProductPriceType = { price: ProductType["price"] } & {
  input: CustomInputType;
} & {
  select: CustomSelectType;
};
export const ProductPrice = (props: ProductPriceType) => {
  const { value, currency } = props.price;
  const productPriceId = "product-price";
  const productCurrencyId = "product-currency";

  return (
    <section className="grid grid-flow-col gap-2">
      <div className={fieldContainerClasses}>
        <label htmlFor={productPriceId}>Price</label>
        <input
          id={productPriceId}
          className={inputClasses}
          placeholder="price"
          type="number"
          value={value}
          {...props.input}
        />
      </div>
      <div className={fieldContainerClasses}>
        <label htmlFor={productCurrencyId}>Currency</label>
        <select
          id={productCurrencyId}
          value={currency}
          className={selectClasses}
          {...props.select}
        >
          <option>PHP</option>
          <option>USD</option>
        </select>
      </div>
    </section>
  );
};

type ProductCategoryType = {
  category: z.infer<typeof productSchema>["category"];
} & CustomSelectType;
// TODO: Create Product Category filter in home
export const ProductCategory = forwardRef<
  HTMLButtonElement,
  ProductCategoryType
>((props, ref) => {
  const { category, ...rest } = props;
  const productCategoryId = "product-category";
  let productCategorySelectClasses =
    "ative:bg-contrast w-fit rounded-lg border border-primary bg-transparent p-2 capitalize text-primary duration-300 ease-in-out hover:bg-primary hover:text-paper active:text-paper";

  if (rest.disabled) {
    productCategorySelectClasses = `${productCategorySelectClasses} appearance-none`;
  }

  return (
    <button ref={ref} className="flex w-full justify-between p-1">
      <label htmlFor={productCategoryId}>Category:</label>
      <select
        id={productCategoryId}
        className={productCategorySelectClasses}
        value={category}
        {...rest}
      >
        {categoryOptions.map((category) => {
          return (
            <option
              key={category}
              value={category}
              className="bg-primary capitalize"
            >
              {category.toLocaleLowerCase()}
            </option>
          );
        })}
      </select>
    </button>
  );
});

ProductCategory.displayName = "ProductCategory";

export default ProductDetails;
