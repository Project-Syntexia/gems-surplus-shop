import React from "react";
import type { ProductType } from "../product/page";
import { fieldContainerClasses } from "./cart";

export const productDetailsContainerClasses =
  "mx-auto flex w-max flex-col items-center justify-center rounded-lg border p-2 shadow-sm";
const qualityOptions = ["USED", "SLIGHTLY_USED", "LIKE_BRAND_NEW"] as const;

type ProductDetailsType = ProductType & {
  isDisabled?: true;
};

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

const ProductDetails = (props: ProductDetailsType) => {
  const { name, description, imageSrc, quantity, quality, price } = props;
  const isDisabled = props.isDisabled ?? false;

  return (
    <>
      <ProductName name={name} disabled={isDisabled} />
      <ProductDescription description={description} disabled={isDisabled} />
      <ProductImage src={imageSrc} disabled={isDisabled} />
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
    </>
  );
};

type ProductNameType = {
  name: string;
} & CustomInputType;
export const ProductName = (props: ProductNameType) => {
  const { name, ...rest } = props;
  return (
    <div className={fieldContainerClasses}>
      <label htmlFor="product-name">Name:</label>
      <input id="product-name" placeholder="name" value={name} {...rest} />
    </div>
  );
};

type ProductDescriptionType = {
  description: string;
} & CustomInputType;
export const ProductDescription = (props: ProductDescriptionType) => {
  const { description, ...rest } = props;
  return (
    <div className={fieldContainerClasses}>
      <label htmlFor="product-description">Description:</label>
      <input
        id="product-description"
        placeholder="description"
        value={description}
        {...rest}
      />
    </div>
  );
};

type ProductImageSourceType = {
  src: string;
} & CustomInputType;
export const ProductImage = (props: ProductImageSourceType) => {
  const { src, ...rest } = props;
  return (
    <div className={fieldContainerClasses}>
      <label htmlFor="product-image-source">Image Source:</label>
      <input
        id="product-image-source"
        placeholder="imageSrc"
        value={src}
        {...rest}
      />
    </div>
  );
};

type ProductQuantityType = {
  quantity: number;
} & CustomInputType;
export const ProductQuantity = (props: ProductQuantityType) => {
  const { quantity, ...rest } = props;
  return (
    <div className={fieldContainerClasses}>
      <label htmlFor="product-quantity">Quantity</label>
      <input
        id="product-quantity"
        placeholder="quantity"
        type="number"
        value={quantity}
        {...rest}
      />
    </div>
  );
};

type ProductQualityType = {
  quality: (typeof qualityOptions)[number];
} & CustomSelectType;
export const ProductQuality = (props: ProductQualityType) => {
  const { quality, ...rest } = props;
  return (
    <div className={fieldContainerClasses}>
      <label htmlFor="product-quality">Quality</label>
      <select id="product-quality" value={quality} {...rest}>
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

type ProductPriceType = {
  price: ProductType["price"];
} & {
  input: CustomInputType;
} & {
  select: CustomSelectType;
};
export const ProductPrice = (props: ProductPriceType) => {
  const { value, currency } = props.price;
  return (
    <section className="grid grid-flow-col gap-2">
      <div className={fieldContainerClasses}>
        <label htmlFor="product-price">Price</label>
        <input
          id="product-price"
          placeholder="price"
          type="number"
          value={value}
          {...props.input}
        />
      </div>
      <div className={fieldContainerClasses}>
        <label htmlFor="product-currency">Currency</label>
        <select id="product-currency" value={currency} {...props.select}>
          <option>PHP</option>
        </select>
      </div>
    </section>
  );
};

export default ProductDetails;
